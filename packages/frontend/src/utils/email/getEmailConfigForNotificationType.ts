import RELAY_FUTURE_ADDED_VALUE from "constants/RelayFutureAddedValue";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import EmailSection from "types/enums/EmailSection";
import EmailToggle from "types/enums/EmailToggle";
import NotificationType_enum from "types/relay/NotificationType_enum";

export type EmailConfig = {
  section: EmailSection;
  sectionIndex: number;
  toggle: EmailToggle;
};

export default function getEmailConfigForNotificationType(
  notificationType: NotificationType_enum
): Maybe<EmailConfig> {
  switch (notificationType) {
    // EmailSection.PiecesYouAreSelling
    case "OwnerFirstBidReceived":
    case "OwnerOtherBidReceived":
      return {
        section: EmailSection.PiecesYouAreSelling,
        sectionIndex: 0,
        toggle: EmailToggle.YouReceivedABid,
      };
    case "OwnerAuctionEndedNoBids":
    case "OwnerAuctionEnded":
      return {
        section: EmailSection.PiecesYouAreSelling,
        sectionIndex: 1,
        toggle: EmailToggle.YourAuctionEnded,
      };
    case "OwnerPieceSoldAsInstantSale":
      return {
        section: EmailSection.PiecesYouAreSelling,
        sectionIndex: 2,
        toggle: EmailToggle.YourPieceWasSoldAsAnInstantSale,
      };
    case "OwnerEditionsSoldOut":
    case "OwnerEditionSold":
      return {
        section: EmailSection.PiecesYouAreSelling,
        sectionIndex: 3,
        toggle: EmailToggle.YourEditionWasSold,
      };
    case "CreatorSecondarySale":
      return {
        section: EmailSection.PiecesYouAreSelling,
        sectionIndex: 4,
        toggle: EmailToggle.YourPieceWasSoldAsASecondarySale,
      };

    // EmailSection.PiecesYouAreBiddingOn
    case "BidderOutbid":
      return {
        section: EmailSection.PiecesYouAreBiddingOn,
        sectionIndex: 0,
        toggle: EmailToggle.YouWereOutbid,
      };
    case "BidderAuctionAlmostOver":
      return {
        section: EmailSection.PiecesYouAreBiddingOn,
        sectionIndex: 1,
        toggle: EmailToggle.AuctionAboutToEnd,
      };
    case "BidderLostAuction":
    case "BidderWonAuction":
      return {
        section: EmailSection.PiecesYouAreBiddingOn,
        sectionIndex: 2,
        toggle: EmailToggle.YouWonOrLostAnAuction,
      };
    case "BidderAuctionSettled":
      return {
        section: EmailSection.PiecesYouAreBiddingOn,
        sectionIndex: 3,
        toggle: EmailToggle.AuctionSettledForAPieceYouWon,
      };

    // EmailSection.PeopleYouFollow
    case "FollowerNewPieceListed":
      return {
        section: EmailSection.PeopleYouFollow,
        sectionIndex: 0,
        toggle: EmailToggle.TheyListedANewPieceForAuction,
      };
    case "FollowerNewEditionsListed":
      return {
        section: EmailSection.PeopleYouFollow,
        sectionIndex: 1,
        toggle: EmailToggle.TheyListedNewEditions,
      };
    case "FollowerNewPieceScheduled":
      return {
        section: EmailSection.PeopleYouFollow,
        sectionIndex: 2,
        toggle: EmailToggle.AnAuctionForTheirPieceWasScheduled,
      };
    case "FollowerScheduledAuctionIsLive":
      return {
        section: EmailSection.PeopleYouFollow,
        sectionIndex: 3,
        toggle: EmailToggle.TheirScheduledAuctionStarted,
      };
    case "FollowerNewPieceListedSecondary":
      return {
        section: EmailSection.PeopleYouFollow,
        sectionIndex: 4,
        toggle: EmailToggle.TheirPieceWasListedOnTheSecondaryMarket,
      };

    // EmailSection.Offers
    case "OwnerOfferReceived":
      return {
        section: EmailSection.Offers,
        sectionIndex: 0,
        toggle: EmailToggle.YouReceivedAnOfferOnAPieceYouOwn,
      };
    case "BuyerOfferAccepted":
      return {
        section: EmailSection.Offers,
        sectionIndex: 1,
        toggle: EmailToggle.YourOfferOnAPieceWasAccepted,
      };
    case "BuyerOfferExpired":
      return {
        section: EmailSection.Offers,
        sectionIndex: 2,
        toggle: EmailToggle.YourOfferOnAPieceExpired,
      };

    // EmailSection.Other
    case "BidderClaimPnft":
    case "BidderClaimPnftReminder":
      return {
        section: EmailSection.Other,
        sectionIndex: 0,
        toggle: EmailToggle.YouCanClaimAParticipationNft,
      };
    case "CollabRequest":
      return {
        section: EmailSection.Other,
        sectionIndex: 1,
        toggle: EmailToggle.SomeoneRequestedYouToCollaborateOnAPiece,
      };
    case "UnlockableShareInfo":
    case "UnlockableDeclinedToSharedInfo":
    case "UnlockableInfoShared":
      return {
        section: EmailSection.Other,
        sectionIndex: 2,
        toggle: EmailToggle.UpdatesAboutUnlockables,
      };
    case "NewFollower":
      return {
        section: EmailSection.Other,
        sectionIndex: 3,
        toggle: EmailToggle.NewFollower,
      };
    case "AirdropCompleted":
    case "AirdropGiftReceived":
    case "BidderAuctionExtended":
    case "BonkClaim":
    case "FollowerAuctionAlmostOver":
    case "InviteReceived": // This one is sent to users that are not on the platform
    case "InvitesConvertedToCreator":
    case "InvitesInviteeAcceptedInvite":
    case "OwnerAuctionExtended":
    case "OwnerAuctionSettled":
    case "PnftDropClosed":
    case "VotingApproved":
    case "VotingBrokeGuidelines":
    case "VotingDuplicate":
    case "VotingRejected":
    case "OwnerGenerativeMintSoldOut": // TODO[Generative Mint](@bryancho): implement
    case "CampaignCommunityNewUpdateShared":
    case "CampaignApproved":
    case "CampaignAddedAsTeamMember":
    case "CampaignFollowersCampaignPublished":
    case "CampaignGoalReachedXPercent":
    case "CampaignRejected":
    case "CampaignRejectedWithFeedback":
    case RELAY_FUTURE_ADDED_VALUE:
      return null;
    default:
      return assertUnreachable(notificationType);
  }
}
