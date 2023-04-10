import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import getCampaignWhereForCampaignForSlugInput from "src/utils/campaigns/getCampaignWhereForCampaignForSlugInput";
import getPrisma from "src/utils/prisma/getPrisma";
import invariant from "tiny-invariant";
import getCampaignWithHolderAndTeamMemberStatus, {
  CampaignWithHolderAndTeamMemberStatus,
} from "src/utils/campaigns/getCampaignWithHolderAndTeamMemberStatus";
import getViewerIsHolderInclude from "src/utils/campaigns/getViewerIsHolderInclude";

export default async function getCampaignForCampaignForSlugInput(
  input: {
    campaignSlug: string;
    creatorId?: MaybeUndef<string>;
    creatorUsername?: MaybeUndef<string>;
  },
  viewerId: MaybeUndef<string>
): Promise<CampaignWithHolderAndTeamMemberStatus> {
  const { creatorId, creatorUsername } = input;
  invariant(
    creatorId != null || creatorUsername != null,
    "One of creatorId and creatorUsername must be non-null"
  );
  const prisma = getPrisma();

  const campaign = await prisma.campaign.findFirst({
    include: {
      ...CONVERT_CAMPAIGN_INCLUDE,
      CampaignToHolder: getViewerIsHolderInclude(viewerId ?? ""),
    },
    where: getCampaignWhereForCampaignForSlugInput(input),
  });

  return getCampaignWithHolderAndTeamMemberStatus(campaign, viewerId);
}
