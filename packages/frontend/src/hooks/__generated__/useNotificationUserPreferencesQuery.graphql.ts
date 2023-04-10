/**
 * @generated SignedSource<<3eb50628223b7e790217d495d2faa49a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NotificationChannel_enum = "ActivityFeed" | "Email" | "%future added value";
export type NotificationType_enum = "AirdropCompleted" | "AirdropGiftReceived" | "BidderAuctionAlmostOver" | "BidderAuctionExtended" | "BidderAuctionSettled" | "BidderClaimPnft" | "BidderClaimPnftReminder" | "BidderLostAuction" | "BidderOutbid" | "BidderWonAuction" | "BonkClaim" | "BuyerOfferAccepted" | "BuyerOfferExpired" | "CampaignAddedAsTeamMember" | "CampaignApproved" | "CampaignCommunityNewUpdateShared" | "CampaignFollowersCampaignPublished" | "CampaignGoalReachedXPercent" | "CampaignRejected" | "CampaignRejectedWithFeedback" | "CollabRequest" | "CreatorSecondarySale" | "FollowerAuctionAlmostOver" | "FollowerNewEditionsListed" | "FollowerNewPieceListed" | "FollowerNewPieceListedSecondary" | "FollowerNewPieceScheduled" | "FollowerScheduledAuctionIsLive" | "InviteReceived" | "InvitesConvertedToCreator" | "InvitesInviteeAcceptedInvite" | "NewFollower" | "OwnerAuctionEnded" | "OwnerAuctionEndedNoBids" | "OwnerAuctionExtended" | "OwnerAuctionSettled" | "OwnerEditionSold" | "OwnerEditionsSoldOut" | "OwnerFirstBidReceived" | "OwnerGenerativeMintSoldOut" | "OwnerOfferReceived" | "OwnerOtherBidReceived" | "OwnerPieceSoldAsInstantSale" | "PnftDropClosed" | "UnlockableDeclinedToSharedInfo" | "UnlockableInfoShared" | "UnlockableShareInfo" | "VotingApproved" | "VotingBrokeGuidelines" | "VotingDuplicate" | "VotingRejected" | "%future added value";
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
export type useNotificationUserPreferencesQuery$variables = {
  where: NotificationUserPreference_bool_exp;
};
export type useNotificationUserPreferencesQuery$data = {
  readonly NotificationUserPreference: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ChangeNotificationUserPreferencesModal_NotificationUserPreference">;
  }>;
};
export type useNotificationUserPreferencesQuery = {
  response: useNotificationUserPreferencesQuery$data;
  variables: useNotificationUserPreferencesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNotificationUserPreferencesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NotificationUserPreference",
        "kind": "LinkedField",
        "name": "NotificationUserPreference",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ChangeNotificationUserPreferencesModal_NotificationUserPreference"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useNotificationUserPreferencesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NotificationUserPreference",
        "kind": "LinkedField",
        "name": "NotificationUserPreference",
        "plural": true,
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f39b7398e1d41d8b80c84f42a3568abb",
    "id": null,
    "metadata": {},
    "name": "useNotificationUserPreferencesQuery",
    "operationKind": "query",
    "text": "query useNotificationUserPreferencesQuery(\n  $where: NotificationUserPreference_bool_exp!\n) {\n  NotificationUserPreference(where: $where) {\n    ...ChangeNotificationUserPreferencesModal_NotificationUserPreference\n  }\n}\n\nfragment ChangeNotificationUserPreferencesModal_NotificationUserPreference on NotificationUserPreference {\n  enabled\n  notificationType\n  notificationChannel\n}\n"
  }
};
})();

(node as any).hash = "f3f100c5b3e5a834c028609d676ac6dc";

export default node;
