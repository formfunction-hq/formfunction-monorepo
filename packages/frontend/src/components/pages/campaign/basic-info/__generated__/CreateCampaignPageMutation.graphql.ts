/**
 * @generated SignedSource<<e2cec40056cc1948520066b84c9fd9b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignCategoryExpress_enum = "Art" | "Brand" | "Comics" | "Culture" | "DanceAndTheater" | "Design" | "Education" | "Fashion" | "FilmAndVideo" | "Food" | "Games" | "Music" | "Photography" | "Podcasts" | "Product" | "Writing" | "%future added value";
export type CampaignColorSchemeExpress_enum = "AliceBlueSinopia" | "AntiFlashWhiteDarkGunmetal" | "BrightGrayMediumBlue" | "CulturedCadmiumGreen" | "GreenishGrayMidnightBlue" | "SeashellMaximumRed" | "%future added value";
export type CampaignGoalTypeExpress_enum = "Monetary" | "SaleCount" | "%future added value";
export type CampaignTeamMemberRoleExpress_enum = "Admin" | "Creator" | "Member" | "%future added value";
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type CreateCampaignInput = {
  category: CampaignCategoryExpress_enum;
  colorScheme: CampaignColorSchemeExpress_enum;
  goal: CampaignGoalInput;
  previewAsset: AssetInput;
  tagline: string;
  teamMembers: ReadonlyArray<CampaignTeamMemberInput>;
  title: string;
};
export type CampaignGoalInput = {
  goalAmount: number;
  goalCurrencyName: CurrencyNameExpress_enum;
  goalProgressSymbol: string;
  goalType: CampaignGoalTypeExpress_enum;
};
export type AssetInput = {
  arweaveTxid?: string | null;
  contentType: string;
  dimensions?: AssetDimensionsInput | null;
  downloadUrl: string;
  path: string;
};
export type AssetDimensionsInput = {
  height: number;
  width: number;
};
export type CampaignTeamMemberInput = {
  role: CampaignTeamMemberRoleExpress_enum;
  userId: string;
};
export type CreateCampaignPageMutation$variables = {
  input: CreateCampaignInput;
};
export type CreateCampaignPageMutation$data = {
  readonly CampaignsNamespace: {
    readonly createCampaign: {
      readonly campaign: {
        readonly slug: string;
        readonly " $fragmentSpreads": FragmentRefs<"CampaignPageDraftModeContent_CampaignV2">;
      };
    };
  };
};
export type CreateCampaignPageMutation = {
  response: CreateCampaignPageMutation$data;
  variables: CreateCampaignPageMutation$variables;
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
  "name": "slug",
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
  "name": "title",
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
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "MetadataOffchain",
  "kind": "LinkedField",
  "name": "offchainData",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "image",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "masterEditionMint",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v17 = [
  (v16/*: any*/),
  (v3/*: any*/)
],
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": (v17/*: any*/),
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentAmount",
  "storageKey": null
},
v22 = [
  (v16/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateCampaignPageMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CreateCampaignResponse",
            "kind": "LinkedField",
            "name": "createCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaign",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignPageDraftModeContent_CampaignV2"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateCampaignPageMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CreateCampaignResponse",
            "kind": "LinkedField",
            "name": "createCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaign",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "colorScheme",
                    "storageKey": null
                  },
                  (v4/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssetExpress",
                    "kind": "LinkedField",
                    "name": "galleryAssets",
                    "plural": true,
                    "selections": [
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
                      (v7/*: any*/),
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "path",
                        "storageKey": null
                      },
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
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "youtubeVideoHref",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "fundingTiers",
                    "plural": true,
                    "selections": [
                      (v8/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/),
                          (v4/*: any*/),
                          (v9/*: any*/),
                          {
                            "alias": "metadataAccountsForPreview",
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 3
                              }
                            ],
                            "concreteType": "MetadataAccountsConnection",
                            "kind": "LinkedField",
                            "name": "metadataAccounts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "MetadataAccountsEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MetadataAccount",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v5/*: any*/),
                                      (v7/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      (v14/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "NftExpress",
                                        "kind": "LinkedField",
                                        "name": "nft",
                                        "plural": false,
                                        "selections": [
                                          (v15/*: any*/),
                                          (v18/*: any*/),
                                          (v19/*: any*/),
                                          (v3/*: any*/)
                                        ],
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "metadataAccounts(first:3)"
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CampaignBenefitExpress",
                            "kind": "LinkedField",
                            "name": "benefits",
                            "plural": true,
                            "selections": [
                              (v9/*: any*/),
                              (v3/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "nftOrder",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": [
                              {
                                "kind": "Literal",
                                "name": "first",
                                "value": 300
                              }
                            ],
                            "concreteType": "MetadataAccountsConnection",
                            "kind": "LinkedField",
                            "name": "metadataAccounts",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "MetadataAccountsEdge",
                                "kind": "LinkedField",
                                "name": "edges",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MetadataAccount",
                                    "kind": "LinkedField",
                                    "name": "node",
                                    "plural": false,
                                    "selections": [
                                      (v3/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "NftExpress",
                                        "kind": "LinkedField",
                                        "name": "nft",
                                        "plural": false,
                                        "selections": [
                                          (v3/*: any*/),
                                          (v15/*: any*/),
                                          (v18/*: any*/),
                                          (v19/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v14/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "MetadataAccountData",
                                        "kind": "LinkedField",
                                        "name": "data",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "name",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v5/*: any*/),
                                      (v7/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/)
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": "metadataAccounts(first:300)"
                          }
                        ],
                        "type": "CampaignFundingTierStandard",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignAbout",
                    "kind": "LinkedField",
                    "name": "about",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "campaign",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "contactInfo",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "creator",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "risksAndChallenges",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "timeline",
                        "storageKey": null
                      }
                    ],
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
                      (v8/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v20/*: any*/),
                          (v21/*: any*/),
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
                          (v20/*: any*/),
                          (v21/*: any*/)
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
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "creator",
                    "plural": false,
                    "selections": (v22/*: any*/),
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
                        "selections": (v22/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
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
    "cacheID": "534494e940c6ad2a4ae2f6947eaea306",
    "id": null,
    "metadata": {},
    "name": "CreateCampaignPageMutation",
    "operationKind": "mutation",
    "text": "mutation CreateCampaignPageMutation(\n  $input: CreateCampaignInput!\n) {\n  CampaignsNamespace {\n    createCampaign(input: $input) {\n      campaign {\n        slug\n        ...CampaignPageDraftModeContent_CampaignV2\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment CampaignAboutModal_CampaignV2 on CampaignV2 {\n  id\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n}\n\nfragment CampaignArtistPillButtons_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  teamMembers {\n    member {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n  }\n}\n\nfragment CampaignDraftAboutCard_CampaignV2 on CampaignV2 {\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n}\n\nfragment CampaignDraftBiddingInfo_CampaignV2 on CampaignV2 {\n  ...CampaignDraftCampaignProgressTowardsGoal_CampaignV2\n}\n\nfragment CampaignDraftCampaignProgressTowardsGoal_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment CampaignDraftChecklist_CampaignV2 on CampaignV2 {\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n  galleryAssets {\n    id\n  }\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      metadataAccountsForPreview: metadataAccounts(first: 3) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment CampaignFundingTierManageNftsModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n}\n\nfragment CampaignGalleryModal_CampaignV2 on CampaignV2 {\n  id\n  galleryAssets {\n    contentType\n    downloadUrl\n    path\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n  youtubeVideoHref\n}\n\nfragment CampaignHeaderStatusBanner_CampaignV2 on CampaignV2 {\n  slug\n  status\n  creator {\n    username\n    id\n  }\n}\n\nfragment CampaignHeroAssets_AssetExpress on AssetExpress {\n  ...AssetForAssetExpress_AssetExpress\n}\n\nfragment CampaignPageDraftModeContent_CampaignV2 on CampaignV2 {\n  id\n  colorScheme\n  title\n  tagline\n  status\n  galleryAssets {\n    ...CampaignHeroAssets_AssetExpress\n    id\n  }\n  youtubeVideoHref\n  ...ManageFundingTiersModal_CampaignV2\n  ...FundingTierSectionForCampaignV2_CampaignV2\n  ...CampaignAboutModal_CampaignV2\n  ...CampaignGalleryModal_CampaignV2\n  ...CampaignDraftAboutCard_CampaignV2\n  ...CampaignDraftBiddingInfo_CampaignV2\n  ...CampaignArtistPillButtons_CampaignV2\n  ...CampaignDraftChecklist_CampaignV2\n  ...CampaignHeaderStatusBanner_CampaignV2\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment EditFundingTierModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  benefits {\n    description\n    id\n  }\n  id\n}\n\nfragment FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  metadataAccountsForPreview: metadataAccounts(first: 3) {\n    edges {\n      node {\n        ...FundingTierNftPreviewAssets_MetadataAccount\n        id\n      }\n    }\n  }\n  ...EditFundingTierModal_CampaignFundingTierStandard\n  ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard\n  ...FundingTierNftsContext_CampaignFundingTierStandard\n}\n\nfragment FundingTierNftPreviewAssets_MetadataAccount on MetadataAccount {\n  id\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment FundingTierNftsContext_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  nftOrder\n  metadataAccounts(first: 300) {\n    edges {\n      node {\n        id\n        nft {\n          id\n        }\n        mint\n        ...GenericNftSearchRow_MetadataAccount\n        ...GenericNftSearchDndRow_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment FundingTierSectionForCampaignV2_CampaignV2 on CampaignV2 {\n  ...ManageFundingTiersModal_CampaignV2\n  id\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      id\n      ...FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard\n    }\n  }\n  status\n}\n\nfragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {\n  id\n  ...GenericNftSearchRow_MetadataAccount\n}\n\nfragment GenericNftSearchRow_MetadataAccount on MetadataAccount {\n  id\n  data {\n    name\n  }\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment ManageFundingTierRow_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  title\n}\n\nfragment ManageFundingTiersModal_CampaignV2 on CampaignV2 {\n  id\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      ...ManageFundingTierRow_CampaignFundingTierStandard\n      id\n    }\n  }\n  status\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "a45e9ec5d07b598f7b481214cb685839";

export default node;
