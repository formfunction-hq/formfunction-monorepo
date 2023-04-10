/**
 * @generated SignedSource<<9c2442df9d0a7bc9c81decff59a9069c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type NotificationChannel_enum = "ActivityFeed" | "Email" | "%future added value";
export type NotificationType_enum = "AirdropCompleted" | "AirdropGiftReceived" | "BidderAuctionAlmostOver" | "BidderAuctionExtended" | "BidderAuctionSettled" | "BidderClaimPnft" | "BidderClaimPnftReminder" | "BidderLostAuction" | "BidderOutbid" | "BidderWonAuction" | "BonkClaim" | "BuyerOfferAccepted" | "BuyerOfferExpired" | "CampaignAddedAsTeamMember" | "CampaignApproved" | "CampaignCommunityNewUpdateShared" | "CampaignFollowersCampaignPublished" | "CampaignGoalReachedXPercent" | "CampaignRejected" | "CampaignRejectedWithFeedback" | "CollabRequest" | "CreatorSecondarySale" | "FollowerAuctionAlmostOver" | "FollowerNewEditionsListed" | "FollowerNewPieceListed" | "FollowerNewPieceListedSecondary" | "FollowerNewPieceScheduled" | "FollowerScheduledAuctionIsLive" | "InviteReceived" | "InvitesConvertedToCreator" | "InvitesInviteeAcceptedInvite" | "NewFollower" | "OwnerAuctionEnded" | "OwnerAuctionEndedNoBids" | "OwnerAuctionExtended" | "OwnerAuctionSettled" | "OwnerEditionSold" | "OwnerEditionsSoldOut" | "OwnerFirstBidReceived" | "OwnerGenerativeMintSoldOut" | "OwnerOfferReceived" | "OwnerOtherBidReceived" | "OwnerPieceSoldAsInstantSale" | "PnftDropClosed" | "UnlockableDeclinedToSharedInfo" | "UnlockableInfoShared" | "UnlockableShareInfo" | "VotingApproved" | "VotingBrokeGuidelines" | "VotingDuplicate" | "VotingRejected" | "%future added value";
export type NotificationUserPreference_constraint = "NotificationUserPreference_id_key" | "NotificationUserPreference_pkey" | "%future added value";
export type NotificationUserPreference_update_column = "enabled" | "id" | "notificationChannel" | "notificationType" | "userId" | "%future added value";
export type NotificationUserPreference_insert_input = {
  enabled?: boolean | null;
  id?: string | null;
  notificationChannel?: NotificationChannel_enum | null;
  notificationType?: NotificationType_enum | null;
  userId?: string | null;
};
export type NotificationUserPreference_on_conflict = {
  constraint: NotificationUserPreference_constraint;
  update_columns: ReadonlyArray<NotificationUserPreference_update_column>;
  where?: NotificationUserPreference_bool_exp | null;
};
export type NotificationUserPreference_bool_exp = {
  _and?: ReadonlyArray<NotificationUserPreference_bool_exp> | null;
  _not?: NotificationUserPreference_bool_exp | null;
  _or?: ReadonlyArray<NotificationUserPreference_bool_exp> | null;
  enabled?: Boolean_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  notificationChannel?: NotificationChannel_enum_comparison_exp | null;
  notificationType?: NotificationType_enum_comparison_exp | null;
  userId?: String_comparison_exp | null;
};
export type Boolean_comparison_exp = {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: ReadonlyArray<boolean> | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: ReadonlyArray<boolean> | null;
};
export type uuid_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _in?: ReadonlyArray<string> | null;
  _is_null?: boolean | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nin?: ReadonlyArray<string> | null;
};
export type NotificationChannel_enum_comparison_exp = {
  _eq?: NotificationChannel_enum | null;
  _in?: ReadonlyArray<NotificationChannel_enum> | null;
  _is_null?: boolean | null;
  _neq?: NotificationChannel_enum | null;
  _nin?: ReadonlyArray<NotificationChannel_enum> | null;
};
export type NotificationType_enum_comparison_exp = {
  _eq?: NotificationType_enum | null;
  _in?: ReadonlyArray<NotificationType_enum> | null;
  _is_null?: boolean | null;
  _neq?: NotificationType_enum | null;
  _nin?: ReadonlyArray<NotificationType_enum> | null;
};
export type String_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: ReadonlyArray<string> | null;
  _iregex?: string | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: ReadonlyArray<string> | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
};
export type ChangeNotificationUserPreferencesModalMutation$variables = {
  objects: ReadonlyArray<NotificationUserPreference_insert_input>;
  on_conflict?: NotificationUserPreference_on_conflict | null;
};
export type ChangeNotificationUserPreferencesModalMutation$data = {
  readonly insert_NotificationUserPreference: {
    readonly returning: ReadonlyArray<{
      readonly __typename: "NotificationUserPreference";
    }>;
  } | null;
};
export type ChangeNotificationUserPreferencesModalMutation = {
  response: ChangeNotificationUserPreferencesModalMutation$data;
  variables: ChangeNotificationUserPreferencesModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "objects"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "on_conflict"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "objects",
        "variableName": "objects"
      },
      {
        "kind": "Variable",
        "name": "on_conflict",
        "variableName": "on_conflict"
      }
    ],
    "concreteType": "NotificationUserPreference_mutation_response",
    "kind": "LinkedField",
    "name": "insert_NotificationUserPreference",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NotificationUserPreference",
        "kind": "LinkedField",
        "name": "returning",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangeNotificationUserPreferencesModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeNotificationUserPreferencesModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e447f1d209e0ca3109f70770c5088f1f",
    "id": null,
    "metadata": {},
    "name": "ChangeNotificationUserPreferencesModalMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeNotificationUserPreferencesModalMutation(\n  $objects: [NotificationUserPreference_insert_input!]!\n  $on_conflict: NotificationUserPreference_on_conflict\n) {\n  insert_NotificationUserPreference(objects: $objects, on_conflict: $on_conflict) {\n    returning {\n      __typename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "ac1ad2934e2ed5f7422a848ed97966e4";

export default node;
