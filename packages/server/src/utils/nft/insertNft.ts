import CONVERT_USER_INCLUDE from "src/constants/include/ConvertUserInclude";
import getArweaveLink from "formfn-shared/dist/utils/getArweaveLink";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  InsertNftInput,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";
import upsertNftAttribute from "src/utils/prisma/upsertNftAttribute";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import parseCreatorsMetadataString from "src/utils/nft/parseCreatorsMetadataString";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import dayjs from "src/utils/dates/dayjsex";
import findTokenMetadata from "formfn-shared/dist/utils/solana/pdas/findTokenMetadata";
import { PublicKey } from "@solana/web3.js";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";

const DEFAULT_SELLER_FEE_BASIS_POINTS = 500;
const SYMBOL = "";

function getBoundedBasisPoints(bp: number) {
  if (bp < 0) {
    return DEFAULT_SELLER_FEE_BASIS_POINTS;
  }
  if (bp > 20 * 100) {
    return DEFAULT_SELLER_FEE_BASIS_POINTS;
  }
  return bp;
}

async function insertNft(
  input: InsertNftInput,
  optionalInput?: {
    auctionCount?: number;
    hasBeenSold?: boolean;
    priceLastSoldCurrencyId?: string;
    priceLastSoldFor?: number;
    seriesRarityBasisPoints?: number;
    seriesRarityRanking?: number;
  },
  prismaTransactionClient?: PrismaTransactionClient
): Promise<ConvertNftToMetadataAccountType> {
  const prisma = prismaTransactionClient ?? getPrisma();

  const [metadataAccountAddress] = await findTokenMetadata(
    new PublicKey(input.mint)
  );

  const { attributes } = input;

  // Insert all the NFT attributes and get the created attribute ids
  // for the NFT creation which comes next
  const attributeIds: Array<{ attributeId: string }> = filterNulls(
    await Promise.all(
      attributes != null && attributes.length > 0
        ? attributes.map(upsertNftAttribute)
        : []
    )
  );

  const creators =
    parseCreatorsMetadataString(input.creatorsMetadataString) ?? [];
  const creatorAddresses = creators.map(({ address }) => address);
  const existingUsers = await prisma.user.findMany({
    where: {
      id: {
        in: creatorAddresses,
      },
    },
  });
  const usersToCreate = creatorAddresses.filter(
    (address) => existingUsers.find((user) => user.id === address) == null
  );
  await prisma.user.createMany({
    data: usersToCreate.map((address) => ({
      id: address,
      username: address,
    })),
  });

  const otherCreators = creators.filter(
    (creator) => creator.address !== input.creatorId
  );
  // Use multiple creates instead of createMany so we can use request IDs below.
  // Doesn't affect perf significantly b/c we only allow up to 4 collaborators.
  const requests = await Promise.all(
    otherCreators.map((creator) =>
      prisma.request.create({
        data: {
          fromUserId: input.creatorId,
          status: RequestStatusExpress_Enum.Pending,
          toUserId: creator.address,
        },
      })
    )
  );

  const nft = await prisma.nft.create({
    data: {
      Creator: {
        connect: {
          id: input.creatorId,
        },
      },
      NftDisclosure:
        input.disclosures == null
          ? undefined
          : {
              createMany: {
                data: input.disclosures.map((disclosure) => ({
                  details: disclosure.details,
                  type: disclosure.type,
                })),
              },
            },
      NftListing: {
        create: {},
      },
      // Don't call getMetadataAccount, it takes a while for it to return something (if called too early
      // after creating the NFT, it gives an error like "Unable to find account: BKx2dptUzUsuVJmg3MvjH63jNufQF7P78PEH522TfMfN")
      //
      // This will get updated to the correct values in a webhook (well, most of it is correct right now actually)
      NftMetadata: {
        create: {
          NonstandardAsset:
            input.nonstandardAsset == null
              ? undefined
              : {
                  create: {
                    arweaveTxid: input.nonstandardAsset.arweaveTxid,
                    contentType: input.nonstandardAsset.contentType,
                    downloadUrl: input.nonstandardAsset.downloadUrl,
                    height: input.nonstandardAsset.dimensions?.height,
                    path: input.nonstandardAsset.path,
                    width: input.nonstandardAsset.dimensions?.width,
                  },
                },
          assetArweaveTxid: input.assetArweaveTxid,
          assetHeight: input.assetHeight,
          assetWidth: input.assetWidth,
          contentType: input.contentType,
          creators: input.creatorsMetadataString,
          description: input.description,
          editionNonce: input.editionNonce,
          id: metadataAccountAddress.toString(),
          image: input.image,
          isMutable: true,
          key: 4,
          mint: input.mint,
          name: input.name,
          sellerFeeBasisPoints: getBoundedBasisPoints(
            input.sellerFeeBasisPoints
          ),
          symbol: SYMBOL,
          updateAuthority: input.creatorId,
          uri: getArweaveLink(input.metadataArweaveTxid),
        },
      },
      NftStatus: {
        connect: {
          value: input.status,
        },
      },
      NftToAttribute: {
        createMany: {
          data: attributeIds,
        },
      },
      NftToCollaborator: {
        createMany: {
          data: creators.map((creator) => ({
            collaboratorId: creator.address,
            requestId: requests.find(
              (request) => request.toUserId === creator.address
            )?.id,
            share: creator.share,
          })),
        },
      },
      Owner: {
        connect: {
          id: input.ownerId,
        },
      },
      PriceLastSoldCurrency:
        optionalInput?.priceLastSoldCurrencyId == null
          ? undefined
          : {
              connect: {
                id: optionalInput.priceLastSoldCurrencyId,
              },
            },
      Series:
        input.seriesMint != null
          ? { connect: { mint: input.seriesMint } }
          : undefined,
      auctionCount: optionalInput?.auctionCount,
      hasBeenSold: optionalInput?.hasBeenSold,
      id: input.mint,
      isPnft: input.isPnft ?? false,
      maxSupply: input.maxSupply,
      mint: input.mint,

      priceLastSoldForInLamports: optionalInput?.priceLastSoldFor,
      seriesRarityBasisPoints: optionalInput?.seriesRarityBasisPoints,
      seriesRarityRanking: optionalInput?.seriesRarityRanking,
      // For editions, set this to start of unix epoch so we can sort easily
      // since Prisma does not allow putting nulls last in sort orders
      timeLastEditionSoldPrimary:
        input.maxSupply !== 0 ? dayjs(0).toDate() : null,
    },
    include: {
      Creator: {
        include: CONVERT_USER_INCLUDE,
      },
      NftToAttribute: {
        include: {
          Attribute: true,
        },
      },
      NftToTag: {
        include: {
          Tag: true,
        },
      },
      Owner: {
        include: CONVERT_USER_INCLUDE,
      },
    },
  });

  const createdNft = await prisma.nft.findUnique({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    where: { id: nft.id },
  });

  return createdNft!;
}

export default insertNft;
