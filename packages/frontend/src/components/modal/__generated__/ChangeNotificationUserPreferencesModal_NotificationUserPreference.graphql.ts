/**
 * @generated SignedSource<<9a1085b4fd5bdbc33642d8d56c56602e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NotificationChannel_enum = "ActivityFeed" | "Email" | "%future added value";
export type NotificationType_enum = "AirdropCompleted" | "AirdropGiftReceived" | "BidderAuctionAlmostOver" | "BidderAuctionExtended" | "BidderAuctionSettled" | "BidderClaimPnft" | "BidderClaimPnftReminder" | "BidderLostAuction" | "BidderOutbid" | "BidderWonAuction" | "BonkClaim" | "BuyerOfferAccepted" | "BuyerOfferExpired" | "CampaignAddedAsTeamMember" | "CampaignApproved" | "CampaignCommunityNewUpdateShared" | "CampaignFollowersCampaignPublished" | "CampaignGoalReachedXPercent" | "CampaignRejected" | "CampaignRejectedWithFeedback" | "CollabRequest" | "CreatorSecondarySale" | "FollowerAuctionAlmostOver" | "FollowerNewEditionsListed" | "FollowerNewPieceListed" | "FollowerNewPieceListedSecondary" | "FollowerNewPieceScheduled" | "FollowerScheduledAuctionIsLive" | "InviteReceived" | "InvitesConvertedToCreator" | "InvitesInviteeAcceptedInvite" | "NewFollower" | "OwnerAuctionEnded" | "OwnerAuctionEndedNoBids" | "OwnerAuctionExtended" | "OwnerAuctionSettled" | "OwnerEditionSold" | "OwnerEditionsSoldOut" | "OwnerFirstBidReceived" | "OwnerGenerativeMintSoldOut" | "OwnerOfferReceived" | "OwnerOtherBidReceived" | "OwnerPieceSoldAsInstantSale" | "PnftDropClosed" | "UnlockableDeclinedToSharedInfo" | "UnlockableInfoShared" | "UnlockableShareInfo" | "VotingApproved" | "VotingBrokeGuidelines" | "VotingDuplicate" | "VotingRejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ChangeNotificationUserPreferencesModal_NotificationUserPreference$data = ReadonlyArray<{
  readonly enabled: boolean;
  readonly notificationChannel: NotificationChannel_enum;
  readonly notificationType: NotificationType_enum;
  readonly " $fragmentType": "ChangeNotificationUserPreferencesModal_NotificationUserPreference";
}>;
export type ChangeNotificationUserPreferencesModal_NotificationUserPreference$key = ReadonlyArray<{
  readonly " $data"?: ChangeNotificationUserPreferencesModal_NotificationUserPreference$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeNotificationUserPreferencesModal_NotificationUserPreference">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ChangeNotificationUserPreferencesModal_NotificationUserPreference",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "enabled",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "notificationType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "notificationChannel",
      "storageKey": null
    }
  ],
  "type": "NotificationUserPreference",
  "abstractKey": null
};

(node as any).hash = "4d30da0e24233424bcc9cc0193e83b30";

export default node;
