/**
 * @generated SignedSource<<3a95fa4e327bd767cdb321a97c6be4e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignCategoryExpress_enum = "Art" | "Brand" | "Comics" | "Culture" | "DanceAndTheater" | "Design" | "Education" | "Fashion" | "FilmAndVideo" | "Food" | "Games" | "Music" | "Photography" | "Podcasts" | "Product" | "Writing" | "%future added value";
export type CampaignSortOrder_enum = "Newest" | "Oldest" | "%future added value";
export type CampaignsForExploreInput = {
  categories?: ReadonlyArray<CampaignCategoryExpress_enum> | null;
  sortOrder: CampaignSortOrder_enum;
};
export type ExploreCampaignsGridPaginationQuery$variables = {
  after?: string | null;
  first: number;
  input: CampaignsForExploreInput;
};
export type ExploreCampaignsGridPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignsGrid_Query">;
};
export type ExploreCampaignsGridPaginationQuery = {
  response: ExploreCampaignsGridPaginationQuery$data;
  variables: ExploreCampaignsGridPaginationQuery$variables;
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
  "name": "downloadUrl",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v8 = {
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
    "name": "ExploreCampaignsGridPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ExploreCampaignsGrid_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExploreCampaignsGridPaginationQuery",
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
            "concreteType": "CampaignsForExploreResponse",
            "kind": "LinkedField",
            "name": "campaignsForExplore",
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
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "contentType",
                                "storageKey": null
                              },
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AssetDarkModeInfo",
                                "kind": "LinkedField",
                                "name": "darkModeInfo",
                                "plural": false,
                                "selections": [
                                  (v5/*: any*/)
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
                              (v6/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v7/*: any*/),
                                  (v8/*: any*/),
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
                                  (v7/*: any*/),
                                  (v8/*: any*/)
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
                          (v6/*: any*/)
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
                "args": (v2/*: any*/),
                "filters": [
                  "input"
                ],
                "handle": "connection",
                "key": "ExploreCampaignsGrid_Query_campaigns",
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
    "cacheID": "ec0956e7e51c560d97b62f4cb30cbdd2",
    "id": null,
    "metadata": {},
    "name": "ExploreCampaignsGridPaginationQuery",
    "operationKind": "query",
    "text": "query ExploreCampaignsGridPaginationQuery(\n  $after: String\n  $first: PaginationAmount!\n  $input: CampaignsForExploreInput!\n) {\n  ...ExploreCampaignsGrid_Query\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment CampaignProgressTowardsGoalForCampaignV2_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment ExploreCampaignCardForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  colorScheme\n  previewAsset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  tagline\n  teamMembers {\n    member {\n      ProfilePhoto {\n        photoUrl\n        id\n      }\n      id\n    }\n  }\n  title\n  ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2\n  ...useCampaignLinkForCampaignV2_CampaignV2\n}\n\nfragment ExploreCampaignsGrid_Query on query_root {\n  CampaignsNamespace {\n    campaignsForExplore(input: $input) {\n      campaigns(after: $after, first: $first, input: $input) {\n        edges {\n          node {\n            id\n            ...ExploreCampaignCardForCampaignV2_CampaignV2\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n\nfragment useCampaignLinkForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    username\n    id\n  }\n  slug\n  status\n}\n"
  }
};
})();

(node as any).hash = "5da3ada4f3b0d1b8b9211aee03c14e85";

export default node;
