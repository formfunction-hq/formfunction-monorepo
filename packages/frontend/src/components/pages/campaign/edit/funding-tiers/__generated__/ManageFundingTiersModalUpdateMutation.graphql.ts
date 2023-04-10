/**
 * @generated SignedSource<<a905beaa8450453eaa6ef22c8e3ca753>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCampaignFundingTierOrderInput = {
  campaignId: string;
  fundingTierOrder: ReadonlyArray<string>;
};
export type ManageFundingTiersModalUpdateMutation$variables = {
  input: UpdateCampaignFundingTierOrderInput;
};
export type ManageFundingTiersModalUpdateMutation$data = {
  readonly CampaignsNamespace: {
    readonly updateCampaignFundingTierOrder: {
      readonly campaign: {
        readonly " $fragmentSpreads": FragmentRefs<"CampaignPageDraftModeContent_CampaignV2">;
      };
    };
  };
};
export type ManageFundingTiersModalUpdateMutation = {
  response: ManageFundingTiersModalUpdateMutation$data;
  variables: ManageFundingTiersModalUpdateMutation$variables;
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
  "name": "title",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
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
  "name": "videoPlaybackId",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v10 = {
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
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "masterEditionMint",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v16 = [
  (v15/*: any*/),
  (v2/*: any*/)
],
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": (v16/*: any*/),
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": (v16/*: any*/),
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentAmount",
  "storageKey": null
},
v21 = [
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
      (v2/*: any*/)
    ],
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ManageFundingTiersModalUpdateMutation",
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
            "concreteType": "UpdateCampaignFundingTierOrderResponse",
            "kind": "LinkedField",
            "name": "updateCampaignFundingTierOrder",
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
    "name": "ManageFundingTiersModalUpdateMutation",
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
            "concreteType": "UpdateCampaignFundingTierOrderResponse",
            "kind": "LinkedField",
            "name": "updateCampaignFundingTierOrder",
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "colorScheme",
                    "storageKey": null
                  },
                  (v3/*: any*/),
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
                      (v4/*: any*/),
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
                      (v6/*: any*/),
                      (v2/*: any*/),
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
                      (v7/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          (v8/*: any*/),
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
                                      (v2/*: any*/),
                                      (v4/*: any*/),
                                      (v6/*: any*/),
                                      (v9/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v13/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "NftExpress",
                                        "kind": "LinkedField",
                                        "name": "nft",
                                        "plural": false,
                                        "selections": [
                                          (v14/*: any*/),
                                          (v17/*: any*/),
                                          (v18/*: any*/),
                                          (v2/*: any*/)
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
                              (v8/*: any*/),
                              (v2/*: any*/)
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
                                      (v2/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "NftExpress",
                                        "kind": "LinkedField",
                                        "name": "nft",
                                        "plural": false,
                                        "selections": [
                                          (v2/*: any*/),
                                          (v14/*: any*/),
                                          (v17/*: any*/),
                                          (v18/*: any*/)
                                        ],
                                        "storageKey": null
                                      },
                                      (v13/*: any*/),
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
                                      (v4/*: any*/),
                                      (v6/*: any*/),
                                      (v9/*: any*/),
                                      (v10/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/)
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
                      (v7/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v19/*: any*/),
                          (v20/*: any*/),
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
                          (v19/*: any*/),
                          (v20/*: any*/)
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
                    "selections": (v21/*: any*/),
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
                        "selections": (v21/*: any*/),
                        "storageKey": null
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
    "cacheID": "b9b548327f1b384ae8cabec19ca00f10",
    "id": null,
    "metadata": {},
    "name": "ManageFundingTiersModalUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation ManageFundingTiersModalUpdateMutation(\n  $input: UpdateCampaignFundingTierOrderInput!\n) {\n  CampaignsNamespace {\n    updateCampaignFundingTierOrder(input: $input) {\n      campaign {\n        ...CampaignPageDraftModeContent_CampaignV2\n        id\n      }\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment CampaignAboutModal_CampaignV2 on CampaignV2 {\n  id\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n}\n\nfragment CampaignArtistPillButtons_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  teamMembers {\n    member {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n  }\n}\n\nfragment CampaignDraftAboutCard_CampaignV2 on CampaignV2 {\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n}\n\nfragment CampaignDraftBiddingInfo_CampaignV2 on CampaignV2 {\n  ...CampaignDraftCampaignProgressTowardsGoal_CampaignV2\n}\n\nfragment CampaignDraftCampaignProgressTowardsGoal_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment CampaignDraftChecklist_CampaignV2 on CampaignV2 {\n  about {\n    campaign\n    contactInfo\n    creator\n    risksAndChallenges\n    timeline\n  }\n  galleryAssets {\n    id\n  }\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      metadataAccountsForPreview: metadataAccounts(first: 3) {\n        edges {\n          node {\n            id\n          }\n        }\n      }\n      id\n    }\n  }\n}\n\nfragment CampaignFundingTierManageNftsModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n}\n\nfragment CampaignGalleryModal_CampaignV2 on CampaignV2 {\n  id\n  galleryAssets {\n    contentType\n    downloadUrl\n    path\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n  youtubeVideoHref\n}\n\nfragment CampaignHeaderStatusBanner_CampaignV2 on CampaignV2 {\n  slug\n  status\n  creator {\n    username\n    id\n  }\n}\n\nfragment CampaignHeroAssets_AssetExpress on AssetExpress {\n  ...AssetForAssetExpress_AssetExpress\n}\n\nfragment CampaignPageDraftModeContent_CampaignV2 on CampaignV2 {\n  id\n  colorScheme\n  title\n  tagline\n  status\n  galleryAssets {\n    ...CampaignHeroAssets_AssetExpress\n    id\n  }\n  youtubeVideoHref\n  ...ManageFundingTiersModal_CampaignV2\n  ...FundingTierSectionForCampaignV2_CampaignV2\n  ...CampaignAboutModal_CampaignV2\n  ...CampaignGalleryModal_CampaignV2\n  ...CampaignDraftAboutCard_CampaignV2\n  ...CampaignDraftBiddingInfo_CampaignV2\n  ...CampaignArtistPillButtons_CampaignV2\n  ...CampaignDraftChecklist_CampaignV2\n  ...CampaignHeaderStatusBanner_CampaignV2\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment EditFundingTierModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  benefits {\n    description\n    id\n  }\n  id\n}\n\nfragment FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  metadataAccountsForPreview: metadataAccounts(first: 3) {\n    edges {\n      node {\n        ...FundingTierNftPreviewAssets_MetadataAccount\n        id\n      }\n    }\n  }\n  ...EditFundingTierModal_CampaignFundingTierStandard\n  ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard\n  ...FundingTierNftsContext_CampaignFundingTierStandard\n}\n\nfragment FundingTierNftPreviewAssets_MetadataAccount on MetadataAccount {\n  id\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment FundingTierNftsContext_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  nftOrder\n  metadataAccounts(first: 300) {\n    edges {\n      node {\n        id\n        nft {\n          id\n        }\n        mint\n        ...GenericNftSearchRow_MetadataAccount\n        ...GenericNftSearchDndRow_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment FundingTierSectionForCampaignV2_CampaignV2 on CampaignV2 {\n  ...ManageFundingTiersModal_CampaignV2\n  id\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      id\n      ...FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard\n    }\n  }\n  status\n}\n\nfragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {\n  id\n  ...GenericNftSearchRow_MetadataAccount\n}\n\nfragment GenericNftSearchRow_MetadataAccount on MetadataAccount {\n  id\n  data {\n    name\n  }\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment ManageFundingTierRow_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  title\n}\n\nfragment ManageFundingTiersModal_CampaignV2 on CampaignV2 {\n  id\n  fundingTiers {\n    __typename\n    ... on CampaignFundingTierStandard {\n      ...ManageFundingTierRow_CampaignFundingTierStandard\n      id\n    }\n  }\n  status\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d4ae56062e2b81969f39b6ec796dd937";

export default node;
