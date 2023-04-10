import { NextFunction, Request, Response } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import createCampaignApprovedNotification from "src/utils/notifications/create/createCampaignApprovedNotification";
import createCampaignRejectedNotification from "src/utils/notifications/create/createCampaignRejectedNotification";
import getPrisma from "src/utils/prisma/getPrisma";
import { CampaignStatusExpress_Enum } from "src/__generated__/generated";
import invariant from "tiny-invariant";
import { Notification } from "@prisma/client";
import getFollowers from "src/utils/prisma/getFollowers";
import createCampaignFollowersCampaignPublishedNotifications from "src/utils/notifications/create/createCampaignFollowersCampaignPublishedNotifications";
import getCampaignTeamMembers from "src/utils/prisma/getCampaignTeamMembers";
import createCampaignAddedAsTeamMemberNotifications from "src/utils/notifications/create/createCampaignAddedAsTeamMemberNotifications";

async function createFollowerNotifications(
  creatorId: string,
  campaignId: string
) {
  const followers = await getFollowers(creatorId);
  return createCampaignFollowersCampaignPublishedNotifications(
    followers.map((follower) => ({
      data: { campaignId },
      receiverId: follower.id,
      senderId: creatorId,
    }))
  );
}

async function createTeamMemberNotifications(
  creatorId: string,
  campaignId: string
) {
  const teamMembers = await getCampaignTeamMembers(campaignId);
  return createCampaignAddedAsTeamMemberNotifications(
    teamMembers.map((teamMember) => ({
      data: { campaignId },
      receiverId: teamMember.id,
      senderId: creatorId,
    }))
  );
}

async function sendNotificationForStatus(
  status: CampaignStatusExpress_Enum,
  campaignId: string,
  creatorId: string
): Promise<Maybe<Notification>> {
  switch (status) {
    case CampaignStatusExpress_Enum.Approved:
      return createCampaignApprovedNotification({ campaignId }, creatorId);
    case CampaignStatusExpress_Enum.Rejected:
      return createCampaignRejectedNotification({ campaignId }, creatorId);
    case CampaignStatusExpress_Enum.Concluded:
    case CampaignStatusExpress_Enum.Published:
      await Promise.all([
        createFollowerNotifications(creatorId, campaignId),
        createTeamMemberNotifications(creatorId, campaignId),
      ]);
      return null;
    case CampaignStatusExpress_Enum.Pending:
    case CampaignStatusExpress_Enum.Draft:
      return null;
    default:
      return assertUnreachable(status);
  }
}

export default async function createCampaignNotificationsWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id } = req.body.event.data.new;
  const prisma = getPrisma();
  const campaign = await prisma.campaign.findUnique({
    include: { Creator: true },
    where: { id },
  });
  invariant(
    campaign != null && campaign.Creator != null,
    "Campaign and creator should not be null"
  );

  const status = campaign.status as CampaignStatusExpress_Enum;
  const {
    Creator: { id: creatorId },
    id: campaignId,
  } = campaign;
  const notif = await sendNotificationForStatus(status, campaignId, creatorId);

  res.json({ notif, success: true });
}
