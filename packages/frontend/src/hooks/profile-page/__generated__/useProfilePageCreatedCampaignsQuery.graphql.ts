/**
 * @generated SignedSource<<bbbb1f363c0b1981b61191f8196e8e8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
export type CampaignsForUserInput = {
  statuses?: ReadonlyArray<CampaignStatusExpress_enum> | null;
  userId?: string | null;
  username?: string | null;
  viewerId?: string | null;
};
export type useProfilePageCreatedCampaignsQuery$variables = {
  after?: string | null;
  first: number;
  input: CampaignsForUserInput;
};
export type useProfilePageCreatedCampaignsQuery$data = {
  readonly CampaignsNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignV2Card_CampaignsNamespaceQueryResponse" | "ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaigns_Query">;
};
export type useProfilePageCreatedCampaignsQuery = {
  response: useProfilePageCreatedCampaignsQuery$data;
  variables: useProfilePageCreatedCampaignsQuery$variables;
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
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  (v1/*: any*/)
],
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
  "concreteType": "AssetDarkModeInfo",
  "kind": "LinkedField",
  "name": "darkModeInfo",
  "plural": false,
  "selections": [
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentAmount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useProfilePageCreatedCampaignsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProfileCampaigns_Query"
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileCampaignV2Card_CampaignsNamespaceQueryResponse"
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
    "name": "useProfilePageCreatedCampaignsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              (v1/*: any*/)
            ],
            "concreteType": "CampaignsForUserResponse",
            "kind": "LinkedField",
            "name": "campaignsForUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v2/*: any*/),
                "concreteType": "CampaignsConnection",
                "kind": "LinkedField",
                "name": "campaigns",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignsEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CampaignV2",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "creator",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              },
                              (v4/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "colorScheme",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AssetExpress",
                            "kind": "LinkedField",
                            "name": "previewAsset",
                            "plural": false,
                            "selections": [
                              (v5/*: any*/),
                              (v6/*: any*/),
                              (v7/*: any*/),
                              (v8/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "tagline",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CampaignTeamMemberExpress",
                            "kind": "LinkedField",
                            "name": "teamMembers",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "UserExpress",
                                "kind": "LinkedField",
                                "name": "member",
                                "plural": false,
                                "selections": [
                                  (v4/*: any*/),
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
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
                            "name": "goalProgressSymbol",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": null,
                            "kind": "LinkedField",
                            "name": "goal",
                            "plural": false,
                            "selections": [
                              (v9/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/),
                                  (v11/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "CurrencyExpress",
                                    "kind": "LinkedField",
                                    "name": "currency",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "decimals",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "shortSymbol",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "symbol",
                                        "storageKey": null
                                      },
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "type": "CampaignMonetaryGoal",
                                "abstractKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v10/*: any*/),
                                  (v11/*: any*/)
                                ],
                                "type": "CampaignSaleCountGoal",
                                "abstractKey": null
                              }
                            ],
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
                            "kind": "ScalarField",
                            "name": "status",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "input",
                                "value": {
                                  "first": 3
                                }
                              }
                            ],
                            "concreteType": "NftAsset",
                            "kind": "LinkedField",
                            "name": "nftAssets",
                            "plural": true,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AssetExpress",
                                "kind": "LinkedField",
                                "name": "asset",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
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
                                  (v3/*: any*/)
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "NftAssetNftInfo",
                                "kind": "LinkedField",
                                "name": "nftInfo",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "mint",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "nftAssets(input:{\"first\":3})"
                          },
                          (v9/*: any*/)
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "totalCount",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v2/*: any*/),
                "filters": [
                  "input"
                ],
                "handle": "connection",
                "key": "ProfileCampaigns_Query_campaigns",
                "kind": "LinkedHandle",
                "name": "campaigns"
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
    "cacheID": "a68d4a710c40f3ef708f3976d01235c9",
    "id": null,
    "metadata": {},
    "name": "useProfilePageCreatedCampaignsQuery",
    "operationKind": "query",
    "text": "query useProfilePageCreatedCampaignsQuery(\n  $after: String\n  $first: PaginationAmount!\n  $input: CampaignsForUserInput!\n) {\n  ...ProfileCampaigns_Query\n  CampaignsNamespace {\n    ...ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse\n    ...ProfileCampaignV2Card_CampaignsNamespaceQueryResponse\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment AssetForNftAsset_NftAsset on NftAsset {\n  asset {\n    ...AssetForAssetExpress_AssetExpress\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n  nftInfo {\n    mint\n  }\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment CampaignProgressTowardsGoalForCampaignV2_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2 on CampaignV2 {\n  ...ExploreCampaignCardForCampaignV2_CampaignV2\n  nftAssets(input: {first: 3}) {\n    ...AssetForNftAsset_NftAsset\n    nftInfo {\n      mint\n    }\n  }\n}\n\nfragment ExploreCampaignCardForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  colorScheme\n  previewAsset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  tagline\n  teamMembers {\n    member {\n      ProfilePhoto {\n        photoUrl\n        id\n      }\n      id\n    }\n  }\n  title\n  ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2\n  ...useCampaignLinkForCampaignV2_CampaignV2\n}\n\nfragment ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment ProfileCampaignV2CardGoal_CampaignV2 on CampaignV2 {\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment ProfileCampaignV2Card_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignsForUser(input: $input) {\n    campaigns(after: $after, first: $first, input: $input) {\n      edges {\n        node {\n          previewAsset {\n            ...AssetForAssetExpress_AssetExpress\n            id\n          }\n          status\n          tagline\n          title\n          ...ProfileCampaignV2CardGoal_CampaignV2\n          ...useCampaignLinkForCampaignV2_CampaignV2\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ProfileCampaigns_Query on query_root {\n  CampaignsNamespace {\n    campaignsForUser(input: $input) {\n      campaigns(after: $after, first: $first, input: $input) {\n        edges {\n          node {\n            id\n            ...ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n\nfragment ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignsForUser(input: $input) {\n    campaigns(after: $after, first: $first, input: $input) {\n      totalCount\n    }\n  }\n}\n\nfragment useCampaignLinkForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    username\n    id\n  }\n  slug\n  status\n}\n"
  }
};
})();

(node as any).hash = "42c59ba58ea3c3fece3a3d26079bf95c";

export default node;
