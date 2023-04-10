/**
 * @generated SignedSource<<c617eba59eaaff706dc9c315b8339296>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationType_enum = "AirdropCompleted" | "AirdropGiftReceived" | "BidderAuctionAlmostOver" | "BidderAuctionExtended" | "BidderAuctionSettled" | "BidderClaimPnft" | "BidderClaimPnftReminder" | "BidderLostAuction" | "BidderOutbid" | "BidderWonAuction" | "BonkClaim" | "BuyerOfferAccepted" | "BuyerOfferExpired" | "CampaignAddedAsTeamMember" | "CampaignApproved" | "CampaignCommunityNewUpdateShared" | "CampaignFollowersCampaignPublished" | "CampaignGoalReachedXPercent" | "CampaignRejected" | "CampaignRejectedWithFeedback" | "CollabRequest" | "CreatorSecondarySale" | "FollowerAuctionAlmostOver" | "FollowerNewEditionsListed" | "FollowerNewPieceListed" | "FollowerNewPieceListedSecondary" | "FollowerNewPieceScheduled" | "FollowerScheduledAuctionIsLive" | "InviteReceived" | "InvitesConvertedToCreator" | "InvitesInviteeAcceptedInvite" | "NewFollower" | "OwnerAuctionEnded" | "OwnerAuctionEndedNoBids" | "OwnerAuctionExtended" | "OwnerAuctionSettled" | "OwnerEditionSold" | "OwnerEditionsSoldOut" | "OwnerFirstBidReceived" | "OwnerGenerativeMintSoldOut" | "OwnerOfferReceived" | "OwnerOtherBidReceived" | "OwnerPieceSoldAsInstantSale" | "PnftDropClosed" | "UnlockableDeclinedToSharedInfo" | "UnlockableInfoShared" | "UnlockableShareInfo" | "VotingApproved" | "VotingBrokeGuidelines" | "VotingDuplicate" | "VotingRejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NotificationTypeEnum_Notification$data = {
  readonly type: NotificationType_enum;
  readonly " $fragmentType": "NotificationTypeEnum_Notification";
};
export type NotificationTypeEnum_Notification$key = {
  readonly " $data"?: NotificationTypeEnum_Notification$data;
  readonly " $fragmentSpreads": FragmentRefs<"NotificationTypeEnum_Notification">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NotificationTypeEnum_Notification",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "Notification",
  "abstractKey": null
};

(node as any).hash = "70ee8e57ada6be5b768f9c63dac62312";

export default node;
