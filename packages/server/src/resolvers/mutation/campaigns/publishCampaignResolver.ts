import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import {
  CampaignStatusExpress_Enum,
  CampaignV2,
  PublishCampaignInput,
  PublishCampaignResponse,
} from "src/__generated__/generated";
import getPrisma from "src/utils/prisma/getPrisma";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import convertCampaign from "src/utils/convert/convertCampaign";
import assertCanUpdateCampaign from "src/utils/campaigns/assertCanUpdateCampaign";
import assertCampaignHasGalleryAsset from "src/utils/campaigns/validation/assertCampaignHasGalleryAsset";
import assertCampaignHasAbout from "src/utils/campaigns/validation/assertCampaignHasAbout";
import assertCampaignHasFundingTier from "src/utils/campaigns/validation/assertCampaignHasFundingTier";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CampaignAction from "src/types/enums/CampaignAction";

async function assertCanCampaignBePublished(campaign: CampaignV2) {
  if (campaign.status !== CampaignStatusExpress_Enum.Approved) {
    throw new Error("Only approved campaigns can be published.");
  }

  assertCampaignHasGalleryAsset(campaign);
  assertCampaignHasAbout(campaign);
  assertCampaignHasFundingTier(campaign);

  const prisma = getPrisma();
  const fundingTierNfts = await Promise.all(
    campaign.fundingTiers!.map((tier) =>
      prisma.nft.findFirst({ where: { campaignFundingTierId: tier.id } })
    )
  );
  if (!fundingTierNfts.every((tierNft) => tierNft != null)) {
    throw new Error("All funding tiers must have at least one NFT.");
  }
}

export default async function publishCampaignResolver(
  context: MyContext,
  input: PublishCampaignInput
): Promise<PublishCampaignResponse> {
  const prisma = getPrisma();
  const verifiedPublicKey = assertUserSignedRequest(context);
  const campaignBeforeUpdate = await assertCanUpdateCampaign(
    verifiedPublicKey,
    { id: input.campaignId },
    CampaignAction.PublishCampaign
  );
  await assertCanCampaignBePublished(
    await convertCampaign(campaignBeforeUpdate)
  );

  const campaign = await prisma.campaign.update({
    data: {
      status: CampaignStatusExpress_Enum.Published,
    },
    include: CONVERT_CAMPAIGN_INCLUDE,
    where: {
      id: input.campaignId,
    },
  });

  return {
    __typename: Typename.PublishCampaignResponse,
    campaign: await convertCampaign(campaign),
  };
}
