/**
 * @generated SignedSource<<b0812bf5f0254a2059d623354fb629ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useActivityPageNotificationsQuery$variables = {
  after?: string | null;
  first: number;
};
export type useActivityPageNotificationsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotifications_Query">;
};
export type useActivityPageNotificationsQuery = {
  response: useActivityPageNotificationsQuery$data;
  variables: useActivityPageNotificationsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "AssetExpress",
  "kind": "LinkedField",
  "name": "nftAsset",
  "plural": false,
  "selections": [
    (v5/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetDimensions",
      "kind": "LinkedField",
      "name": "dimensions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "height",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "width",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v6/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "ActivityNotificationNftInfo",
  "kind": "LinkedField",
  "name": "nftInfo",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    (v7/*: any*/),
    (v8/*: any*/)
  ],
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeCreated",
  "storageKey": null
},
v11 = [
  (v3/*: any*/),
  (v9/*: any*/),
  (v10/*: any*/)
],
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v13 = [
  (v12/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "text",
    "storageKey": null
  }
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "action",
  "plural": false,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": (v13/*: any*/),
      "type": "ActivityNotificationLinkAction",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "sender",
  "plural": false,
  "selections": [
    (v15/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "PhotoExpress",
      "kind": "LinkedField",
      "name": "ProfilePhoto",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "photoUrl",
          "storageKey": null
        },
        (v3/*: any*/)
      ],
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
},
v17 = [
  (v3/*: any*/),
  (v9/*: any*/),
  (v16/*: any*/),
  (v10/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "ActivityNotificationLinkAction",
  "kind": "LinkedField",
  "name": "action",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v19 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "amount",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrencyExpress",
    "kind": "LinkedField",
    "name": "currencyInfo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "decimals",
        "storageKey": null
      },
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "symbol",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "shortSymbol",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v20 = [
  (v15/*: any*/),
  (v3/*: any*/)
],
v21 = [
  (v5/*: any*/),
  (v6/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AssetDarkModeInfo",
    "kind": "LinkedField",
    "name": "darkModeInfo",
    "plural": false,
    "selections": [
      (v6/*: any*/)
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "videoPlaybackId",
    "storageKey": null
  },
  (v3/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "ActivityNotificationCampaignInfo",
  "kind": "LinkedField",
  "name": "campaignInfo",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
      "plural": false,
      "selections": (v20/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "previewAsset",
      "plural": false,
      "selections": (v21/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v23 = [
  (v3/*: any*/),
  (v22/*: any*/),
  (v14/*: any*/),
  (v16/*: any*/),
  (v10/*: any*/)
],
v24 = [
  (v3/*: any*/),
  (v22/*: any*/),
  (v14/*: any*/),
  (v10/*: any*/)
],
v25 = [
  (v3/*: any*/),
  (v18/*: any*/),
  (v9/*: any*/),
  (v16/*: any*/),
  (v10/*: any*/)
],
v26 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "ActivityNotificationNftInfo",
    "kind": "LinkedField",
    "name": "nftInfo",
    "plural": false,
    "selections": [
      (v4/*: any*/),
      (v7/*: any*/)
    ],
    "storageKey": null
  },
  (v16/*: any*/),
  (v10/*: any*/)
],
v27 = [
  (v3/*: any*/),
  (v16/*: any*/),
  (v10/*: any*/)
],
v28 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "Price",
    "kind": "LinkedField",
    "name": "bidPrice",
    "plural": false,
    "selections": (v19/*: any*/),
    "storageKey": null
  },
  (v9/*: any*/),
  (v16/*: any*/),
  (v10/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useActivityPageNotificationsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ActivityNotifications_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useActivityPageNotificationsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NotificationsNamespaceResponse",
        "kind": "LinkedField",
        "name": "NotificationsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "ActivityNotificationsForViewerResponse",
            "kind": "LinkedField",
            "name": "activityNotificationsForViewer",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "ActivityNotificationsConnection",
                "kind": "LinkedField",
                "name": "activityNotifications",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "ActivityNotificationsEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "timeSeen",
                                "storageKey": null
                              }
                            ],
                            "type": "IActivityNotification",
                            "abstractKey": "__isIActivityNotification"
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationAirdropCompleted",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v14/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationAirdropGiftReceived",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationBidderAuctionAlmostOver",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationBidderAuctionExtended",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v17/*: any*/),
                            "type": "ActivityNotificationBidderAuctionSettled",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v18/*: any*/),
                              (v9/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationBidderClaimPnft",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v18/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "pnftCloseDate",
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationBidderClaimPnftReminder",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationBidderLostAuction",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Price",
                                "kind": "LinkedField",
                                "name": "refundAmount",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationBidderOutbid",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationBidderWonAuction",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v18/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationBonkClaim",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v17/*: any*/),
                            "type": "ActivityNotificationBuyerOfferAccepted",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationBuyerOfferExpired",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v23/*: any*/),
                            "type": "ActivityNotificationCampaignAddedAsTeamMember",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v24/*: any*/),
                            "type": "ActivityNotificationCampaignApproved",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v24/*: any*/),
                            "type": "ActivityNotificationCampaignCommunityNewUpdateShared",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v23/*: any*/),
                            "type": "ActivityNotificationCampaignFollowersCampaignPublished",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v22/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "percentAsNumber",
                                "storageKey": null
                              },
                              (v14/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationCampaignGoalReachedXPercent",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v24/*: any*/),
                            "type": "ActivityNotificationCampaignRejected",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v22/*: any*/),
                              (v14/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "feedback",
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationCampaignRejectedWithFeedback",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v25/*: any*/),
                            "type": "ActivityNotificationCollabRequest",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationCreatorSecondarySale",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "UserExpress",
                                "kind": "LinkedField",
                                "name": "sender",
                                "plural": false,
                                "selections": (v20/*: any*/),
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationFollowerAuctionAlmostOver",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v26/*: any*/),
                            "type": "ActivityNotificationFollowerNewEditionsListed",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v26/*: any*/),
                            "type": "ActivityNotificationFollowerNewPieceListed",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v26/*: any*/),
                            "type": "ActivityNotificationFollowerNewPieceListedSecondary",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v26/*: any*/),
                            "type": "ActivityNotificationFollowerNewPieceScheduled",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v26/*: any*/),
                            "type": "ActivityNotificationFollowerScheduledAuctionIsLive",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v27/*: any*/),
                            "type": "ActivityNotificationInvitesConvertedToCreator",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v27/*: any*/),
                            "type": "ActivityNotificationInvitesInviteeAcceptedInvite",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v27/*: any*/),
                            "type": "ActivityNotificationNewFollower",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v18/*: any*/),
                              (v9/*: any*/),
                              (v16/*: any*/),
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Price",
                                "kind": "LinkedField",
                                "name": "winningPrice",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              }
                            ],
                            "type": "ActivityNotificationOwnerAuctionEnded",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationOwnerAuctionEndedNoBids",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationOwnerAuctionExtended",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationOwnerAuctionSettled",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ActivityNotificationNftInfo",
                                "kind": "LinkedField",
                                "name": "nftInfo",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "editionNumber",
                                    "storageKey": null
                                  },
                                  (v4/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v16/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationOwnerEditionSold",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v11/*: any*/),
                            "type": "ActivityNotificationOwnerEditionsSoldOut",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v28/*: any*/),
                            "type": "ActivityNotificationOwnerFirstBidReceived",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "ActivityNotificationCandyMachineInfo",
                                "kind": "LinkedField",
                                "name": "candyMachineInfo",
                                "plural": false,
                                "selections": [
                                  (v8/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "AssetExpress",
                                    "kind": "LinkedField",
                                    "name": "asset",
                                    "plural": false,
                                    "selections": (v21/*: any*/),
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": null,
                                "kind": "LinkedField",
                                "name": "action",
                                "plural": false,
                                "selections": [
                                  (v2/*: any*/),
                                  {
                                    "kind": "InlineFragment",
                                    "selections": [
                                      (v12/*: any*/)
                                    ],
                                    "type": "ActivityNotificationLinkAction",
                                    "abstractKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationOwnerGenerativeMintSoldOut",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v18/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Price",
                                "kind": "LinkedField",
                                "name": "offerPrice",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              },
                              (v16/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationOwnerOfferReceived",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v28/*: any*/),
                            "type": "ActivityNotificationOwnerOtherBidReceived",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v9/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "Price",
                                "kind": "LinkedField",
                                "name": "price",
                                "plural": false,
                                "selections": (v19/*: any*/),
                                "storageKey": null
                              },
                              (v16/*: any*/),
                              (v10/*: any*/)
                            ],
                            "type": "ActivityNotificationOwnerPieceSoldAsInstantSale",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v17/*: any*/),
                            "type": "ActivityNotificationUnlockableDeclinedToSharedInfo",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v17/*: any*/),
                            "type": "ActivityNotificationUnlockableInfoShared",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": (v25/*: any*/),
                            "type": "ActivityNotificationUnlockableShareInfo",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "filters": null,
                "handle": "connection",
                "key": "ActivityNotifications_Query_activityNotifications",
                "kind": "LinkedHandle",
                "name": "activityNotifications"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e5b281600848fbf5dc0e91299b89eefe",
    "id": null,
    "metadata": {},
    "name": "useActivityPageNotificationsQuery",
    "operationKind": "query",
    "text": "query useActivityPageNotificationsQuery(\n  $after: String\n  $first: Int!\n) {\n  ...ActivityNotifications_Query\n}\n\nfragment ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted on ActivityNotificationAirdropCompleted {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived on ActivityNotificationAirdropGiftReceived {\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationAssetForAssetExpress_AssetExpress on AssetExpress {\n  ...AssetForAssetExpress_AssetExpress\n}\n\nfragment ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver on ActivityNotificationBidderAuctionAlmostOver {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended on ActivityNotificationBidderAuctionExtended {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled on ActivityNotificationBidderAuctionSettled {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder on ActivityNotificationBidderClaimPnftReminder {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  pnftCloseDate\n  timeCreated\n}\n\nfragment ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft on ActivityNotificationBidderClaimPnft {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction on ActivityNotificationBidderLostAuction {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid on ActivityNotificationBidderOutbid {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  refundAmount {\n    ...PriceWithSymbol_Price\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction on ActivityNotificationBidderWonAuction {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBonkClaim_ActivityNotificationBonkClaim on ActivityNotificationBonkClaim {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBuyerOfferAccepted_ActivityNotificationBuyerOfferAccepted on ActivityNotificationBuyerOfferAccepted {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired on ActivityNotificationBuyerOfferExpired {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember on ActivityNotificationCampaignAddedAsTeamMember {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved on ActivityNotificationCampaignApproved {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared on ActivityNotificationCampaignCommunityNewUpdateShared {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished on ActivityNotificationCampaignFollowersCampaignPublished {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent on ActivityNotificationCampaignGoalReachedXPercent {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  percentAsNumber\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback on ActivityNotificationCampaignRejectedWithFeedback {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  feedback\n  timeCreated\n}\n\nfragment ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected on ActivityNotificationCampaignRejected {\n  campaignInfo {\n    title\n    ...AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo\n  }\n  action {\n    __typename\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCollabRequest_ActivityNotificationCollabRequest on ActivityNotificationCollabRequest {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale on ActivityNotificationCreatorSecondarySale {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver on ActivityNotificationFollowerAuctionAlmostOver {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerNewEditionsListed_ActivityNotificationFollowerNewEditionsListed on ActivityNotificationFollowerNewEditionsListed {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary on ActivityNotificationFollowerNewPieceListedSecondary {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed on ActivityNotificationFollowerNewPieceListed {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled on ActivityNotificationFollowerNewPieceScheduled {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive on ActivityNotificationFollowerScheduledAuctionIsLive {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator on ActivityNotificationInvitesConvertedToCreator {\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite on ActivityNotificationInvitesInviteeAcceptedInvite {\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationLinkActionButton_ActivityNotificationLinkAction on ActivityNotificationLinkAction {\n  href\n  text\n}\n\nfragment ActivityNotificationNewFollower_ActivityNotificationNewFollower on ActivityNotificationNewFollower {\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids on ActivityNotificationOwnerAuctionEndedNoBids {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded on ActivityNotificationOwnerAuctionEnded {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n  winningPrice {\n    ...PriceWithSymbol_Price\n  }\n}\n\nfragment ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended on ActivityNotificationOwnerAuctionExtended {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled on ActivityNotificationOwnerAuctionSettled {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold on ActivityNotificationOwnerEditionSold {\n  nftInfo {\n    editionNumber\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut on ActivityNotificationOwnerEditionsSoldOut {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived on ActivityNotificationOwnerFirstBidReceived {\n  bidPrice {\n    ...PriceWithSymbol_Price\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut on ActivityNotificationOwnerGenerativeMintSoldOut {\n  candyMachineInfo {\n    name\n    asset {\n      ...ActivityNotificationAssetForAssetExpress_AssetExpress\n      id\n    }\n  }\n  action {\n    __typename\n    ... on ActivityNotificationLinkAction {\n      href\n    }\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived on ActivityNotificationOwnerOfferReceived {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  offerPrice {\n    ...PriceWithSymbol_Price\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerOtherBidReceived_ActivityNotificationOwnerOtherBidReceived on ActivityNotificationOwnerOtherBidReceived {\n  bidPrice {\n    ...PriceWithSymbol_Price\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale on ActivityNotificationOwnerPieceSoldAsInstantSale {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  price {\n    ...PriceWithSymbol_Price\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo on ActivityNotificationUnlockableDeclinedToSharedInfo {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared on ActivityNotificationUnlockableInfoShared {\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo on ActivityNotificationUnlockableShareInfo {\n  action {\n    ...ActivityNotificationLinkActionButton_ActivityNotificationLinkAction\n  }\n  nftInfo {\n    ...NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo\n    ...NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo\n  }\n  sender {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  timeCreated\n}\n\nfragment ActivityNotification_ActivityNotificationsEdge on ActivityNotificationsEdge {\n  node {\n    __typename\n    ... on IActivityNotification {\n      __isIActivityNotification: __typename\n      id\n      timeSeen\n    }\n    ... on ActivityNotificationAirdropCompleted {\n      ...ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted\n      id\n    }\n    ... on ActivityNotificationAirdropGiftReceived {\n      ...ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived\n      id\n    }\n    ... on ActivityNotificationBidderAuctionAlmostOver {\n      ...ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver\n      id\n    }\n    ... on ActivityNotificationBidderAuctionExtended {\n      ...ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended\n      id\n    }\n    ... on ActivityNotificationBidderAuctionSettled {\n      ...ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled\n      id\n    }\n    ... on ActivityNotificationBidderClaimPnft {\n      ...ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft\n      id\n    }\n    ... on ActivityNotificationBidderClaimPnftReminder {\n      ...ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder\n      id\n    }\n    ... on ActivityNotificationBonkClaim {\n      ...ActivityNotificationBonkClaim_ActivityNotificationBonkClaim\n      id\n    }\n    ... on ActivityNotificationCampaignAddedAsTeamMember {\n      ...ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember\n      id\n    }\n    ... on ActivityNotificationCampaignFollowersCampaignPublished {\n      ...ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished\n      id\n    }\n    ... on ActivityNotificationCampaignGoalReachedXPercent {\n      ...ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent\n      id\n    }\n    ... on ActivityNotificationBidderLostAuction {\n      ...ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction\n      id\n    }\n    ... on ActivityNotificationBidderOutbid {\n      ...ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid\n      id\n    }\n    ... on ActivityNotificationBidderWonAuction {\n      ...ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction\n      id\n    }\n    ... on ActivityNotificationBuyerOfferAccepted {\n      ...ActivityNotificationBuyerOfferAccepted_ActivityNotificationBuyerOfferAccepted\n      id\n    }\n    ... on ActivityNotificationBuyerOfferExpired {\n      ...ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired\n      id\n    }\n    ... on ActivityNotificationCampaignApproved {\n      ...ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved\n      id\n    }\n    ... on ActivityNotificationCampaignCommunityNewUpdateShared {\n      ...ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared\n      id\n    }\n    ... on ActivityNotificationCampaignRejected {\n      ...ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected\n      id\n    }\n    ... on ActivityNotificationCampaignRejectedWithFeedback {\n      ...ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback\n      id\n    }\n    ... on ActivityNotificationCollabRequest {\n      ...ActivityNotificationCollabRequest_ActivityNotificationCollabRequest\n      id\n    }\n    ... on ActivityNotificationCreatorSecondarySale {\n      ...ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale\n      id\n    }\n    ... on ActivityNotificationFollowerAuctionAlmostOver {\n      ...ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver\n      id\n    }\n    ... on ActivityNotificationFollowerNewEditionsListed {\n      ...ActivityNotificationFollowerNewEditionsListed_ActivityNotificationFollowerNewEditionsListed\n      id\n    }\n    ... on ActivityNotificationFollowerNewPieceListed {\n      ...ActivityNotificationFollowerNewPieceListed_ActivityNotificationFollowerNewPieceListed\n      id\n    }\n    ... on ActivityNotificationFollowerNewPieceListedSecondary {\n      ...ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary\n      id\n    }\n    ... on ActivityNotificationFollowerNewPieceScheduled {\n      ...ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled\n      id\n    }\n    ... on ActivityNotificationFollowerScheduledAuctionIsLive {\n      ...ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive\n      id\n    }\n    ... on ActivityNotificationInvitesConvertedToCreator {\n      ...ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator\n      id\n    }\n    ... on ActivityNotificationInvitesInviteeAcceptedInvite {\n      ...ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite\n      id\n    }\n    ... on ActivityNotificationNewFollower {\n      ...ActivityNotificationNewFollower_ActivityNotificationNewFollower\n      id\n    }\n    ... on ActivityNotificationOwnerAuctionEnded {\n      ...ActivityNotificationOwnerAuctionEnded_ActivityNotificationOwnerAuctionEnded\n      id\n    }\n    ... on ActivityNotificationOwnerAuctionEndedNoBids {\n      ...ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids\n      id\n    }\n    ... on ActivityNotificationOwnerAuctionExtended {\n      ...ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended\n      id\n    }\n    ... on ActivityNotificationOwnerAuctionSettled {\n      ...ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled\n      id\n    }\n    ... on ActivityNotificationOwnerEditionSold {\n      ...ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold\n      id\n    }\n    ... on ActivityNotificationOwnerEditionsSoldOut {\n      ...ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut\n      id\n    }\n    ... on ActivityNotificationOwnerFirstBidReceived {\n      ...ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived\n      id\n    }\n    ... on ActivityNotificationOwnerGenerativeMintSoldOut {\n      ...ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut\n      id\n    }\n    ... on ActivityNotificationOwnerOfferReceived {\n      ...ActivityNotificationOwnerOfferReceived_ActivityNotificationOwnerOfferReceived\n      id\n    }\n    ... on ActivityNotificationOwnerOtherBidReceived {\n      ...ActivityNotificationOwnerOtherBidReceived_ActivityNotificationOwnerOtherBidReceived\n      id\n    }\n    ... on ActivityNotificationOwnerPieceSoldAsInstantSale {\n      ...ActivityNotificationOwnerPieceSoldAsInstantSale_ActivityNotificationOwnerPieceSoldAsInstantSale\n      id\n    }\n    ... on ActivityNotificationUnlockableDeclinedToSharedInfo {\n      ...ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo\n      id\n    }\n    ... on ActivityNotificationUnlockableInfoShared {\n      ...ActivityNotificationUnlockableInfoShared_ActivityNotificationUnlockableInfoShared\n      id\n    }\n    ... on ActivityNotificationUnlockableShareInfo {\n      ...ActivityNotificationUnlockableShareInfo_ActivityNotificationUnlockableShareInfo\n      id\n    }\n  }\n}\n\nfragment ActivityNotifications_Query on query_root {\n  NotificationsNamespace {\n    activityNotificationsForViewer {\n      activityNotifications(after: $after, first: $first) {\n        edges {\n          node {\n            __typename\n            ... on IActivityNotification {\n              __isIActivityNotification: __typename\n              id\n            }\n            ... on ActivityNotificationAirdropCompleted {\n              id\n            }\n            ... on ActivityNotificationAirdropGiftReceived {\n              id\n            }\n            ... on ActivityNotificationBidderAuctionAlmostOver {\n              id\n            }\n            ... on ActivityNotificationBidderAuctionExtended {\n              id\n            }\n            ... on ActivityNotificationBidderAuctionSettled {\n              id\n            }\n            ... on ActivityNotificationBidderClaimPnft {\n              id\n            }\n            ... on ActivityNotificationBidderClaimPnftReminder {\n              id\n            }\n            ... on ActivityNotificationBidderLostAuction {\n              id\n            }\n            ... on ActivityNotificationBidderOutbid {\n              id\n            }\n            ... on ActivityNotificationBidderWonAuction {\n              id\n            }\n            ... on ActivityNotificationBonkClaim {\n              id\n            }\n            ... on ActivityNotificationBuyerOfferAccepted {\n              id\n            }\n            ... on ActivityNotificationBuyerOfferExpired {\n              id\n            }\n            ... on ActivityNotificationCampaignAddedAsTeamMember {\n              id\n            }\n            ... on ActivityNotificationCampaignApproved {\n              id\n            }\n            ... on ActivityNotificationCampaignCommunityNewUpdateShared {\n              id\n            }\n            ... on ActivityNotificationCampaignFollowersCampaignPublished {\n              id\n            }\n            ... on ActivityNotificationCampaignGoalReachedXPercent {\n              id\n            }\n            ... on ActivityNotificationCampaignRejected {\n              id\n            }\n            ... on ActivityNotificationCampaignRejectedWithFeedback {\n              id\n            }\n            ... on ActivityNotificationCollabRequest {\n              id\n            }\n            ... on ActivityNotificationCreatorSecondarySale {\n              id\n            }\n            ... on ActivityNotificationFollowerAuctionAlmostOver {\n              id\n            }\n            ... on ActivityNotificationFollowerNewEditionsListed {\n              id\n            }\n            ... on ActivityNotificationFollowerNewPieceListed {\n              id\n            }\n            ... on ActivityNotificationFollowerNewPieceListedSecondary {\n              id\n            }\n            ... on ActivityNotificationFollowerNewPieceScheduled {\n              id\n            }\n            ... on ActivityNotificationFollowerScheduledAuctionIsLive {\n              id\n            }\n            ... on ActivityNotificationInvitesConvertedToCreator {\n              id\n            }\n            ... on ActivityNotificationInvitesInviteeAcceptedInvite {\n              id\n            }\n            ... on ActivityNotificationNewFollower {\n              id\n            }\n            ... on ActivityNotificationOwnerAuctionEnded {\n              id\n            }\n            ... on ActivityNotificationOwnerAuctionEndedNoBids {\n              id\n            }\n            ... on ActivityNotificationOwnerAuctionExtended {\n              id\n            }\n            ... on ActivityNotificationOwnerAuctionSettled {\n              id\n            }\n            ... on ActivityNotificationOwnerEditionSold {\n              id\n            }\n            ... on ActivityNotificationOwnerEditionsSoldOut {\n              id\n            }\n            ... on ActivityNotificationOwnerFirstBidReceived {\n              id\n            }\n            ... on ActivityNotificationOwnerGenerativeMintSoldOut {\n              id\n            }\n            ... on ActivityNotificationOwnerOfferReceived {\n              id\n            }\n            ... on ActivityNotificationOwnerOtherBidReceived {\n              id\n            }\n            ... on ActivityNotificationOwnerPieceSoldAsInstantSale {\n              id\n            }\n            ... on ActivityNotificationUnlockableDeclinedToSharedInfo {\n              id\n            }\n            ... on ActivityNotificationUnlockableInfoShared {\n              id\n            }\n            ... on ActivityNotificationUnlockableShareInfo {\n              id\n            }\n          }\n          ...ActivityNotification_ActivityNotificationsEdge\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo on ActivityNotificationCampaignInfo {\n  slug\n  creator {\n    username\n    id\n  }\n  previewAsset {\n    ...ActivityNotificationAssetForAssetExpress_AssetExpress\n    id\n  }\n}\n\nfragment NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo on ActivityNotificationNftInfo {\n  mint\n  nftAsset {\n    contentType\n    dimensions {\n      height\n      width\n    }\n    downloadUrl\n    id\n  }\n}\n\nfragment NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo on ActivityNotificationNftInfo {\n  mint\n  name\n  nftAsset {\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "32e6ba9e2910a92333f88608a8078030";

export default node;
