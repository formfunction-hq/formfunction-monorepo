import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import Typename from "src/types/enums/Typename";
import getCampaignGoalForCampaign from "src/utils/campaigns/getCampaignGoalForCampaign";
import getOrderedCampaignFundingTiersFromCampaign from "src/utils/campaigns/getOrderedCampaignFundingTiersFromCampaign";
import convertAsset from "src/utils/convert/convertAsset";
import convertUser from "src/utils/convert/convertUser";
import {
  CampaignCategoryExpress_Enum,
  CampaignColorSchemeExpress_Enum,
  CampaignStatusExpress_Enum,
  CampaignTeamMemberRoleExpress_Enum,
  CampaignV2,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";

export default async function convertCampaign(
  campaign: ConvertCampaignType,
  isViewerHolder: Maybe<boolean> = null
): Promise<CampaignV2> {
  const galleryAssets = campaign.GalleryAssets.map((asset) =>
    convertAsset(asset)
  );

  const galleryAssetOrder = campaign.galleryAssetOrder as Maybe<Array<string>>;
  if (galleryAssetOrder != null) {
    galleryAssets.sort(
      (a, b) =>
        galleryAssetOrder.indexOf(a.id) - galleryAssetOrder.indexOf(b.id)
    );
  }
  const fundingTierOrder = campaign.fundingTierOrder as Maybe<Array<string>>;
  const fundingTiers = getOrderedCampaignFundingTiersFromCampaign(campaign);

  return {
    __typename: Typename.CampaignV2,
    about: {
      __typename: Typename.CampaignAbout,
      campaign: campaign.aboutTheCampaign,
      contactInfo: campaign.aboutContactInfo,
      creator: campaign.aboutTheCreator,
      risksAndChallenges: campaign.aboutRisksAndChallenges,
      timeline: campaign.aboutTimeline,
    },
    category: campaign.category as CampaignCategoryExpress_Enum,
    colorScheme: campaign.colorScheme as CampaignColorSchemeExpress_Enum,
    creator: convertUser(campaign.Creator),
    endTime: campaign.endTime,
    fundingTierOrder,
    fundingTiers,
    galleryAssets,
    goal: await getCampaignGoalForCampaign(campaign),
    goalProgressSymbol: campaign.goalProgressSymbol,
    id: campaign.id,
    isViewerHolder,
    // TODO[campaigns]
    logoAsset: null,
    // Has its own resolver
    nftAssets: [],
    previewAsset: convertAsset(campaign.PreviewAsset),
    slug: campaign.slug,
    socialLinks: {
      __typename: Typename.CampaignSocialLinks,
      discord: campaign.discordHref,
      instagram: campaign.instagramHref,
      twitter: campaign.twitterHref,
      website: campaign.websiteHref,
    },
    status: campaign.status as CampaignStatusExpress_Enum,
    tagline: campaign.tagline,
    // Don't show the creator in the UI for now
    teamMembers: campaign.CampaignToTeamMember.filter(
      (member) =>
        member.role !== CampaignTeamMemberRoleExpress_Enum.Creator &&
        member.Request.status === RequestStatusExpress_Enum.Approved
    ).map((val) => ({
      __typename: Typename.CampaignTeamMember,
      member: convertUser(val.Member),
      role: val.role as CampaignTeamMemberRoleExpress_Enum,
      status: val.Request.status as RequestStatusExpress_Enum,
    })),
    timeCreated: campaign.timeCreated,
    title: campaign.title,
    youtubeVideoHref: campaign.youtubeVideoHref,
  };
}
