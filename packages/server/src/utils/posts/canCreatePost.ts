import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import MyContext from "src/types/MyContext";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import invariant from "tiny-invariant";

export default async function canCreatePost({
  context,
  creatorId,
  creatorUsername,
  campaignSlug,
}: {
  campaignSlug: string;
  context: MyContext;
  creatorId?: Maybe<string>;
  creatorUsername?: Maybe<string>;
}): Promise<{ creatorUserId: string; viewerId: string }> {
  const verifiedPublicKey = assertUserSignedRequest(context);
  const viewerId = verifiedPublicKey.toString();

  const { campaign, isViewerTeamMember } =
    await getCampaignForCampaignForSlugInput(
      {
        campaignSlug,
        creatorId,
        creatorUsername,
      },
      viewerId
    );
  invariant(campaign != null, "Campaign does not exist!");

  // Is this change correct?
  const isAuthorizedToPost =
    isViewerTeamMember || campaign.Creator.id === viewerId;

  if (!isAuthorizedToPost) {
    throw new Error(
      "You do not have permissions to post an update for this campaign"
    );
  }

  return { creatorUserId: campaign.Creator.id, viewerId };
}
