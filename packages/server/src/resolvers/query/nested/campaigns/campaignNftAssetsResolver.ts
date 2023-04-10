import Typename from "src/types/enums/Typename";
import convertNftToAsset from "src/utils/convert/convertNftToAsset";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NftAsset,
  NftAssetsForCampaignInput,
} from "src/__generated__/generated";

export default async function campaignNftAssetsResolver(
  campaignId: string,
  input: NftAssetsForCampaignInput
): Promise<Array<NftAsset>> {
  const prisma = getPrisma();
  const nfts = await prisma.nft.findMany({
    include: {
      NftMetadata: true,
    },
    take: input.first,
    where: {
      CampaignFundingTier: {
        campaignId,
      },
      isMasterEdition: true,
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
