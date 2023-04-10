import { Currency, Nft, NftTransaction } from "@prisma/client";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import arraySum from "formfn-shared/dist/utils/array/arraySum";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import COLLECTOR_NUM_BUYS_RANKING_2022 from "src/constants/flashback/CollectorNumBuysRanking2022";
import COLLECTOR_VOLUME_RANKING_2022 from "src/constants/flashback/CollectorVolumeRanking2022";
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
  FlashbackCollectorStats,
  MetadataAccount,
  NftAsset,
  NftTransactionTypeExpress_Enum,
  Price,
  UserExpress,
} from "src/__generated__/generated";

const NUM_ARTISTS = 10;
const NUM_NFTS = 20;

function getArtistsSupportedFromAllBuys(
  allBuys: Array<NftTransaction & { Nft: Nft }>
): Array<string> {
  return removeDuplicatesWithSet(allBuys.map((buy) => buy.Nft.creatorId));
}

async function getBiggestSecondarySaleFromAllSales(
  allSales: Array<NftTransaction & { Currency: Currency }>
): Promise<
  Maybe<{
    nft: MetadataAccount;
    price: Price;
  }>
> {
  if (allSales.length === 0) {
    return null;
  }

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

async function getBoughtNftAssetsFromAllBuys(
  allBuys: Array<NftTransaction>
): Promise<Array<NftAsset>> {
  const allMints = allBuys.map((buy) => buy.mint);
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

async function getFirstArtistSupportedFromAllBuys(
  allBuys: Array<NftTransaction & { Nft: Nft }>
): Promise<UserExpress> {
  const firstArtistId = allBuys[0].Nft.creatorId;
  const user = await getPrisma().user.findUnique({
    include: CONVERT_USER_INCLUDE,
    where: { id: firstArtistId },
  });
  return convertUser(user!);
}

async function getFirstEditionBoughtFromAllBuys(
  allBuys: Array<NftTransaction & { Nft: Nft }>
): Promise<Maybe<MetadataAccount>> {
  const firstEditionBoughtTx = allBuys.find((buy) => !buy.Nft.isMasterEdition);
  if (firstEditionBoughtTx == null) {
    return null;
  }

  const nft = await getPrisma().nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: {
      mint: firstEditionBoughtTx.mint,
    },
  });
  return convertNftToMetadataAccount(nft!);
}

async function getFirstOneOfOneBoughtFromAllBuys(
  allBuys: Array<NftTransaction & { Nft: Nft }>
): Promise<Maybe<MetadataAccount>> {
  const firstOneOfOneBoughtTx = allBuys.find((buy) => buy.Nft.isMasterEdition);
  if (firstOneOfOneBoughtTx == null) {
    return null;
  }

  const nft = await getPrisma().nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: {
      mint: firstOneOfOneBoughtTx.mint,
    },
  });
  return convertNftToMetadataAccount(nft!);
}

function getNumEditionsBoughtFromAllBuys(
  allBuys: Array<NftTransaction>
): number {
  return allBuys.filter(
    (buy) => buy.type === NftTransactionTypeExpress_Enum.SoldEditionPrimary
  ).length;
}

function getNumOneOfOnesBoughtFromAllBuys(
  allBuys: Array<NftTransaction>
): number {
  return allBuys.filter(
    (buy) =>
      [
        NftTransactionTypeExpress_Enum.Sold,
        NftTransactionTypeExpress_Enum.SoldAcceptedOffer,
        NftTransactionTypeExpress_Enum.SoldInstantSale,
      ].includes(buy.type as NftTransactionTypeExpress_Enum) &&
      buy.auctionCount === 0
  ).length;
}

function getNumPrimaryBuysFromAllBuys(allBuys: Array<NftTransaction>): number {
  return allBuys.filter((buy) => buy.auctionCount === 0).length;
}

function getNumSecondaryBuysFromAllBuys(
  allBuys: Array<NftTransaction>
): number {
  return allBuys.filter((buy) => buy.auctionCount > 0).length;
}

function getTotalVolumeFromAllBuys(allBuys: Array<NftTransaction>): {
  totalVolumeInLamports: number;
  totalVolumeInUsd: number;
} {
  const totalVolumeInLamports = arraySum(
    filterNulls(allBuys.map((buy) => bigintToNumber(buy.price)))
  );
  const totalVolumeInUsd = arraySum(
    filterNulls(allBuys.map((buy) => buy.usdPrice?.toNumber()))
  );
  return { totalVolumeInLamports, totalVolumeInUsd };
}

export default async function getFlashbackCollectorStatsForUserId(
  userId: string
): Promise<Maybe<FlashbackCollectorStats>> {
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (user == null) {
    return null;
  }

  const [allBuys, allSecondarySales] = await Promise.all([
    prisma.nftTransaction.findMany({
      include: {
        Currency: true,
        Nft: true,
      },
      orderBy: {
        timeCreated: "asc",
      },
      where: {
        Currency: {
          name: CurrencyNameExpress_Enum.Solana,
        },
        source: null,
        toUserId: userId,
        type: {
          // Only consider SOL sales for now to keep things simple
          in: SOLD_TRANSACTION_TYPES,
        },
      },
    }),
    prisma.nftTransaction.findMany({
      include: {
        Currency: true,
      },
      where: {
        Currency: {
          name: CurrencyNameExpress_Enum.Solana,
        },
        auctionCount: {
          gt: 0,
        },
        fromUserId: userId,
        source: null,
        type: {
          // Only consider SOL sales for now to keep things simple
          in: SOLD_TRANSACTION_TYPES,
        },
      },
    }),
  ]);

  if (allBuys.length === 0) {
    return null;
  }

  const artistsSupportedIds = getArtistsSupportedFromAllBuys(allBuys);
  const [
    artistsSupportedSample,
    boughtNftAssets,
    biggestSecondarySale,
    firstArtistSupported,
    firstEditionBought,
    firstOneOfOneBought,
  ] = await Promise.all([
    filterNulls(
      await prisma.user.findMany({
        include: CONVERT_USER_INCLUDE,
        where: {
          id: {
            in: artistsSupportedIds.slice(0, NUM_ARTISTS),
          },
          profilePhotoId: {
            not: null,
          },
        },
      })
    ).map((userInner) => convertUser(userInner)),
    getBoughtNftAssetsFromAllBuys(allBuys),
    getBiggestSecondarySaleFromAllSales(allSecondarySales),
    getFirstArtistSupportedFromAllBuys(allBuys),
    getFirstEditionBoughtFromAllBuys(allBuys),
    getFirstOneOfOneBoughtFromAllBuys(allBuys),
  ]);
  const totalVolume = getTotalVolumeFromAllBuys(allBuys);

  const numBuysRank = COLLECTOR_NUM_BUYS_RANKING_2022.findIndex(
    ({ ToUserId }) => ToUserId === userId
  );
  const volumeRank = COLLECTOR_VOLUME_RANKING_2022.findIndex(
    ({ ToUserId }) => ToUserId === userId
  );

  return {
    __typename: Typename.FlashbackCollectorStats,
    artistsSupportedSample,
    biggestSecondarySale: biggestSecondarySale?.nft,
    biggestSecondarySalePrice: biggestSecondarySale?.price,
    boughtNftAssets,
    firstArtistSupported,
    firstEditionBought,
    firstOneOfOneBought,
    numArtistsSupported: artistsSupportedIds.length,
    numBuysRank: numBuysRank === -1 ? null : numBuysRank + 1,
    numEditionsBought: getNumEditionsBoughtFromAllBuys(allBuys),
    numOneOfOnesBought: getNumOneOfOnesBoughtFromAllBuys(allBuys),
    numPrimaryBuys: getNumPrimaryBuysFromAllBuys(allBuys),
    numSecondaryBuys: getNumSecondaryBuysFromAllBuys(allBuys),
    numSecondarySales: allSecondarySales.length,
    totalVolumeSpentInLamports: totalVolume.totalVolumeInLamports,
    volumeRank: volumeRank === -1 ? null : volumeRank + 1,
  };
}
