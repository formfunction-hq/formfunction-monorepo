import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import MyContext from "src/types/MyContext";
import {
  ActivityNotificationsConnection,
  NotificationTypeExpress_Enum,
} from "src/__generated__/generated";
import createOffsetPaginationConnection from "src/utils/pagination/createOffsetPaginationConnection";
import Typename from "src/types/enums/Typename";
import getPrisma from "src/utils/prisma/getPrisma";
import assertUserSignedRequest from "src/utils/auth/assertUserSignedRequest";
import CONVERT_ACTIVITY_NOTIFICATION_INCLUDE from "src/constants/include/ConvertActivityNotificationInclude";
import ConvertActivityNotificationType from "src/types/convert/ConvertActivityNotificationType";
import convertBidderAuctionAlmostOverNotification from "src/utils/notifications/convert/convertBidderAuctionAlmostOverNotification";
import convertBidderAuctionExtendedNotification from "src/utils/notifications/convert/convertBidderAuctionExtendedNotification";
import convertBidderAuctionSettledNotification from "src/utils/notifications/convert/convertBidderAuctionSettledNotification";
import convertBidderClaimPnftNotification from "src/utils/notifications/convert/convertBidderClaimPnftNotification";
import convertBidderClaimPnftReminderNotification from "src/utils/notifications/convert/convertBidderClaimPnftReminderNotification";
import convertBidderLostAuctionNotification from "src/utils/notifications/convert/convertBidderLostAuctionNotification";
import convertBidderOutbidNotification from "src/utils/notifications/convert/convertBidderOutbidNotification";
import convertBidderWonAuctionNotification from "src/utils/notifications/convert/convertBidderWonAuctionNotification";
import convertBuyerOfferAcceptedNotification from "src/utils/notifications/convert/convertBuyerOfferAcceptedNotification";
import convertBuyerOfferExpiredNotification from "src/utils/notifications/convert/convertBuyerOfferExpiredNotification";
import convertCollabRequestNotification from "src/utils/notifications/convert/convertCollabRequestNotification";
import convertCreatorSecondarySaleNotification from "src/utils/notifications/convert/convertCreatorSecondarySaleNotification";
import convertFollowerAuctionAlmostOverNotification from "src/utils/notifications/convert/convertFollowerAuctionAlmostOverNotification";
import convertFollowerNewEditionsListedNotification from "src/utils/notifications/convert/convertFollowerNewEditionsListedNotification";
import convertFollowerNewPieceListedNotification from "src/utils/notifications/convert/convertFollowerNewPieceListedNotification";
import convertFollowerNewPieceScheduledNotification from "src/utils/notifications/convert/convertFollowerNewPieceScheduledNotification";
import convertFollowerNewPieceListedSecondaryNotification from "src/utils/notifications/convert/convertFollowerNewPieceListedSecondaryNotification";
import convertFollowerScheduledAuctionIsLiveNotification from "src/utils/notifications/convert/convertFollowerScheduledAuctionIsLiveNotification";
import convertInvitesConvertedToCreatorNotification from "src/utils/notifications/convert/convertInvitesConvertedToCreatorNotification";
import convertInvitesInviteeAcceptedInviteNotification from "src/utils/notifications/convert/convertInvitesInviteeAcceptedInviteNotification";
import convertNewFollowerNotification from "src/utils/notifications/convert/convertNewFollowerNotification";
import convertOwnerAuctionEndedNotification from "src/utils/notifications/convert/convertOwnerAuctionEndedNotification";
import convertOwnerAuctionEndedNoBidsNotification from "src/utils/notifications/convert/convertOwnerAuctionEndedNoBidsNotification";
import convertOwnerAuctionExtendedNotification from "src/utils/notifications/convert/convertOwnerAuctionExtendedNotification";
import convertOwnerAuctionSettledNotification from "src/utils/notifications/convert/convertOwnerAuctionSettledNotification";
import convertOwnerEditionSoldNotification from "src/utils/notifications/convert/convertOwnerEditionSoldNotification";
import convertOwnerEditionsSoldOutNotification from "src/utils/notifications/convert/convertOwnerEditionsSoldOutNotification";
import convertOwnerFirstBidReceivedNotification from "src/utils/notifications/convert/convertOwnerFirstBidReceivedNotification";
import convertOwnerOfferReceivedNotification from "src/utils/notifications/convert/convertOwnerOfferReceivedNotification";
import convertOwnerOtherBidReceivedNotification from "src/utils/notifications/convert/convertOwnerOtherBidReceivedNotification";
import convertOwnerPieceSoldAsInstantSaleNotification from "src/utils/notifications/convert/convertOwnerPieceSoldAsInstantSaleNotification";
import convertUnlockableDeclinedToSharedInfoNotification from "src/utils/notifications/convert/convertUnlockableDeclinedToSharedInfoNotification";
import convertUnlockableInfoSharedNotification from "src/utils/notifications/convert/convertUnlockableInfoSharedNotification";
import convertUnlockableShareInfoNotification from "src/utils/notifications/convert/convertUnlockableShareInfoNotification";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { Prisma } from "@prisma/client";
import ACTIVITY_NOTIFICATION_TYPES from "src/constants/ActivityNotificationTypes";
import invariant from "tiny-invariant";
import convertOwnerGenerativeMintSoldOutNotification from "src/utils/notifications/convert/convertOwnerGenerativeMintSoldOutNotification";
import CONVERT_CANDY_MACHINE_INCLUDE from "src/constants/include/ConvertCandyMachineInclude";
import parseNotificationData from "src/utils/notifications/parseNotificationData";
import getConvertedCampaignApprovedNotificationFromCampaignId from "src/utils/notifications/convert/getConvertedCampaignApprovedNotificationFromCampaignId";
import getConvertedCampaignRejectedNotificationFromCampaignId from "src/utils/notifications/convert/getConvertedCampaignRejectedNotificationFromCampaignId";
import getConvertedCampaignCommunityNewUpdateSharedNotificationFromPostId from "src/utils/notifications/convert/getConvertedCampaignCommunityNewUpdateSharedNotificationFromPostId";
import getConvertedCampaignAddedAsTeamMemberNotificationFromCampaignId from "src/utils/notifications/convert/getConvertedCampaignAddedAsTeamMemberNotificationFromCampaignId";
import getConvertedCampaignFollowerCampaignPublishedNotificationFromCampaignId from "src/utils/notifications/convert/getConvertedCampaignFollowerCampaignPublishedNotificationFromCampaignId";
import getConvertedCampaignGoalReachedXPercentNotificationFromCampaignId from "src/utils/notifications/convert/getConvertedCampaignGoalReachedXPercentNotificationFromCampaignId";
import convertBonkClaimNotification from "src/utils/notifications/convert/convertBonkClaimNotification";
import convertAirdropCompletedNotification from "src/utils/notifications/convert/convertAirdropCompletedNotification";
import convertAirdropGiftReceivedNotification from "src/utils/notifications/convert/convertAirdropGiftReceivedNotification";
import convertCampaignRejectedWithFeedbackNotification from "src/utils/notifications/convert/convertCampaignRejectedWithFeedbackNotification";

/**
 * Keep in sync with ActivityNotificationTypes.
 */
async function convertNotification(notif: ConvertActivityNotificationType) {
  const type = notif.Notification.type as NotificationTypeExpress_Enum;
  switch (type) {
    case NotificationTypeExpress_Enum.AirdropCompleted:
      return convertAirdropCompletedNotification(notif);
    case NotificationTypeExpress_Enum.AirdropGiftReceived: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.AirdropGiftReceived,
        notif.Notification.data as Record<string, any>
      );

      return convertAirdropGiftReceivedNotification(
        notif,
        parsedNotifData.notificationData.airdropId
      );
    }
    case NotificationTypeExpress_Enum.BidderAuctionAlmostOver:
      return convertBidderAuctionAlmostOverNotification(notif);
    case NotificationTypeExpress_Enum.BidderAuctionExtended:
      return convertBidderAuctionExtendedNotification(notif);
    case NotificationTypeExpress_Enum.BidderAuctionSettled:
      return convertBidderAuctionSettledNotification(notif);
    case NotificationTypeExpress_Enum.BidderClaimPnft:
      return convertBidderClaimPnftNotification(notif);
    case NotificationTypeExpress_Enum.BidderClaimPnftReminder:
      return convertBidderClaimPnftReminderNotification(notif);
    case NotificationTypeExpress_Enum.BidderLostAuction:
      return convertBidderLostAuctionNotification(notif);
    case NotificationTypeExpress_Enum.BidderOutbid:
      return convertBidderOutbidNotification(notif);
    case NotificationTypeExpress_Enum.BidderWonAuction:
      return convertBidderWonAuctionNotification(notif);
    case NotificationTypeExpress_Enum.BonkClaim:
      return convertBonkClaimNotification(notif);
    case NotificationTypeExpress_Enum.BuyerOfferAccepted:
      return convertBuyerOfferAcceptedNotification(notif);
    case NotificationTypeExpress_Enum.BuyerOfferExpired:
      return convertBuyerOfferExpiredNotification(notif);
    case NotificationTypeExpress_Enum.CollabRequest:
      return convertCollabRequestNotification(notif);
    case NotificationTypeExpress_Enum.CampaignAddedAsTeamMember: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignAddedAsTeamMember,
        notif.Notification.data as Record<string, any>
      );
      return getConvertedCampaignAddedAsTeamMemberNotificationFromCampaignId(
        notif,
        parsedNotifData.notificationData.campaignId
      );
    }
    case NotificationTypeExpress_Enum.CampaignApproved: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignApproved,
        notif.Notification.data as Record<string, any>
      );
      return getConvertedCampaignApprovedNotificationFromCampaignId(
        notif,
        parsedNotifData.notificationData.campaignId
      );
    }
    case NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared,
        notif.Notification.data as Record<string, any>
      );
      return getConvertedCampaignCommunityNewUpdateSharedNotificationFromPostId(
        notif,
        parsedNotifData.notificationData.postId
      );
    }
    case NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished,
        notif.Notification.data as Record<string, any>
      );
      return getConvertedCampaignFollowerCampaignPublishedNotificationFromCampaignId(
        notif,
        parsedNotifData.notificationData.campaignId
      );
    }
    case NotificationTypeExpress_Enum.CampaignGoalReachedXPercent: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignGoalReachedXPercent,
        notif.Notification.data as Record<string, any>
      );
      const { campaignId, percentAsNumber } = parsedNotifData.notificationData;
      return getConvertedCampaignGoalReachedXPercentNotificationFromCampaignId(
        notif,
        campaignId,
        percentAsNumber as 50 | 100
      );
    }
    case NotificationTypeExpress_Enum.CampaignRejected: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignRejected,
        notif.Notification.data as Record<string, any>
      );
      return getConvertedCampaignRejectedNotificationFromCampaignId(
        notif,
        parsedNotifData.notificationData.campaignId
      );
    }
    case NotificationTypeExpress_Enum.CampaignRejectedWithFeedback: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.CampaignRejectedWithFeedback,
        notif.Notification.data as Record<string, any>
      );
      return convertCampaignRejectedWithFeedbackNotification(
        notif,
        parsedNotifData.notificationData
      );
    }
    case NotificationTypeExpress_Enum.CreatorSecondarySale:
      return convertCreatorSecondarySaleNotification(notif);
    case NotificationTypeExpress_Enum.FollowerAuctionAlmostOver:
      return convertFollowerAuctionAlmostOverNotification(notif);
    case NotificationTypeExpress_Enum.FollowerNewEditionsListed:
      return convertFollowerNewEditionsListedNotification(notif);
    case NotificationTypeExpress_Enum.FollowerNewPieceListed:
      return convertFollowerNewPieceListedNotification(notif);
    case NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary:
      return convertFollowerNewPieceListedSecondaryNotification(notif);
    case NotificationTypeExpress_Enum.FollowerNewPieceScheduled:
      return convertFollowerNewPieceScheduledNotification(notif);
    case NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive:
      return convertFollowerScheduledAuctionIsLiveNotification(notif);
    case NotificationTypeExpress_Enum.InvitesConvertedToCreator:
      return convertInvitesConvertedToCreatorNotification(notif);
    case NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite:
      return convertInvitesInviteeAcceptedInviteNotification(notif);
    case NotificationTypeExpress_Enum.NewFollower:
      return convertNewFollowerNotification(notif);
    case NotificationTypeExpress_Enum.OwnerAuctionEnded:
      return convertOwnerAuctionEndedNotification(notif);
    case NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids:
      return convertOwnerAuctionEndedNoBidsNotification(notif);
    case NotificationTypeExpress_Enum.OwnerAuctionExtended:
      return convertOwnerAuctionExtendedNotification(notif);
    case NotificationTypeExpress_Enum.OwnerAuctionSettled:
      return convertOwnerAuctionSettledNotification(notif);
    case NotificationTypeExpress_Enum.OwnerEditionSold:
      return convertOwnerEditionSoldNotification(notif);
    case NotificationTypeExpress_Enum.OwnerEditionsSoldOut:
      return convertOwnerEditionsSoldOutNotification(notif);
    case NotificationTypeExpress_Enum.OwnerFirstBidReceived:
      return convertOwnerFirstBidReceivedNotification(notif);
    case NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut: {
      const parsedNotifData = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut,
        notif.Notification.data as { [key: string]: any }
      );
      const candyMachine = await getPrisma().candyMachine.findUnique({
        include: CONVERT_CANDY_MACHINE_INCLUDE,
        where: {
          id: parsedNotifData.notificationData.candyMachineId,
        },
      });
      return convertOwnerGenerativeMintSoldOutNotification(
        notif,
        candyMachine!
      );
    }
    case NotificationTypeExpress_Enum.OwnerOfferReceived:
      return convertOwnerOfferReceivedNotification(notif);
    case NotificationTypeExpress_Enum.OwnerOtherBidReceived:
      return convertOwnerOtherBidReceivedNotification(notif);
    case NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale:
      return convertOwnerPieceSoldAsInstantSaleNotification(notif);
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo:
      return convertUnlockableDeclinedToSharedInfoNotification(notif);
    case NotificationTypeExpress_Enum.UnlockableInfoShared:
      return convertUnlockableInfoSharedNotification(notif);
    case NotificationTypeExpress_Enum.UnlockableShareInfo:
      return convertUnlockableShareInfoNotification(notif);
    case NotificationTypeExpress_Enum.InviteReceived:
    case NotificationTypeExpress_Enum.PnftDropClosed:
    case NotificationTypeExpress_Enum.VotingApproved:
    case NotificationTypeExpress_Enum.VotingBrokeGuidelines:
    case NotificationTypeExpress_Enum.VotingDuplicate:
    case NotificationTypeExpress_Enum.VotingRejected:
      throw new Error(
        "We should not be querying for these activity notification types"
      );
    default:
      return assertUnreachable(type);
  }
}

export default async function activityNotificationsForViewerConnectionResolver(
  context: MyContext,
  after: Maybe<string>,
  first: number
): Promise<ActivityNotificationsConnection> {
  const viewer = assertUserSignedRequest(context);
  const afterNumber = after == null ? 0 : Number(after);
  const prisma = getPrisma();
  const where: Prisma.ActivityNotificationWhereInput = {
    Notification: {
      receiver: viewer.toString(),
      type: {
        in: ACTIVITY_NOTIFICATION_TYPES,
      },
    },
  };
  const [activityNotifications, totalCount] = await Promise.all([
    prisma.activityNotification.findMany({
      include: CONVERT_ACTIVITY_NOTIFICATION_INCLUDE,
      orderBy: {
        timeCreated: "desc",
      },
      skip: afterNumber,
      take: first,
      where,
    }),
    prisma.activityNotification.count({ where }),
  ]);

  const converted = await Promise.all(
    activityNotifications.map((notif) => {
      invariant(notif.Notification.Receiver != null);
      // Need to do this because Notification.receiver is nullable, but should not be null
      // for ActivityNotifications.
      const notifWithNonNullReceiver = {
        ...notif,
        Notification: {
          ...notif.Notification,
          Receiver: notif.Notification.Receiver!,
        },
      };
      return convertNotification(notifWithNonNullReceiver);
    })
  );

  return createOffsetPaginationConnection(
    converted,
    Typename.ActivityNotificationsEdge,
    Typename.ActivityNotificationsConnection,
    after,
    first,
    totalCount
  );
}
