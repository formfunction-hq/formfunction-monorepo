import Typename from "src/types/enums/Typename";
import MyContext from "src/types/MyContext";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import {
  CampaignHoldersForSlugInput,
  HolderConnection,
} from "src/__generated__/generated";
import getCampaignForCampaignForSlugInput from "src/utils/campaigns/getCampaignForCampaignForSlugInput";
import getEmptyConnection from "src/utils/graphql/getEmptyConnection";
import convertUser from "src/utils/convert/convertUser";
import getCampaignHoldersFromCampaignToHolderTable from "src/utils/campaigns/getCampaignHoldersFromCampaignToHolderTable";
import areCampaignHoldersVisible from "src/utils/campaigns/permissions/areCampaignHoldersVisible";
import getViewerId from "src/utils/auth/getViewerId";

export default async function campaignHoldersForSlugResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number,
  input: CampaignHoldersForSlugInput
): Promise<HolderConnection> {
  const viewerId = getViewerId(context, input.viewerId);
  const afterNumber = after == null ? 0 : Number(after);
  if (viewerId == null) {
    // Logged out users can't see holders
    return getEmptyConnection(Typename.HolderConnection);
  }

  const { campaign, isViewerHolder, isViewerTeamMember } =
    await getCampaignForCampaignForSlugInput(input, viewerId);
  if (campaign == null) {
    return getEmptyConnection(Typename.HolderConnection);
  }

  if (
    !areCampaignHoldersVisible(
      viewerId,
      campaign,
      isViewerHolder,
      isViewerTeamMember
    )
  ) {
    return getEmptyConnection(Typename.HolderConnection);
  }

  const [holders, holderCount] =
    await getCampaignHoldersFromCampaignToHolderTable(
      campaign.id,
      afterNumber,
      first,
      input.fundingTierIds
    );

  const convertedHolders = await Promise.all(
    holders.map((holder) => ({
      __typename: Typename.Holder as const,
      user: convertUser(holder.User),
    }))
  );

  return createOffsetPaginationConnection(
    convertedHolders,
    Typename.HolderEdge,
    Typename.HolderConnection,
    after,
    first,
    holderCount
  );
}
