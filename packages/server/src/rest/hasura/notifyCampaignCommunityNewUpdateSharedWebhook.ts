import { Request, Response, NextFunction } from "express";
import removeDuplicatesWithSet from "formfn-shared/dist/utils/array/removeDuplicatesWithSet";
import CONVERT_CAMPAIGN_INCLUDE from "src/constants/include/ConvertCampaignInclude";
import getCampaignHoldersFromCampaignToHolderTable from "src/utils/campaigns/getCampaignHoldersFromCampaignToHolderTable";
import createCampaignCommunityNewUpdateSharedNotifications from "src/utils/notifications/create/createCampaignCommunityNewUpdateSharedNotifications";
import getCampaignTeamMembers from "src/utils/prisma/getCampaignTeamMembers";
import getPrisma from "src/utils/prisma/getPrisma";
import canViewerSeePost from "src/utils/campaigns/permissions/canViewerSeePost";

export default async function notifyCampaignCommunityNewUpdateSharedWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { id: postId } = req.body.event.data.new;
  const post = await getPrisma().post.findUnique({
    include: {
      Campaign: {
        include: CONVERT_CAMPAIGN_INCLUDE,
      },
    },
    where: { id: postId },
  });
  if (post == null || post.Campaign == null) {
    res.json({
      message: "Post is not part of campaign, skipping notification creation",
      status: "skipped",
    });
    return;
  }
  if (post.airdropMasterEditionMint != null) {
    res.json({
      message: "Post is an airdrop notice, skipping",
      status: "skipped",
    });
    return;
  }

  const [[holders], teamMembers] = await Promise.all([
    getCampaignHoldersFromCampaignToHolderTable(post.Campaign.id),
    getCampaignTeamMembers(post.Campaign.id, false, true),
  ]);
  const holderUserIds = holders.map(({ User: { id: userId } }) => userId);
  const teamMemberIds = teamMembers.map(({ id: userId }) => userId);

  const userIdsToSendNotificationTo = removeDuplicatesWithSet(
    // Need to do this since `filter` doesn't work with async methods
    (
      await Promise.all(
        [...holderUserIds, ...teamMemberIds].map(async (userId) => {
          const canUserSeePost = await canViewerSeePost(
            // Type is not properly reducing from the early return above, any ideas?
            { ...post, Campaign: post.Campaign! },
            userId,
            teamMemberIds.includes(userId),
            holderUserIds.includes(userId)
          );

          return {
            shouldSendNotif: userId !== post.creatorId && canUserSeePost,
            userId,
          };
        })
      )
    )
      .filter(({ shouldSendNotif }) => shouldSendNotif)
      .map(({ userId }) => userId)
  );

  await createCampaignCommunityNewUpdateSharedNotifications(
    userIdsToSendNotificationTo.map((userId) => ({
      data: { postId },
      receiverId: userId,
      senderId: post.creatorId,
    }))
  );

  res.json({ success: true });
}
