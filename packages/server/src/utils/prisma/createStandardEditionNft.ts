import { PublicKey } from "@solana/web3.js";
import findEditionPda from "formfn-shared/dist/utils/solana/pdas/findEditionPda";
import filterNulls from "formfn-shared/dist/utils/filterNulls";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getOnPlatformMetadataAccount from "src/utils/prisma/getOnPlatformMetadataAccount";
import getPrisma from "src/utils/prisma/getPrisma";
import upsertNftAttribute from "src/utils/prisma/upsertNftAttribute";
import {
  CurrencyNameExpress_Enum,
  MetadataAccount,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import invariant from "tiny-invariant";
import convertNftToMetadataAccount from "src/utils/convert/convertNftToMetadataAccount";
import ConvertNftToMetadataAccountType from "src/types/convert/ConvertNftToMetadataAccountType";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { Prisma } from "@prisma/client";
import findTokenMetadata from "formfn-shared/dist/utils/solana/pdas/findTokenMetadata";
import PrismaTransactionClient from "src/types/PrismaTransactionClient";

/**
 * Inserts a standard edition NFT into our DB.
 *
 * The master edition NFT's info is used to populate most of the new NFT's fields.
 *
 * TODO: convert to take object as input
 */
export default async function createStandardEditionNft(
  {
    edition,
    hasBeenSold = true,
    isPnft,
    masterEditionMint,
    ownerId,
    priceLastSoldForCurrencyName,
    priceLastSoldForInLamports,
    standardEditionMint,
  }: {
    edition: number;
    hasBeenSold?: boolean;
    isPnft: boolean;
    masterEditionMint: string;
    ownerId: string;
    priceLastSoldForCurrencyName?: MaybeUndef<CurrencyNameExpress_Enum>;
    priceLastSoldForInLamports?: MaybeUndef<number>;
    standardEditionMint: string;
  },
  prismaTransactionClient?: PrismaTransactionClient
): Promise<{
  metadataAccount: MetadataAccount;
  nft: ConvertNftToMetadataAccountType;
}> {
  const prisma = prismaTransactionClient ?? getPrisma();

  const [
    [standardEditionMetadataAccount],
    [standardEdition],
    masterEditionMetadata,
    masterEditionMetadataAccount,
  ] = await Promise.all([
    findTokenMetadata(new PublicKey(standardEditionMint)),
    findEditionPda(new PublicKey(standardEditionMint)),
    prisma.nftMetadata.findUnique({
      include: {
        Nft: true,
      },
      where: {
        mint: masterEditionMint,
      },
    }),
    getOnPlatformMetadataAccount(masterEditionMint),
  ]);
  invariant(masterEditionMetadata != null);

  const { attributes } = masterEditionMetadataAccount.data;

  // Insert all the NFT attributes and get the created attribute ids
  // for the NFT creation which comes next
  const attributeIds: Array<{ attributeId: string }> = filterNulls(
    await Promise.all(
      attributes != null && attributes.length > 0
        ? attributes.map(upsertNftAttribute)
        : []
    )
  );

  const campaignFundingTierId =
    masterEditionMetadata.Nft?.campaignFundingTierId;

  const nftMetadataCreate: Prisma.NftMetadataUncheckedCreateWithoutNftInput = {
    assetArweaveTxid: masterEditionMetadata.assetArweaveTxid,
    assetHeight: masterEditionMetadata.assetHeight,
    assetWidth: masterEditionMetadata.assetWidth,
    contentType: masterEditionMetadata.contentType,
    creators: masterEditionMetadata.creators ?? undefined,
    description: masterEditionMetadata.description,
    id: standardEditionMetadataAccount.toString(),
    image: masterEditionMetadata.image,
    isMutable: masterEditionMetadata.isMutable,
    key: masterEditionMetadata.key,
    mint: standardEditionMint,
    name: masterEditionMetadata.name,
    nonstandardAssetId: masterEditionMetadata.nonstandardAssetId,
    sellerFeeBasisPoints: masterEditionMetadata.sellerFeeBasisPoints,
    symbol: masterEditionMetadata.symbol,
    updateAuthority: masterEditionMetadata.updateAuthority,
    uri: masterEditionMetadata.uri,
    videoPlaybackId: masterEditionMetadata.videoPlaybackId,
    videoPreviewPlaybackId: masterEditionMetadata.videoPreviewPlaybackId,
  };

  const nft = await prisma.nft.create({
    data: {
      CampaignFundingTier:
        campaignFundingTierId == null
          ? undefined
          : {
              connect: {
                id: campaignFundingTierId,
              },
            },
      Creator: {
        connect: {
          id: masterEditionMetadataAccount.nft.creatorId,
        },
      },
      MasterEditionNft: {
        connect: {
          mint: masterEditionMint,
        },
      },
      NftListing: {
        create: {},
      },
      NftMetadata: {
        create: nftMetadataCreate,
      },
      NftStatus: {
        connect: {
          value: NftStatusExpress_Enum.Owned,
        },
      },
      NftToAttribute: {
        createMany: {
          data: attributeIds,
        },
      },
      Owner: {
        connect: {
          id: ownerId,
        },
      },
      PriceLastSoldCurrency:
        priceLastSoldForCurrencyName != null
          ? {
              connect: { name: priceLastSoldForCurrencyName },
            }
          : undefined,
      auctionCount: hasBeenSold ? 1 : 0,
      edition,
      hasBeenSold,
      id: standardEditionMint,
      isMasterEdition: false,
      isPnft,
      mint: standardEditionMint,
      priceLastSoldForInLamports,
      standardEdition: standardEdition.toString(),
    },
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
  });

  return { metadataAccount: convertNftToMetadataAccount(nft), nft };
}
