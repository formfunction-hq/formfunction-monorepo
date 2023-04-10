/**
 * @generated SignedSource<<219357befc3da314bde5756b2a17a790>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSectionsForSlugV2Input = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type CampaignSectionWithGenerativeMintsCandyMachineInfoInput = {
  viewerId?: string | null;
};
export type useCampaignPageSectionsQuery$variables = {
  candyMachineInfoInput: CampaignSectionWithGenerativeMintsCandyMachineInfoInput;
  firstForPreviewNfts: number;
  firstForSections: number;
  input: CampaignSectionsForSlugV2Input;
};
export type useCampaignPageSectionsQuery$data = {
  readonly campaignSectionsForSlugV2: {
    readonly campaignSections: ReadonlyArray<{
      readonly __typename: "CampaignSectionWithGenerativeMints";
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints" | "CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints">;
    } | {
      readonly __typename: "CampaignSectionWithNfts";
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts" | "CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
};
export type useCampaignPageSectionsQuery = {
  response: useCampaignPageSectionsQuery$data;
  variables: useCampaignPageSectionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "candyMachineInfoInput"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstForPreviewNfts"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstForSections"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v4 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v9 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "firstForSections"
  }
],
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v17 = {
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
    (v6/*: any*/)
  ],
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "masterEditionMint",
  "storageKey": null
},
v21 = [
  (v18/*: any*/),
  (v6/*: any*/)
],
v22 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxSupply",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "decimals",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "symbol",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortSymbol",
  "storageKey": null
},
v28 = [
  (v24/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrencyExpress",
    "kind": "LinkedField",
    "name": "currencyInfo",
    "plural": false,
    "selections": [
      (v25/*: any*/),
      (v6/*: any*/),
      (v26/*: any*/),
      (v27/*: any*/)
    ],
    "storageKey": null
  }
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "concreteType": "MetadataAccount",
  "kind": "LinkedField",
  "name": "node",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    (v10/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
      "storageKey": null
    },
    (v13/*: any*/),
    (v14/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        (v15/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "MetadataCreator",
          "kind": "LinkedField",
          "name": "creators",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "address",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "share",
              "storageKey": null
            },
            (v16/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
                (v17/*: any*/),
                (v6/*: any*/)
              ],
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
      "concreteType": "MetadataOffchain",
      "kind": "LinkedField",
      "name": "offchainData",
      "plural": false,
      "selections": [
        {
          "alias": "listingCardImage",
          "args": null,
          "kind": "ScalarField",
          "name": "image",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "creatorId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isImported",
          "storageKey": null
        },
        (v16/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": [
            (v18/*: any*/),
            (v17/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "NftDisclosureExpress",
          "kind": "LinkedField",
          "name": "disclosures",
          "plural": true,
          "selections": [
            (v19/*: any*/)
          ],
          "storageKey": null
        },
        (v6/*: any*/),
        (v20/*: any*/),
        (v22/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isMasterEdition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPnft",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupplyOnchain",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupplyOfMasterEdition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "CandyMachineExpress",
          "kind": "LinkedField",
          "name": "CandyMachine",
          "plural": false,
          "selections": [
            (v5/*: any*/),
            (v6/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "edition",
          "storageKey": null
        },
        (v23/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "numberOfStandardEditionsMinted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionEndTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionHoldingPeriodEndTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOffPlatform",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": (v28/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceLastSoldV2",
          "plural": false,
          "selections": (v28/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "scheduledAuctionTime",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    (v29/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfBidsForCurrentAuction",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v31 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "firstForPreviewNfts"
  }
],
v32 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": (v21/*: any*/),
  "storageKey": null
},
v33 = [
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
          (v6/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v14/*: any*/),
          {
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
          (v10/*: any*/),
          (v11/*: any*/),
          (v29/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NftExpress",
            "kind": "LinkedField",
            "name": "nft",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              (v32/*: any*/),
              (v22/*: any*/),
              (v6/*: any*/)
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
v34 = [
  (v24/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrencyExpress",
    "kind": "LinkedField",
    "name": "currencyInfo",
    "plural": false,
    "selections": [
      (v25/*: any*/),
      (v6/*: any*/),
      (v26/*: any*/),
      (v27/*: any*/),
      (v15/*: any*/)
    ],
    "storageKey": null
  }
],
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountMinted",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCampaignPageSectionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "CampaignSectionsForSlugV2Response",
        "kind": "LinkedField",
        "name": "campaignSectionsForSlugV2",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "campaignSections",
            "plural": true,
            "selections": [
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts"
                  }
                ],
                "type": "CampaignSectionWithNfts",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints"
                  },
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints"
                  }
                ],
                "type": "CampaignSectionWithGenerativeMints",
                "abstractKey": null
              }
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
    "argumentDefinitions": [
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCampaignPageSectionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v4/*: any*/),
        "concreteType": "CampaignSectionsForSlugV2Response",
        "kind": "LinkedField",
        "name": "campaignSectionsForSlugV2",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": null,
            "kind": "LinkedField",
            "name": "campaignSections",
            "plural": true,
            "selections": [
              (v5/*: any*/),
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "benefits",
                    "storageKey": null
                  },
                  (v7/*: any*/),
                  (v8/*: any*/),
                  {
                    "alias": "metadataAccountsForSection",
                    "args": (v9/*: any*/),
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
                          (v30/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": (v31/*: any*/),
                    "concreteType": "MetadataAccountsConnection",
                    "kind": "LinkedField",
                    "name": "metadataAccounts",
                    "plural": false,
                    "selections": (v33/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "CampaignSectionWithNfts",
                "abstractKey": null
              },
              {
                "kind": "InlineFragment",
                "selections": [
                  (v6/*: any*/),
                  (v7/*: any*/),
                  {
                    "alias": null,
                    "args": [
                      {
                        "kind": "Variable",
                        "name": "input",
                        "variableName": "candyMachineInfoInput"
                      }
                    ],
                    "concreteType": "CampaignSectionWithGenerativeMintsCandyMachineInfo",
                    "kind": "LinkedField",
                    "name": "candyMachineInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CandyMachineExpress",
                        "kind": "LinkedField",
                        "name": "candyMachine",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "SeriesExpress",
                            "kind": "LinkedField",
                            "name": "Series",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "slug",
                                "storageKey": null
                              },
                              (v19/*: any*/),
                              (v32/*: any*/),
                              (v6/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v23/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "totalAmountMinted",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "allowlistSaleStartTime",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "publicSaleEndTime",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "publicSaleStartTime",
                            "storageKey": null
                          },
                          (v6/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "antiBotProtectionEnabled",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "publicKey",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "CreatorAuthority",
                            "plural": false,
                            "selections": [
                              (v6/*: any*/),
                              (v18/*: any*/),
                              (v17/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Price",
                            "kind": "LinkedField",
                            "name": "allowlistPrice",
                            "plural": false,
                            "selections": (v34/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Price",
                            "kind": "LinkedField",
                            "name": "premintPrice",
                            "plural": false,
                            "selections": (v34/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "Price",
                            "kind": "LinkedField",
                            "name": "price",
                            "plural": false,
                            "selections": (v34/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "limitPerAddress",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "omniMintWallets",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AssetExpress",
                        "kind": "LinkedField",
                        "name": "mintPreviewAsset",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          (v35/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AssetExpress",
                        "kind": "LinkedField",
                        "name": "premintPreviewAssets",
                        "plural": true,
                        "selections": [
                          (v12/*: any*/),
                          (v35/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "AssetDarkModeInfo",
                            "kind": "LinkedField",
                            "name": "darkModeInfo",
                            "plural": false,
                            "selections": [
                              (v35/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v13/*: any*/),
                          (v6/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "viewerAmountMinted",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isViewerOmniMinter",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": null,
                        "kind": "LinkedField",
                        "name": "viewerAllowlistInfo",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "amountAllowed",
                                "storageKey": null
                              },
                              (v36/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "merkleRootIndexForProof",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "proof",
                                "storageKey": null
                              }
                            ],
                            "type": "CandyMachineMerkleAllowlistInfoForViewerExpress",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "allowlistTokenAccount",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "allowlistTokenMint",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "allowlistTokenAmount",
                                "storageKey": null
                              },
                              (v36/*: any*/)
                            ],
                            "type": "CandyMachineTokenAllowlistInfoForViewer",
                            "abstractKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": "metadataAccountsForSection",
                    "args": (v9/*: any*/),
                    "concreteType": "MetadataAccountsConnection",
                    "kind": "LinkedField",
                    "name": "previewMetadataAccounts",
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
                          (v5/*: any*/),
                          (v30/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "kind": "ClientExtension",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__id",
                            "storageKey": null
                          }
                        ]
                      }
                    ],
                    "storageKey": null
                  },
                  (v8/*: any*/),
                  {
                    "alias": null,
                    "args": (v31/*: any*/),
                    "concreteType": "MetadataAccountsConnection",
                    "kind": "LinkedField",
                    "name": "previewMetadataAccounts",
                    "plural": false,
                    "selections": (v33/*: any*/),
                    "storageKey": null
                  }
                ],
                "type": "CampaignSectionWithGenerativeMints",
                "abstractKey": null
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
    "cacheID": "a1b4b69d96cd72c1f6dac92ca5b7ad4f",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageSectionsQuery",
    "operationKind": "query",
    "text": "query useCampaignPageSectionsQuery(\n  $input: CampaignSectionsForSlugV2Input!\n  $firstForPreviewNfts: PaginationAmount!\n  $firstForSections: PaginationAmount!\n  $candyMachineInfoInput: CampaignSectionWithGenerativeMintsCandyMachineInfoInput!\n) {\n  campaignSectionsForSlugV2(input: $input) {\n    campaignSections {\n      __typename\n      ... on CampaignSectionWithNfts {\n        __typename\n        id\n        ...CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts\n        ...CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts\n      }\n      ... on CampaignSectionWithGenerativeMints {\n        __typename\n        id\n        ...CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints\n        ...CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints\n      }\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment BuyNowGenericModal_Price on Price {\n  currencyInfo {\n    name\n    id\n  }\n  ...PriceWithSymbol_Price\n  ...useFormattedNftPrice_Price\n}\n\nfragment CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  title\n  id\n  candyMachineInfo(input: $candyMachineInfoInput) {\n    candyMachine {\n      ...CandyMachineSeeAllButton_CandyMachineExpress\n      ...useCandyMachineIsSoldOut_CandyMachineExpress\n      ...useCandyMachineMintPhase_CandyMachineExpress\n      id\n    }\n    mintPreviewAsset {\n      contentType\n      downloadUrl\n      id\n    }\n    ...CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo\n    ...MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo\n    id\n  }\n  metadataAccountsForSection: previewMetadataAccounts(first: $firstForSections) {\n    edges {\n      __typename\n    }\n  }\n  ...CandyMachineInfo_CampaignSectionWithGenerativeMints\n  ...CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints\n  ...CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints\n  ...useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints\n}\n\nfragment CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts on CampaignSectionWithNfts {\n  benefits\n  title\n  description\n  id\n  metadataAccountsForSection: metadataAccounts(first: $firstForSections) {\n    edges {\n      node {\n        id\n        ...ListingCardForMetadata_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  description\n  title\n  id\n  previewMetadataAccounts(first: $firstForPreviewNfts) {\n    edges {\n      node {\n        ...GenericCampaignSectionPreview_MetadataAccount\n        id\n      }\n    }\n  }\n}\n\nfragment CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts on CampaignSectionWithNfts {\n  description\n  title\n  id\n  metadataAccounts(first: $firstForPreviewNfts) {\n    edges {\n      node {\n        ...GenericCampaignSectionPreview_MetadataAccount\n        id\n      }\n    }\n  }\n}\n\nfragment CandyMachineInfo_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  description\n  title\n  candyMachineInfo(input: $candyMachineInfoInput) {\n    candyMachine {\n      allowlistSaleStartTime\n      limitPerAddress\n      publicSaleStartTime\n      omniMintWallets\n      ...useCandyMachineMintPhase_CandyMachineExpress\n      ...useCandyMachineIsSoldOut_CandyMachineExpress\n      id\n    }\n    ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo\n    id\n  }\n}\n\nfragment CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  metadataAccountsForSection: previewMetadataAccounts(first: $firstForSections) {\n    edges {\n      node {\n        id\n        ...ListingCardForMetadata_MetadataAccount\n      }\n    }\n  }\n  ...useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints\n}\n\nfragment CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {\n  candyMachine {\n    ...useCandyMachineMintPhase_CandyMachineExpress\n    id\n  }\n  premintPreviewAssets {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n}\n\nfragment CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  candyMachineInfo(input: $candyMachineInfoInput) {\n    candyMachine {\n      maxSupply\n      totalAmountMinted\n      ...useCandyMachineMintPhase_CandyMachineExpress\n      ...useCandyMachineMintPrice_CandyMachineExpress\n      id\n    }\n    ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo\n    id\n  }\n}\n\nfragment CandyMachineSeeAllButton_CandyMachineExpress on CandyMachineExpress {\n  Series {\n    ...useSeriesLinkRelativeForSeriesExpress_SeriesExpress\n    id\n  }\n  ...useCandyMachineIsSoldOut_CandyMachineExpress\n  ...useCandyMachineMintPhase_CandyMachineExpress\n}\n\nfragment GenericCampaignSectionPreview_MetadataAccount on MetadataAccount {\n  id\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {\n  id\n  candyMachine {\n    id\n    antiBotProtectionEnabled\n    publicKey\n    totalAmountMinted\n    CreatorAuthority {\n      id\n      ...ArtistPillButtonForUserExpress_UserExpress\n    }\n    ...useCandyMachineMintPhase_CandyMachineExpress\n    ...useCandyMachineMintPrice_CandyMachineExpress\n  }\n  viewerAmountMinted\n  ...useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints on CampaignSectionWithGenerativeMints {\n  metadataAccountsForSection: previewMetadataAccounts(first: $firstForSections) {\n    edges {\n      __typename\n    }\n  }\n}\n\nfragment useCandyMachineIsSoldOut_CandyMachineExpress on CandyMachineExpress {\n  maxSupply\n  totalAmountMinted\n}\n\nfragment useCandyMachineMintPhase_CandyMachineExpress on CandyMachineExpress {\n  allowlistSaleStartTime\n  publicSaleEndTime\n  publicSaleStartTime\n}\n\nfragment useCandyMachineMintPrice_CandyMachineExpress on CandyMachineExpress {\n  allowlistPrice {\n    ...PriceWithSymbol_Price\n    ...PriceWithSymbolText_Price\n    ...BuyNowGenericModal_Price\n    ...usePriceCurrencyNameAndAmount_Price\n  }\n  premintPrice {\n    ...PriceWithSymbol_Price\n    ...PriceWithSymbolText_Price\n    ...BuyNowGenericModal_Price\n    ...usePriceCurrencyNameAndAmount_Price\n  }\n  price {\n    ...PriceWithSymbol_Price\n    ...PriceWithSymbolText_Price\n    ...BuyNowGenericModal_Price\n    ...usePriceCurrencyNameAndAmount_Price\n  }\n  ...useCandyMachineMintPhase_CandyMachineExpress\n}\n\nfragment useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo on CampaignSectionWithGenerativeMintsCandyMachineInfo {\n  candyMachine {\n    limitPerAddress\n    ...useCandyMachineMintPhase_CandyMachineExpress\n    ...useCandyMachineIsSoldOut_CandyMachineExpress\n    id\n  }\n  isViewerOmniMinter\n  viewerAllowlistInfo {\n    __typename\n    ... on CandyMachineMerkleAllowlistInfoForViewerExpress {\n      amountAllowed\n      amountMinted\n      merkleRootIndexForProof\n      proof\n    }\n    ... on CandyMachineTokenAllowlistInfoForViewer {\n      allowlistTokenAccount\n      allowlistTokenMint\n      allowlistTokenAmount\n      amountMinted\n    }\n  }\n  viewerAmountMinted\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n\nfragment usePriceCurrencyNameAndAmount_Price on Price {\n  amount\n  currencyInfo {\n    name\n    id\n  }\n}\n\nfragment useSeriesLinkRelativeForSeriesExpress_SeriesExpress on SeriesExpress {\n  slug\n  type\n  Creator {\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "2181d182745773e6a0a05c5b48d25b61";

export default node;
