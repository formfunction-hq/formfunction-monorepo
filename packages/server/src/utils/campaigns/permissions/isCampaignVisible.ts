import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import { CampaignStatusExpress_Enum } from "src/__generated__/generated";

export default async function isCampaignVisible(
  campaignCreatorId: string,
  campaignStatus: CampaignStatusExpress_Enum,
  viewerId: MaybeUndef<string>
) {
  if (viewerId === campaignCreatorId) {
    return true;
  }
  if (
    (
      await getLdFlag(LaunchDarklyFlag.TeamWallets, [] as Array<string>)
    ).includes(viewerId ?? "")
  ) {
    return true;
  }

  switch (campaignStatus) {
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Published:
      return true;
    case CampaignStatusExpress_Enum.Approved:
    case CampaignStatusExpress_Enum.Draft:
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Rejected:
      return false;
    default:
      return assertUnreachable(campaignStatus);
  }
}
