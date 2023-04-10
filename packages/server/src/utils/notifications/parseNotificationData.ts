import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import BidderAuctionAlmostOverNotificationData from "src/types/notifications/BidderAuctionAlmostOverNotificationData";
import BidderAuctionExtendedNotificationData from "src/types/notifications/BidderAuctionExtendedNotificationData";
import BidderAuctionSettledNotificationData from "src/types/notifications/BidderAuctionSettledNotificationData";
import BidderClaimPnftNotificationData from "src/types/notifications/BidderClaimPnftNotificationData";
import BidderClaimPnftReminderNotificationData from "src/types/notifications/BidderClaimPnftReminderNotificationData";
import BidderLostAuctionNotificationData from "src/types/notifications/BidderLostAuctionNotificationData";
import BidderOutbidNotificationData from "src/types/notifications/BidderOutbidNotificationData";
import BidderWonAuctionNotificationData from "src/types/notifications/BidderWonAuctionNotificationData";
import BuyerOfferAcceptedNotificationData from "src/types/notifications/BuyerOfferAcceptedNotificationData";
import CampaignCommunityNewUpdateSharedNotificationData from "src/types/notifications/CampaignCommunityNewUpdateSharedNotificationData";
import BuyerOfferExpiredNotificationData from "src/types/notifications/BuyerOfferExpiredNotificationData";
import CollabRequestNotificationData from "src/types/notifications/CollabRequestNotificationData";
import CreatorSecondarySaleNotificationData from "src/types/notifications/CreatorSecondarySaleNotificationData";
import FollowerAuctionAlmostOverNotificationData from "src/types/notifications/FollowerAuctionAlmostOverNotificationData";
import FollowerNewEditionsListedNotificationData from "src/types/notifications/FollowerNewEditionsListedNotificationData";
import FollowerNewPieceListedNotificationData from "src/types/notifications/FollowerNewPieceListedNotificationData";
import FollowerNewPieceListedSecondaryNotificationData from "src/types/notifications/FollowerNewPieceListedSecondaryNotificationData";
import FollowerNewPieceScheduledNotificationData from "src/types/notifications/FollowerNewPieceScheduledNotificationData";
import FollowerScheduledAuctionIsLiveNotificationData from "src/types/notifications/FollowerScheduledAuctionIsLiveNotificationData";
import InviteReceivedNotificationData from "src/types/notifications/InviteReceivedNotificationData";
import InvitesConvertedToCreatorNotificationData from "src/types/notifications/InvitesConvertedToCreatorNotificationData";
import InvitesInviteeAcceptedInviteNotificationData from "src/types/notifications/InvitesInviteeAcceptedInviteNotificationData";
import NewFollowerNotificationData from "src/types/notifications/NewFollowerNotificationData";
import OwnerAuctionEndedNoBidsNotificationData from "src/types/notifications/OwnerAuctionEndedNoBidsNotificationData";
import OwnerAuctionEndedNotificationData from "src/types/notifications/OwnerAuctionEndedNotificationData";
import OwnerAuctionExtendedNotificationData from "src/types/notifications/OwnerAuctionExtendedNotificationData";
import OwnerAuctionSettledNotificationData from "src/types/notifications/OwnerAuctionSettledNotificationData";
import OwnerEditionSoldNotificationData from "src/types/notifications/OwnerEditionSoldNotificationData";
import OwnerEditionsSoldOutNotificationData from "src/types/notifications/OwnerEditionsSoldOutNotificationData";
import OwnerFirstBidReceivedNotificationData from "src/types/notifications/OwnerFirstBidReceivedNotificationData";
import OwnerGenerativeMintSoldOutNotificationData from "src/types/notifications/OwnerGenerativeMintSoldOutNotificationData";
import OwnerOfferReceivedNotificationData from "src/types/notifications/OwnerOfferReceivedNotificationData";
import OwnerOtherBidReceivedNotificationData from "src/types/notifications/OwnerOtherBidReceivedNotificationData";
import OwnerPieceSoldAsInstantSaleNotificationData from "src/types/notifications/OwnerPieceSoldAsInstantSaleNotificationData";
import PnftDropClosedNotificationData from "src/types/notifications/PnftDropClosedNotificationData";
import UnlockableDeclinedToSharedInfoNotificationData from "src/types/notifications/UnlockableDeclinedToSharedInfoNotificationData";
import UnlockableInfoSharedNotificationData from "src/types/notifications/UnlockableInfoSharedNotificationData";
import UnlockableShareInfoNotificationData from "src/types/notifications/UnlockableShareInfoNotificationData";
import VotingApprovedNotificationData from "src/types/notifications/VotingApprovedNotificationData";
import VotingRejectedNotificationData from "src/types/notifications/VotingRejectedNotificationData";
import { NotificationTypeExpress_Enum } from "src/__generated__/generated";
import CampaignApprovedNotificationData from "src/types/notifications/CampaignApprovedNotificationData";
import CampaignRejectedNotificationData from "src/types/notifications/CampaignRejectedNotificationData";
import CampaignFollowersCampaignPublishedNotificationData from "src/types/notifications/CampaignFollowersCampaignPublishedNotificationData";
import CampaignAddedAsTeamMemberNotificationData from "src/types/notifications/CampaignAddedAsTeamMemberNotificationData";
import CampaignGoalReachedXPercentNotificationData from "src/types/notifications/CampaignGoalReachedXPercentNotificationData";
import AirdropCompletedNotificationData from "src/types/notifications/AirdropCompletedNotificationData";
import AirdropGiftReceivedNotificationData from "src/types/notifications/AirdropGiftReceivedNotificationData";
import CampaignRejectedWithFeedbackNotificationData from "src/types/notifications/CampaignRejectedWithFeedbackNotificationData";

// Narrows a Union type base on N
// See https://stackoverflow.com/a/50499316/3923882 for more info
type NarrowUnion<T, N> = T extends { notificationType: N } ? T : never;

interface AirdropCompleted {
  notificationData: AirdropCompletedNotificationData;
  notificationType: NotificationTypeExpress_Enum.AirdropCompleted;
}

interface AirdropGiftReceived {
  notificationData: AirdropGiftReceivedNotificationData;
  notificationType: NotificationTypeExpress_Enum.AirdropGiftReceived;
}

interface BidderAuctionAlmostOver {
  notificationData: BidderAuctionAlmostOverNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderAuctionAlmostOver;
}

interface BidderAuctionExtended {
  notificationData: BidderAuctionExtendedNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderAuctionExtended;
}

interface BidderAuctionSettled {
  notificationData: BidderAuctionSettledNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderAuctionSettled;
}

interface BidderClaimPnft {
  notificationData: BidderClaimPnftNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderClaimPnft;
}

interface BidderClaimPnftReminder {
  notificationData: BidderClaimPnftReminderNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderClaimPnftReminder;
}

interface BidderLostAuction {
  notificationData: BidderLostAuctionNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderLostAuction;
}

interface BidderOutbid {
  notificationData: BidderOutbidNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderOutbid;
}

interface BidderWonAuction {
  notificationData: BidderWonAuctionNotificationData;
  notificationType: NotificationTypeExpress_Enum.BidderWonAuction;
}

interface BuyerOfferAccepted {
  notificationData: BuyerOfferAcceptedNotificationData;
  notificationType: NotificationTypeExpress_Enum.BuyerOfferAccepted;
}

interface BuyerOfferExpired {
  notificationData: BuyerOfferExpiredNotificationData;
  notificationType: NotificationTypeExpress_Enum.BuyerOfferExpired;
}

interface CampaignAddedAsTeamMember {
  notificationData: CampaignAddedAsTeamMemberNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignAddedAsTeamMember;
}

interface CampaignApproved {
  notificationData: CampaignApprovedNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignApproved;
}

interface CampaignCommunityNewUpdateShared {
  notificationData: CampaignCommunityNewUpdateSharedNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared;
}

interface CampaignFollowerCampaignPublished {
  notificationData: CampaignFollowersCampaignPublishedNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished;
}

interface CampaignGoalReachedXPercent {
  notificationData: CampaignGoalReachedXPercentNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignGoalReachedXPercent;
}

interface CampaignRejected {
  notificationData: CampaignRejectedNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignRejected;
}

interface CampaignRejectedWithFeedback {
  notificationData: CampaignRejectedWithFeedbackNotificationData;
  notificationType: NotificationTypeExpress_Enum.CampaignRejectedWithFeedback;
}

interface CollabRequest {
  notificationData: CollabRequestNotificationData;
  notificationType: NotificationTypeExpress_Enum.CollabRequest;
}

interface CreatorSecondarySale {
  notificationData: CreatorSecondarySaleNotificationData;
  notificationType: NotificationTypeExpress_Enum.CreatorSecondarySale;
}

interface FollowerAuctionAlmostOver {
  notificationData: FollowerAuctionAlmostOverNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerAuctionAlmostOver;
}

interface FollowerNewEditionsListed {
  notificationData: FollowerNewEditionsListedNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerNewEditionsListed;
}

interface FollowerNewPieceListed {
  notificationData: FollowerNewPieceListedNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerNewPieceListed;
}

interface FollowerNewPieceListedSecondary {
  notificationData: FollowerNewPieceListedSecondaryNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary;
}

interface FollowerNewPieceScheduled {
  notificationData: FollowerNewPieceScheduledNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerNewPieceScheduled;
}

interface FollowerScheduledAuctionIsLive {
  notificationData: FollowerScheduledAuctionIsLiveNotificationData;
  notificationType: NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive;
}

interface InviteReceived {
  notificationData: InviteReceivedNotificationData;
  notificationType: NotificationTypeExpress_Enum.InviteReceived;
}

interface InvitesConvertedToCreator {
  notificationData: InvitesConvertedToCreatorNotificationData;
  notificationType: NotificationTypeExpress_Enum.InvitesConvertedToCreator;
}

interface InvitesInviteeAcceptedInvite {
  notificationData: InvitesInviteeAcceptedInviteNotificationData;
  notificationType: NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite;
}

interface NewFollower {
  notificationData: NewFollowerNotificationData;
  notificationType: NotificationTypeExpress_Enum.NewFollower;
}

interface OwnerAuctionEnded {
  notificationData: OwnerAuctionEndedNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerAuctionEnded;
}

interface OwnerAuctionEndedNoBids {
  notificationData: OwnerAuctionEndedNoBidsNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids;
}

interface OwnerAuctionExtended {
  notificationData: OwnerAuctionExtendedNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerAuctionExtended;
}

interface OwnerAuctionSettled {
  notificationData: OwnerAuctionSettledNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerAuctionSettled;
}

interface OwnerEditionSold {
  notificationData: OwnerEditionSoldNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerEditionSold;
}

interface OwnerEditionsSoldOut {
  notificationData: OwnerEditionsSoldOutNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerEditionsSoldOut;
}

interface OwnerFirstBidReceived {
  notificationData: OwnerFirstBidReceivedNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerFirstBidReceived;
}

interface OwnerGenerativeMintSoldOut {
  notificationData: OwnerGenerativeMintSoldOutNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut;
}

interface OwnerOfferReceived {
  notificationData: OwnerOfferReceivedNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerOfferReceived;
}

interface OwnerOtherBidReceived {
  notificationData: OwnerOtherBidReceivedNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerOtherBidReceived;
}

interface OwnerPieceSoldAsInstantSale {
  notificationData: OwnerPieceSoldAsInstantSaleNotificationData;
  notificationType: NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale;
}

interface PnftDropClosed {
  notificationData: PnftDropClosedNotificationData;
  notificationType: NotificationTypeExpress_Enum.PnftDropClosed;
}

interface UnlockableDeclinedToSharedInfo {
  notificationData: UnlockableDeclinedToSharedInfoNotificationData;
  notificationType: NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo;
}

interface UnlockableInfoShared {
  notificationData: UnlockableInfoSharedNotificationData;
  notificationType: NotificationTypeExpress_Enum.UnlockableInfoShared;
}

interface UnlockableShareInfo {
  notificationData: UnlockableShareInfoNotificationData;
  notificationType: NotificationTypeExpress_Enum.UnlockableShareInfo;
}

interface VotingApproved {
  notificationData: VotingApprovedNotificationData;
  notificationType: NotificationTypeExpress_Enum.VotingApproved;
}

interface VotingRejected {
  notificationData: VotingRejectedNotificationData;
  notificationType: NotificationTypeExpress_Enum.VotingRejected;
}

type NotificationUnion =
  | AirdropCompleted
  | AirdropGiftReceived
  | BidderAuctionAlmostOver
  | BidderAuctionExtended
  | BidderAuctionSettled
  | BidderClaimPnft
  | BidderClaimPnftReminder
  | BidderLostAuction
  | BidderOutbid
  | BidderWonAuction
  | BuyerOfferAccepted
  | BuyerOfferExpired
  | CampaignAddedAsTeamMember
  | CampaignApproved
  | CampaignCommunityNewUpdateShared
  | CampaignFollowerCampaignPublished
  | CampaignGoalReachedXPercent
  | CampaignRejected
  | CampaignRejectedWithFeedback
  | CollabRequest
  | CreatorSecondarySale
  | FollowerAuctionAlmostOver
  | FollowerNewEditionsListed
  | FollowerNewPieceListed
  | FollowerNewPieceListedSecondary
  | FollowerNewPieceScheduled
  | FollowerScheduledAuctionIsLive
  | InviteReceived
  | InvitesConvertedToCreator
  | InvitesInviteeAcceptedInvite
  | NewFollower
  | OwnerAuctionEnded
  | OwnerAuctionEndedNoBids
  | OwnerAuctionExtended
  | OwnerAuctionSettled
  | OwnerEditionSold
  | OwnerEditionsSoldOut
  | OwnerFirstBidReceived
  | OwnerGenerativeMintSoldOut
  | OwnerOfferReceived
  | OwnerOtherBidReceived
  | OwnerPieceSoldAsInstantSale
  | PnftDropClosed
  | UnlockableDeclinedToSharedInfo
  | UnlockableInfoShared
  | UnlockableShareInfo
  | VotingApproved
  | VotingRejected;

export default function parseNotificationData<
  N extends NotificationUnion["notificationType"]
>(
  notificationType: N,
  notificationData: { [key: string]: any }
): NarrowUnion<NotificationUnion, N> {
  switch (notificationType) {
    case NotificationTypeExpress_Enum.AirdropCompleted:
      return {
        notificationData: notificationData as AirdropCompletedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.AirdropGiftReceived:
      return {
        notificationData:
          notificationData as AirdropGiftReceivedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderAuctionAlmostOver:
      return {
        notificationData:
          notificationData as BidderAuctionAlmostOverNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderAuctionExtended:
      return {
        notificationData:
          notificationData as BidderAuctionExtendedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderAuctionSettled:
      return {
        notificationData:
          notificationData as BidderAuctionSettledNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderClaimPnft:
      return {
        notificationData: notificationData as BidderClaimPnftNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderClaimPnftReminder:
      return {
        notificationData:
          notificationData as BidderClaimPnftReminderNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderLostAuction:
      return {
        notificationData: notificationData as BidderLostAuctionNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderOutbid:
      return {
        notificationData: notificationData as BidderOutbidNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BidderWonAuction:
      return {
        notificationData: notificationData as BidderWonAuctionNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BuyerOfferAccepted:
      return {
        notificationData:
          notificationData as BuyerOfferAcceptedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.BuyerOfferExpired:
      return {
        notificationData: notificationData as BuyerOfferExpiredNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignAddedAsTeamMember:
      return {
        notificationData:
          notificationData as CampaignAddedAsTeamMemberNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignApproved:
      return {
        notificationData: notificationData as CampaignApprovedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignCommunityNewUpdateShared:
      return {
        notificationData:
          notificationData as CampaignCommunityNewUpdateSharedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignFollowersCampaignPublished:
      return {
        notificationData:
          notificationData as CampaignFollowersCampaignPublishedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignGoalReachedXPercent:
      return {
        notificationData:
          notificationData as CampaignGoalReachedXPercentNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignRejected:
      return {
        notificationData: notificationData as CampaignRejectedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CampaignRejectedWithFeedback:
      return {
        notificationData:
          notificationData as CampaignRejectedWithFeedbackNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CollabRequest:
      return {
        notificationData: notificationData as CollabRequestNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.CreatorSecondarySale:
      return {
        notificationData:
          notificationData as CreatorSecondarySaleNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerAuctionAlmostOver:
      return {
        notificationData:
          notificationData as FollowerAuctionAlmostOverNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerNewEditionsListed:
      return {
        notificationData:
          notificationData as FollowerNewEditionsListedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerNewPieceListed:
      return {
        notificationData:
          notificationData as FollowerNewPieceListedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerNewPieceListedSecondary:
      return {
        notificationData:
          notificationData as FollowerNewPieceListedSecondaryNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerNewPieceScheduled:
      return {
        notificationData:
          notificationData as FollowerNewPieceScheduledNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.FollowerScheduledAuctionIsLive:
      return {
        notificationData:
          notificationData as FollowerScheduledAuctionIsLiveNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.InviteReceived:
      return {
        notificationData: notificationData as InviteReceivedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.InvitesConvertedToCreator:
      return {
        notificationData:
          notificationData as InvitesConvertedToCreatorNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.InvitesInviteeAcceptedInvite:
      return {
        notificationData:
          notificationData as InvitesInviteeAcceptedInviteNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.NewFollower:
      return {
        notificationData: notificationData as NewFollowerNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerAuctionEnded:
      return {
        notificationData: notificationData as OwnerAuctionEndedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerAuctionEndedNoBids:
      return {
        notificationData:
          notificationData as OwnerAuctionEndedNoBidsNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerAuctionExtended:
      return {
        notificationData:
          notificationData as OwnerAuctionExtendedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerAuctionSettled:
      return {
        notificationData:
          notificationData as OwnerAuctionSettledNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerEditionSold:
      return {
        notificationData: notificationData as OwnerEditionSoldNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerEditionsSoldOut:
      return {
        notificationData:
          notificationData as OwnerEditionsSoldOutNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerGenerativeMintSoldOut:
      return {
        notificationData:
          notificationData as OwnerGenerativeMintSoldOutNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerFirstBidReceived:
      return {
        notificationData:
          notificationData as OwnerFirstBidReceivedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerOfferReceived:
      return {
        notificationData:
          notificationData as OwnerOfferReceivedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerOtherBidReceived:
      return {
        notificationData:
          notificationData as OwnerOtherBidReceivedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.OwnerPieceSoldAsInstantSale:
      return {
        notificationData:
          notificationData as OwnerPieceSoldAsInstantSaleNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.PnftDropClosed:
      return {
        notificationData: notificationData as PnftDropClosedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.UnlockableDeclinedToSharedInfo:
      return {
        notificationData:
          notificationData as UnlockableDeclinedToSharedInfoNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.UnlockableInfoShared:
      return {
        notificationData:
          notificationData as UnlockableInfoSharedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.UnlockableShareInfo:
      return {
        notificationData:
          notificationData as UnlockableShareInfoNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.VotingApproved:
      return {
        notificationData: notificationData as VotingApprovedNotificationData,
        notificationType,
      } as any;
    case NotificationTypeExpress_Enum.VotingRejected:
      return {
        notificationData: notificationData as VotingRejectedNotificationData,
        notificationType,
      } as any;
    default:
      return assertUnreachable(notificationType);
  }
}
