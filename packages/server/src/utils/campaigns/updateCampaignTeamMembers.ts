import { CampaignToTeamMember, Prisma } from "@prisma/client";
import ConvertCampaignType from "src/types/convert/ConvertCampaignType";
import getPrisma from "src/utils/prisma/getPrisma";

// Replaces existing team members with list passed in through
// `updatedMembersList`
export default function updateCampaignTeamMembers(
  campaign: ConvertCampaignType,
  updatedMembersList: Array<{
    role: string;
    userId: string;
  }>
): Promise<[Prisma.BatchPayload, ...Array<CampaignToTeamMember>]> {
  const prisma = getPrisma();
  const existingTeamMemberIds = campaign.CampaignToTeamMember.map(
    ({ Member }) => Member.id
  );
  const updatedTeamMemberIds = updatedMembersList.map(({ userId }) => userId);
  const teamMembersToRemove = existingTeamMemberIds.filter(
    (id) => !updatedTeamMemberIds.includes(id)
  );
  const removeTeamMembersQuery = prisma.campaignToTeamMember.deleteMany({
    where: {
      Campaign: { id: campaign.id },
      CampaignTeamMemberRole: { isNot: { value: "Creator" } },
      Member: { id: { in: teamMembersToRemove } },
    },
  });
  const upsertTeamMembersQueries = updatedMembersList.map((member) => {
    const updateData: Prisma.CampaignToTeamMemberUpdateInput = {
      Campaign: { connect: { id: campaign.id } },
      CampaignTeamMemberRole: { connect: { value: member.role } },
      Member: { connect: { id: member.userId } },
    };
    const requestCreateData: Prisma.CampaignToTeamMemberCreateInput["Request"] =
      {
        create: {
          // Use "Approved" by default for now since we are going with the
          // "Remove"-model rather than "Invite"-model
          RequestStatus: { connect: { value: "Approved" } },
          User_Request_fromUserIdToUser: {
            connect: { id: campaign.creatorId },
          },
          User_Request_toUserIdToUser: {
            connect: { id: member.userId },
          },
        },
      };
    // For explicit typing
    const createData: Prisma.CampaignToTeamMemberCreateInput = {
      Campaign: updateData.Campaign!,
      CampaignTeamMemberRole: updateData.CampaignTeamMemberRole!,
      Member: updateData.Member!,
      Request: requestCreateData,
      id: undefined,
      timeCreated: undefined,
    };

    return prisma.campaignToTeamMember.upsert({
      create: createData,
      update: updateData,
      where: {
        campaignId_memberId: {
          campaignId: campaign.id,
          memberId: member.userId,
        },
      },
    });
  });

  return prisma.$transaction([
    removeTeamMembersQuery,
    ...upsertTeamMembersQueries,
  ]);
}
