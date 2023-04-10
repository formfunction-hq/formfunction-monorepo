import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";

export default function areCampaignHoldersVisible(
  viewerId: MaybeUndef<string>,
  campaign: ConvertCampaignType,
  isViewerHolder: Maybe<boolean>,
  isViewerTeamMember: Maybe<boolean>
) {
  return (
    (viewerId != null && viewerId === campaign.Creator.id) ||
    isViewerHolder === true ||
    isViewerTeamMember === true
  );
}
