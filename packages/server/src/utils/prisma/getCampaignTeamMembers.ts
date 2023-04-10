import { User } from "@prisma/client";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  CampaignTeamMemberRoleExpress_Enum,
  RequestStatusExpress_Enum,
} from "src/__generated__/generated";

export default async function getCampaignTeamMembers(
  campaignId: string,
  includeRejected = false,
  includeCreator = false
): Promise<Array<User>> {
  const prisma = getPrisma();

  return (
    await prisma.campaignToTeamMember.findMany({
      include: { Member: true },
      where: {
        Campaign: { id: campaignId },
        CampaignTeamMemberRole: {
          value: {
            in: [
              CampaignTeamMemberRoleExpress_Enum.Member,
              ...(includeCreator === true
                ? [CampaignTeamMemberRoleExpress_Enum.Creator]
                : []),
            ],
          },
        },
        ...(includeRejected === false
          ? {
              Request: {
                status: RequestStatusExpress_Enum.Approved,
              },
            }
          : {}),
      },
    })
  ).map((val) => val.Member);
}
