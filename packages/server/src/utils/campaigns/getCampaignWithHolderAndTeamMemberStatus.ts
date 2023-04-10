import { CampaignToHolder } from "@prisma/client";
import { Maybe, MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";

export type CampaignWithHolderAndTeamMemberStatus = {
  campaign: Maybe<ConvertCampaignType>;
  isViewerHolder: Maybe<boolean>;
  isViewerTeamMember: Maybe<boolean>;
};

export default function getCampaignWithHolderAndTeamMemberStatus(
  campaign: Maybe<
    ConvertCampaignType & {
      CampaignToHolder: Array<CampaignToHolder>;
    }
  >,
  viewerId: MaybeUndef<string>
): CampaignWithHolderAndTeamMemberStatus {
  return {
    campaign,
    isViewerHolder:
      viewerId == null || campaign == null
        ? null
        : campaign.CampaignToHolder.length > 0,
    isViewerTeamMember:
      viewerId == null || campaign == null
        ? null
        : campaign.CampaignToTeamMember.find(
            (teamMember) => teamMember.Member.id === viewerId
          ) != null,
  };
}
