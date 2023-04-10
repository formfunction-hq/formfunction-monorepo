import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import { PostVisibilityExpress_Enum } from "src/__generated__/generated";
import { CampaignToHolder, Prisma } from "@prisma/client";
import getCampaignWhereForCampaignForSlugInput from "src/utils/campaigns/getCampaignWhereForCampaignForSlugInput";
import getCampaignWithHolderAndTeamMemberStatus from "src/utils/campaigns/getCampaignWithHolderAndTeamMemberStatus";
import getCampaignFundingTierIdsForUser from "src/utils/campaigns/getCampaignFundingTierIdsForUser";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import canUserSeeCampaignGatedCommunity from "formfn-shared/dist/utils/campaigns/canUserSeeCampaignGatedCommunity";
import invariant from "tiny-invariant";
import isUserCampaignCommunityOmniViewer from "formfn-shared/dist/utils/campaigns/isUserCampaignCommunityOmniViewer";

// Keep logic in sync with canViewerSeePost.ts
export default async function getPostsForCampaignWhereClause(
  input: {
    campaignSlug?: string;
    creatorId?: MaybeUndef<string>;
    creatorUsername?: MaybeUndef<string>;
  },
  viewerId: string,
  preLoadedCampaign?: Maybe<
    ConvertCampaignType & {
      CampaignToHolder: Array<CampaignToHolder>;
    }
  >
): Promise<Prisma.PostWhereInput> {
  const [
    { campaign, isViewerHolder, isViewerTeamMember },
    viewerFundingTierIds,
  ] = await Promise.all([
    preLoadedCampaign != null
      ? getCampaignWithHolderAndTeamMemberStatus(preLoadedCampaign, viewerId)
      : getCampaignForCampaignForSlugInput(
          { ...input, campaignSlug: input.campaignSlug! },
          viewerId
        ),
    getCampaignFundingTierIdsForUser(
      preLoadedCampaign != null ? { campaignId: preLoadedCampaign.id } : input,
      viewerId
    ),
  ]);
  invariant(campaign != null, "Campaign must not be null");

  const viewerCanSeeGatedPosts = canUserSeeCampaignGatedCommunity(
    viewerId,
    campaign.Creator.id,
    isViewerTeamMember ?? false,
    isViewerHolder ?? false
  );
  const postVisibilityAllowlist = [
    PostVisibilityExpress_Enum.Public,
    ...(viewerCanSeeGatedPosts
      ? [PostVisibilityExpress_Enum.CampaignSupportersOnly]
      : []),
  ];
  const userIsOmniViewer = isUserCampaignCommunityOmniViewer(
    viewerId ?? null,
    campaign.Creator.id,
    isViewerTeamMember ?? false
  );

  return {
    Campaign:
      campaign != null
        ? { id: campaign.id }
        : getCampaignWhereForCampaignForSlugInput({
            ...input,
            campaignSlug: input.campaignSlug!,
          }),
    // If viewer is creator or team member, they should be able to see all posts
    ...(userIsOmniViewer
      ? {}
      : {
          PostVisibility: { value: { in: postVisibilityAllowlist } },
          ...(viewerFundingTierIds != null
            ? {
                OR: [
                  // Posts with `visibilityFundingTierIds = null` are visible
                  // to all holders
                  { visibilityFundingTierIds: { equals: Prisma.DbNull } },
                  ...viewerFundingTierIds.map((fundingTierId) => ({
                    visibilityFundingTierIds: {
                      array_contains: [fundingTierId],
                    },
                  })),
                ],
              }
            : { visibilityFundingTierIds: { equals: Prisma.DbNull } }),
        }),
  };
}
