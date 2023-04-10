import { PostVisibilityExpress_Enum } from "src/__generated__/generated";
import { Post } from "@prisma/client";
import getCampaignFundingTierIdsForUser from "src/utils/campaigns/getCampaignFundingTierIdsForUser";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import isUserCampaignCommunityOmniViewer from "formfn-shared/dist/utils/campaigns/isUserCampaignCommunityOmniViewer";

// Keep logic in sync with getPostsForCampaignWhereClause.ts
export default async function canViewerSeePost(
  post: Post & { Campaign: ConvertCampaignType },
  viewerId: string,
  isViewerTeamMember: boolean,
  isViewerHolder: boolean
): Promise<boolean> {
  if (post.visibility === PostVisibilityExpress_Enum.Public) {
    return true;
  }

  const viewerIsOmniViewer = isUserCampaignCommunityOmniViewer(
    viewerId,
    post.Campaign.Creator.id,
    isViewerTeamMember ?? false
  );
  const postHasSpecificFundingTierVisibility =
    post.visibilityFundingTierIds != null &&
    (post.visibilityFundingTierIds as Array<string>).length > 0;
  if (
    viewerIsOmniViewer ||
    (isViewerHolder && !postHasSpecificFundingTierVisibility)
  ) {
    return true;
  }

  const viewerFundingTierIds = await getCampaignFundingTierIdsForUser(
    { campaignId: post.Campaign!.id },
    viewerId
  );
  const userCanSeeFundingTierSpecificPost =
    viewerFundingTierIds != null &&
    viewerFundingTierIds.some((fundingTierId) =>
      (post.visibilityFundingTierIds as Array<string>).includes(fundingTierId)
    );

  return userCanSeeFundingTierSpecificPost;
}
