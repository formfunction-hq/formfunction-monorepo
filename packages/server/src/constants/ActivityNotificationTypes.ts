import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";

/**
 * Not all notifications are rendered as activity notifications.
 */
function isActivityNotificationType(type: NotificationTypeExpress_Enum) {
  switch (type) {
    case NotificationTypeExpress_Enum.AirdropCompleted:
    case NotificationTypeExpress_Enum.AirdropGiftReceived:
    case NotificationTypeExpress_Enum.BidderAuctionAlmostOver:
    case NotificationTypeExpress_Enum.BidderAuctionExtended:
    case NotificationTypeExpress_Enum.BidderAuctionSettled:
    case NotificationTypeExpress_Enum.BidderClaimPnft:
    case NotificationTypeExpress_Enum.BidderClaimPnftReminder:
    case NotificationTypeExpress_Enum.BidderLostAuction:
    case NotificationTypeExpress_Enum.BidderOutbid:
    case NotificationTypeExpress_Enum.BidderWonAuction:
    case NotificationTypeExpress_Enum.BonkClaim:
    case NotificationTypeExpress_Enum.BuyerOfferAccepted:
    case NotificationTypeExpress_Enum.BuyerOfferExpired:
    case NotificationTypeExpress_Enum.CollabRequest:
    case NotificationTypeExpress_Enum.CampaignAddedAsTeamMember:
    case NotificationTypeExpress_Enum.CampaignApproved:
    case NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared:
    case NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished:
    case NotificationTypeExpress_Enum.CampaignGoalReachedXPercent:
    case NotificationTypeExpress_Enum.CampaignRejected:
    case NotificationTypeExpress_Enum.CampaignRejectedWithFeedback:
    case NotificationTypeExpress_Enum.CreatorSecondarySale:
    case NotificationTypeExpress_Enum.FollowerAuctionAlmostOver:
    case NotificationTypeExpress_Enum.FollowerNewEditionsListed:
    case NotificationTypeExpress_Enum.FollowerNewPieceListed:
    case NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary:
    case NotificationTypeExpress_Enum.FollowerNewPieceScheduled:
    case NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive:
    case NotificationTypeExpress_Enum.InvitesConvertedToCreator:
    case NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite:
    case NotificationTypeExpress_Enum.NewFollower:
    case NotificationTypeExpress_Enum.OwnerAuctionEnded:
    case NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids:
    case NotificationTypeExpress_Enum.OwnerAuctionExtended:
    case NotificationTypeExpress_Enum.OwnerAuctionSettled:
    case NotificationTypeExpress_Enum.OwnerEditionSold:
    case NotificationTypeExpress_Enum.OwnerEditionsSoldOut:
    case NotificationTypeExpress_Enum.OwnerFirstBidReceived:
    case NotificationTypeExpress_Enum.OwnerOfferReceived:
    case NotificationTypeExpress_Enum.OwnerOtherBidReceived:
    case NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale:
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo:
    case NotificationTypeExpress_Enum.UnlockableInfoShared:
    case NotificationTypeExpress_Enum.UnlockableShareInfo:
    case NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut:
      return true;
    case NotificationTypeExpress_Enum.InviteReceived:
    case NotificationTypeExpress_Enum.PnftDropClosed:
    case NotificationTypeExpress_Enum.VotingApproved:
    case NotificationTypeExpress_Enum.VotingBrokeGuidelines:
    case NotificationTypeExpress_Enum.VotingDuplicate:
    case NotificationTypeExpress_Enum.VotingRejected:
      return false;
    default:
      return assertUnreachable(type);
  }
}

const ACTIVITY_NOTIFICATION_TYPES = Object.values(
  NotificationTypeExpress_Enum
).filter(isActivityNotificationType);

export default ACTIVITY_NOTIFICATION_TYPES;
