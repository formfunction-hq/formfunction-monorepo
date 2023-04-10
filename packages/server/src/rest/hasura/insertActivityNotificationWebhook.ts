import { NextFunction, Request, Response } from "express";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import getFilteredRecipients from "src/utils/notifications/getFilteredRecipients";
import parseNotificationData from "src/utils/notifications/parseNotificationData";
import getPrisma from "src/utils/prisma/getPrisma";
import {
  NotificationChannelExpress_Enum,
  NotificationTypeExpress_Enum,
} from "src/__generated__/generated";

function getForeignKeys(
  notificationType: NotificationTypeExpress_Enum,
  notificationData: Record<string, any>
): {
  nftId?: MaybeUndef<string>;
  nftTransactionId?: MaybeUndef<string>;
} {
  switch (notificationType) {
    case NotificationTypeExpress_Enum.AirdropCompleted: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.AirdropCompleted,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.masterEditionMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderAuctionAlmostOver: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionAlmostOver,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderAuctionExtended: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionExtended,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderAuctionSettled: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderAuctionSettled,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.BidderClaimPnft: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderClaimPnft,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.auctionNftMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderClaimPnftReminder: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderClaimPnftReminder,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.auctionNftMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderLostAuction: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderLostAuction,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.BidderOutbid: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderOutbid,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.refundTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.BidderWonAuction: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BidderWonAuction,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.BuyerOfferAccepted: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BuyerOfferAccepted,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.BuyerOfferExpired: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.BuyerOfferExpired,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.CollabRequest: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.CollabRequest,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.CreatorSecondarySale: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.CreatorSecondarySale,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.FollowerAuctionAlmostOver: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerAuctionAlmostOver,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.FollowerNewEditionsListed: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewEditionsListed,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceListed: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceListed,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.FollowerNewPieceScheduled: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerNewPieceScheduled,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.InviteReceived:
      return {};
    case NotificationTypeExpress_Enum.InvitesConvertedToCreator:
      return {};
    case NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite:
      return {};
    case NotificationTypeExpress_Enum.NewFollower:
      return {};
    case NotificationTypeExpress_Enum.OwnerAuctionEnded: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionEnded,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.winningBidTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.OwnerAuctionExtended: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionExtended,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.OwnerAuctionSettled: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerAuctionSettled,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerEditionSold: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerEditionSold,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerEditionsSoldOut: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerEditionsSoldOut,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerFirstBidReceived: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerFirstBidReceived,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerOfferReceived: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerOfferReceived,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerOtherBidReceived: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerOtherBidReceived,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale,
        notificationData
      ).notificationData;
      return {
        nftTransactionId: notificationDataParsed.nftTransactionId,
      };
    }
    case NotificationTypeExpress_Enum.PnftDropClosed: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.PnftDropClosed,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.pnftMint,
      };
    }
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.UnlockableInfoShared: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableInfoShared,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.UnlockableShareInfo: {
      const notificationDataParsed = parseNotificationData(
        NotificationTypeExpress_Enum.UnlockableShareInfo,
        notificationData
      ).notificationData;
      return {
        nftId: notificationDataParsed.nftMint,
      };
    }
    case NotificationTypeExpress_Enum.AirdropGiftReceived:
    case NotificationTypeExpress_Enum.BonkClaim:
    case NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared:
    case NotificationTypeExpress_Enum.CampaignApproved:
    case NotificationTypeExpress_Enum.CampaignRejected:
    case NotificationTypeExpress_Enum.CampaignRejectedWithFeedback:
    case NotificationTypeExpress_Enum.CampaignAddedAsTeamMember:
    case NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished:
    case NotificationTypeExpress_Enum.CampaignGoalReachedXPercent:
    case NotificationTypeExpress_Enum.VotingApproved:
    case NotificationTypeExpress_Enum.VotingBrokeGuidelines:
    case NotificationTypeExpress_Enum.VotingDuplicate:
    case NotificationTypeExpress_Enum.VotingRejected:
    case NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut:
      return {};
    default:
      return assertUnreachable(notificationType);
  }
}

export default async function insertActivityNotificationWebhook(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { body } = req;
  const { id, data, timeCreated, type, receiver } = body.event.data.new;
  const filteredRecipients = await getFilteredRecipients(
    type,
    NotificationChannelExpress_Enum.ActivityFeed,
    receiver != null ? [receiver] : []
  );

  logEvent(AnalyticsEvent.HasuraWebhookDebug, req, {
    eventData: body.event.data,
    notificationId: id,
  });

  if (filteredRecipients.length === 0) {
    res.sendStatus(200);
    return;
  }

  const prisma = getPrisma();
  await prisma.activityNotification.create({
    data: {
      ...getForeignKeys(type, data),
      notificationId: id,
      timeCreated,
    },
  });

  res.json({ success: true });
}
