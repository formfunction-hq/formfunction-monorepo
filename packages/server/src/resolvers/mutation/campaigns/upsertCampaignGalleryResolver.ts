import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  UpsertCampaignGalleryInput,
  UpsertCampaignGalleryResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";

export default async function upsertCampaignGalleryResolver(
  context: MyContext,
  input: UpsertCampaignGalleryInput
): Promise<UpsertCampaignGalleryResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.EditGallery
  );

  // Create new assets if necessary
  const assets = await Promise.all(
    input.galleryAssets.map(async (assetInput) => {
      const existingAsset = await prisma.asset.findFirst({
        where: {
          campaignGalleryAssetCampaignId: input.campaignId,
          path: assetInput.path,
        },
      });

      if (existingAsset != null) {
        return existingAsset;
      }

      return prisma.asset.create({
        data: {
          contentType: assetInput.contentType,
          downloadUrl: assetInput.downloadUrl,
          height: assetInput.dimensions?.height,
          path: assetInput.path,
          width: assetInput.dimensions?.width,
        },
      });
    })
  );

  // Delete old assets that are no longer linked to the campaign
  const existingAssets = await prisma.asset.findMany({
    where: {
      campaignGalleryAssetCampaignId: input.campaignId,
    },
  });
  await Promise.all(
    existingAssets.map((existingAsset) => {
      if (assets.find((asset) => asset.id === existingAsset.id)) {
        return null;
      }

      return prisma.asset.delete({
        where: {
          id: existingAsset.id,
        },
      });
    })
  );

  const campaign = await prisma.campaign.update({
    data: {
      GalleryAssets: {
        connect: assets.map((asset) => ({ id: asset.id })),
      },
      galleryAssetOrder: assets.map((asset) => asset.id),
      youtubeVideoHref: input.youtubeVideoHref ?? undefined,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  return {
    __typename: Typename.UpsertCampaignGalleryResponse,
    campaign: await convertCampaign(campaign),
  };
}
