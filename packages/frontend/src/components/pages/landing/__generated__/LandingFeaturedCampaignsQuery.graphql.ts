/**
 * @generated SignedSource<<8175ef84a61cd0f25d4056a384e795e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignCategoryExpress_enum = "Art" | "Brand" | "Comics" | "Culture" | "DanceAndTheater" | "Design" | "Education" | "Fashion" | "FilmAndVideo" | "Food" | "Games" | "Music" | "Photography" | "Podcasts" | "Product" | "Writing" | "%future added value";
export type CampaignsFeaturedInput = {
  categories?: ReadonlyArray<CampaignCategoryExpress_enum> | null;
};
export type LandingFeaturedCampaignsQuery$variables = {
  input: CampaignsFeaturedInput;
};
export type LandingFeaturedCampaignsQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignsFeatured: {
      readonly campaigns: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2">;
      }>;
      readonly featuredCategories: ReadonlyArray<CampaignCategoryExpress_enum>;
    };
  };
};
export type LandingFeaturedCampaignsQuery = {
  response: LandingFeaturedCampaignsQuery$data;
  variables: LandingFeaturedCampaignsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "featuredCategories",
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
    (v2/*: any*/)
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
  "name": "goalAmount",
  "storageKey": null
},
v10 = {
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
    "name": "LandingFeaturedCampaignsQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignsFeaturedResponse",
            "kind": "LinkedField",
            "name": "campaignsFeatured",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaigns",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
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
    "name": "LandingFeaturedCampaignsQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignsFeaturedResponse",
            "kind": "LinkedField",
            "name": "campaignsFeatured",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaigns",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
                      (v2/*: any*/)
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
                      (v2/*: any*/)
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
                          (v2/*: any*/)
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
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v9/*: any*/),
                          (v10/*: any*/),
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
                              (v2/*: any*/)
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
                          (v9/*: any*/),
                          (v10/*: any*/)
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
                          (v2/*: any*/)
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
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aaba953da196cc9a0fcab7275696949b",
    "id": null,
    "metadata": {},
    "name": "LandingFeaturedCampaignsQuery",
    "operationKind": "query",
    "text": "query LandingFeaturedCampaignsQuery(\n  $input: CampaignsFeaturedInput!\n) {\n  CampaignsNamespace {\n    campaignsFeatured(input: $input) {\n      campaigns {\n        id\n        ...ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2\n      }\n      featuredCategories\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment AssetForNftAsset_NftAsset on NftAsset {\n  asset {\n    ...AssetForAssetExpress_AssetExpress\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n  nftInfo {\n    mint\n  }\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment CampaignProgressTowardsGoalForCampaignV2_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2 on CampaignV2 {\n  ...ExploreCampaignCardForCampaignV2_CampaignV2\n  nftAssets(input: {first: 3}) {\n    ...AssetForNftAsset_NftAsset\n    nftInfo {\n      mint\n    }\n  }\n}\n\nfragment ExploreCampaignCardForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  colorScheme\n  previewAsset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  tagline\n  teamMembers {\n    member {\n      ProfilePhoto {\n        photoUrl\n        id\n      }\n      id\n    }\n  }\n  title\n  ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2\n  ...useCampaignLinkForCampaignV2_CampaignV2\n}\n\nfragment useCampaignLinkForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    username\n    id\n  }\n  slug\n  status\n}\n"
  }
};
})();

(node as any).hash = "c96a5f371f1f134420315cc38797b56d";

export default node;
