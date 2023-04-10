import { Currency, NftTransaction } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import arraySum from "formfn-shared/dist/utils/array/arraySum";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import CREATOR_NUM_SALES_RANKING_2022 from "src/constants/flashback/CreatorNumSalesRanking2022";
import CREATOR_VOLUME_RANKING_2022 from "src/constants/flashback/CreatorVolumeRanking2022";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import SOLD_TRANSACTION_TYPES from "src/constants/SoldTransactionTypes";
import Typename from "src/types/enums/Typename";
import bigintToNumber from "src/utils/bigintToNumber";
import convertNftToAsset from "src/utils/convert/convertNftToAsset";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import convertPrice from "src/utils/convert/convertPrice";
import convertUser from "src/utils/convert/convertUser";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CurrencyNameExpress_Enum,
  FlashbackArtistStats,
  MetadataAccount,
  NftAsset,
  NftTransactionTypeExpress_Enum,
  Price,
} from "src/__generated__/generated";

const NUM_COLLECTORS = 10;
const NUM_NFTS = 20;

function getNumEditionsSoldFromAllSales(
  allSales: Array<NftTransaction>
): number {
  return allSales.filter(
    (sale) => sale.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
  ).length;
}

function getNumOneOfOnesSoldFromAllSales(
  allSales: Array<NftTransaction>
): number {
  return allSales.filter(
    (sale) =>
      [
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
        NftTransactionTypeExpress_Enum.SoldInstantSale,
      ].includes(sale.type as NftTransactionTypeExpress_Enum) &&
      sale.auctionCount === 0
  ).length;
}

function getNumPrimarySalesFromAllSales(
  allSales: Array<NftTransaction>
): number {
  return allSales.filter((sale) => sale.auctionCount === 0).length;
}

function getNumSecondarySalesFromAllSales(
  allSales: Array<NftTransaction>
): number {
  return allSales.filter((sale) => sale.auctionCount > 0).length;
}

async function getSoldNftAssetsFromAllSales(
  allSales: Array<NftTransaction>
): Promise<Array<NftAsset>> {
  const allMints = allSales.map((sale) => sale.mint);
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: {
      NftMetadata: true,
    },
    take: NUM_NFTS,
    where: {
      OR: [
        { isMasterEdition: true },
        // We don't want to show duplicate editions
        { edition: 1, isMasterEdition: false },
      ],
      mint: {
        in: allMints,
      },
    },
  });
  return nfts.map((nft) => ({
    __typename: Typename.NftAsset,
    asset: convertNftToAsset(nft),
    nftInfo: {
      __typename: Typename.NftAssetNftInfo,
      mint: nft.mint,
    },
  }));
}

async function getTopSellingPieceFromAllSales(
  allSales: Array<NftTransaction & { Currency: Currency }>
): Promise<{
  nft: MetadataAccount;
  price: Price;
}> {
  const topSellingSale = allSales.reduce((prev, current) =>
    (prev.price ?? 0) > (current.price ?? 0) ? prev : current
  );
  const prisma = getPrisma();
  const topSellingNft = await prisma.nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: {
      mint: topSellingSale.mint,
    },
  });

  return {
    nft: convertNftToMetadataAccount(topSellingNft!),
    price: convertPrice(
      bigintToNumber(topSellingSale.price),
      topSellingSale.Currency
    )!,
  };
}

function getTotalVolumeFromAllSales(allSales: Array<NftTransaction>): {
  totalVolumeInLamports: number;
  totalVolumeInUsd: number;
} {
  const totalVolumeInLamports = arraySum(
    filterNulls(allSales.map((sale) => bigintToNumber(sale.price)))
  );
  const totalVolumeInUsd = arraySum(
    filterNulls(allSales.map((sale) => sale.usdPrice?.toNumber()))
  );
  return { totalVolumeInLamports, totalVolumeInUsd };
}

function getUniqueCollectorsFromAllSales(
  allSales: Array<NftTransaction>
): Array<string> {
  return removeDuplicatesWithSet(allSales.map((sale) => sale.toUserId));
}

export default async function getFlashbackArtistStatsForUserId(
  userId: string
): Promise<Maybe<FlashbackArtistStats>> {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user?.isWhitelisted !== true) {
    return null;
  }

  // Note: we don't consider sales where user is a collaborator to keep things simple
  // May want to change this before launching
  const allSales = await prisma.nftTransaction.findMany({
    include: {
      Currency: true,
    },
    where: {
      Currency: {
        // Only consider SOL sales for now to keep things simple
        name: CurrencyNameExpress_Enum.Solana,
      },
      creatorId: userId,
      source: null,
      type: {
        in: SOLD_TRANSACTION_TYPES,
      },
    },
  });

  if (allSales.length === 0) {
    return null;
  }

  const uniqueCollectorIds = getUniqueCollectorsFromAllSales(allSales);
  const [uniqueCollectorsSample, soldNftAssets, topSellingPiece] =
    await Promise.all([
      filterNulls(
        await prisma.user.findMany({
          include: CONVERT_USER_INCLUDE,
          where: {
            id: {
              in: uniqueCollectorIds.slice(0, NUM_COLLECTORS),
            },
            profilePhotoId: {
              not: null,
            },
          },
        })
      ).map((userInner) => convertUser(userInner)),
      getSoldNftAssetsFromAllSales(allSales),
      getTopSellingPieceFromAllSales(allSales),
    ]);
  const totalVolume = getTotalVolumeFromAllSales(allSales);

  const numSalesRank = CREATOR_NUM_SALES_RANKING_2022.findIndex(
    ({ CreatorId }) => CreatorId === userId
  );
  const volumeRank = CREATOR_VOLUME_RANKING_2022.findIndex(
    ({ CreatorId }) => CreatorId === userId
  );

  return {
    __typename: Typename.FlashbackArtistStats,
    numEditionsSold: getNumEditionsSoldFromAllSales(allSales),
    numOneOfOnesSold: getNumOneOfOnesSoldFromAllSales(allSales),
    numPrimarySales: getNumPrimarySalesFromAllSales(allSales),
    numSalesRank: numSalesRank === -1 ? null : numSalesRank + 1,
    numSecondarySales: getNumSecondarySalesFromAllSales(allSales),
    numUniqueCollectors: uniqueCollectorIds.length,
    soldNftAssets,
    topSellingPiece: topSellingPiece.nft,
    topSellingPiecePrice: topSellingPiece.price,

    // TODO[@arcticmatt] implement these if time, they are more complex
    totalIncomeInLamports: 0,
    totalIncomeInUsd: 0,

    totalVolumeInLamports: totalVolume.totalVolumeInLamports,
    totalVolumeInUsd: totalVolume.totalVolumeInUsd,
    uniqueCollectorsSample,
    volumeRank: volumeRank === -1 ? null : volumeRank + 1,
  };
}
