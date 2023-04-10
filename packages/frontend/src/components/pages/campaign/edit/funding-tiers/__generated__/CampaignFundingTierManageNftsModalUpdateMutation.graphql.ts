/**
 * @generated SignedSource<<4e59b386f357b565e6f68a042eda2476>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateCampaignFundingTierNftsInput = {
  campaignFundingTierId: string;
  nftIds: ReadonlyArray<string>;
};
export type CampaignFundingTierManageNftsModalUpdateMutation$variables = {
  firstForFundingTierNfts: number;
  input: UpdateCampaignFundingTierNftsInput;
};
export type CampaignFundingTierManageNftsModalUpdateMutation$data = {
  readonly CampaignsNamespace: {
    readonly updateCampaignFundingTierNfts: {
      readonly campaignFundingTier: {
        readonly metadataAccountsMutationResponse?: {
          readonly edges: ReadonlyArray<{
            readonly node: {
              readonly id: string;
              readonly mint: string;
              readonly nft: {
                readonly id: string;
              };
              readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchDndRow_MetadataAccount" | "GenericNftSearchRow_MetadataAccount">;
            };
          }>;
        } | null;
        readonly nftOrder?: ReadonlyArray<string> | null;
        readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard" | "FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard">;
      };
    };
  };
};
export type CampaignFundingTierManageNftsModalUpdateMutation = {
  response: CampaignFundingTierManageNftsModalUpdateMutation$data;
  variables: CampaignFundingTierManageNftsModalUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "firstForFundingTierNfts"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "nftOrder",
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "firstForFundingTierNfts"
  }
],
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
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
  "name": "masterEditionMint",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v10 = [
  (v9/*: any*/),
  (v5/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v17 = {
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
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v20 = [
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
          (v5/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "NftExpress",
            "kind": "LinkedField",
            "name": "nft",
            "plural": false,
            "selections": [
              (v5/*: any*/),
              (v8/*: any*/),
              (v11/*: any*/),
              (v12/*: any*/)
            ],
            "storageKey": null
          },
          (v6/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccountData",
            "kind": "LinkedField",
            "name": "data",
            "plural": false,
            "selections": [
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          (v14/*: any*/),
          (v15/*: any*/),
          (v16/*: any*/),
          (v17/*: any*/),
          (v18/*: any*/),
          (v19/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v23 = {
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
    (v5/*: any*/)
  ],
  "storageKey": null
},
v24 = [
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
      (v5/*: any*/),
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignFundingTierManageNftsModalUpdateMutation",
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
            "args": (v2/*: any*/),
            "concreteType": "UpdateCampaignFundingTierNftsResponse",
            "kind": "LinkedField",
            "name": "updateCampaignFundingTierNfts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "campaignFundingTier",
                "plural": false,
                "selections": [
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": "metadataAccountsMutationResponse",
                        "args": (v4/*: any*/),
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
                                  (v5/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "NftExpress",
                                    "kind": "LinkedField",
                                    "name": "nft",
                                    "plural": false,
                                    "selections": [
                                      (v5/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v6/*: any*/),
                                  {
                                    "args": null,
                                    "kind": "FragmentSpread",
                                    "name": "GenericNftSearchRow_MetadataAccount"
                                  },
                                  {
                                    "args": null,
                                    "kind": "FragmentSpread",
                                    "name": "GenericNftSearchDndRow_MetadataAccount"
                                  }
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
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard"
                      }
                    ],
                    "type": "CampaignFundingTierStandard",
                    "abstractKey": null
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CampaignFundingTierManageNftsModalUpdateMutation",
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
            "args": (v2/*: any*/),
            "concreteType": "UpdateCampaignFundingTierNftsResponse",
            "kind": "LinkedField",
            "name": "updateCampaignFundingTierNfts",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "campaignFundingTier",
                "plural": false,
                "selections": [
                  (v7/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": "metadataAccountsMutationResponse",
                        "args": (v4/*: any*/),
                        "concreteType": "MetadataAccountsConnection",
                        "kind": "LinkedField",
                        "name": "metadataAccounts",
                        "plural": false,
                        "selections": (v20/*: any*/),
                        "storageKey": null
                      },
                      (v21/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "title",
                        "storageKey": null
                      },
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
                                  (v5/*: any*/),
                                  (v14/*: any*/),
                                  (v15/*: any*/),
                                  (v16/*: any*/),
                                  (v17/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "NftExpress",
                                    "kind": "LinkedField",
                                    "name": "nft",
                                    "plural": false,
                                    "selections": [
                                      (v8/*: any*/),
                                      (v11/*: any*/),
                                      (v12/*: any*/),
                                      (v5/*: any*/)
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
                          (v21/*: any*/),
                          (v5/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v5/*: any*/),
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
                        "selections": (v20/*: any*/),
                        "storageKey": "metadataAccounts(first:300)"
                      },
                      {
                        "alias": "metadataAccountsForSection",
                        "args": (v4/*: any*/),
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
                                  (v5/*: any*/),
                                  (v18/*: any*/),
                                  (v19/*: any*/),
                                  (v14/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "primarySaleHappened",
                                    "storageKey": null
                                  },
                                  (v15/*: any*/),
                                  (v16/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MetadataAccountData",
                                    "kind": "LinkedField",
                                    "name": "data",
                                    "plural": false,
                                    "selections": [
                                      (v13/*: any*/),
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
                                          (v22/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "UserExpress",
                                            "kind": "LinkedField",
                                            "name": "user",
                                            "plural": false,
                                            "selections": [
                                              (v23/*: any*/),
                                              (v5/*: any*/)
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
                                      (v22/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "UserExpress",
                                        "kind": "LinkedField",
                                        "name": "Creator",
                                        "plural": false,
                                        "selections": [
                                          (v9/*: any*/),
                                          (v23/*: any*/),
                                          (v5/*: any*/)
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
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "type",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v5/*: any*/),
                                      (v8/*: any*/),
                                      (v12/*: any*/),
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
                                          (v7/*: any*/),
                                          (v5/*: any*/)
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
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "maxSupply",
                                        "storageKey": null
                                      },
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
                                        "selections": (v24/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Price",
                                        "kind": "LinkedField",
                                        "name": "priceLastSoldV2",
                                        "plural": false,
                                        "selections": (v24/*: any*/),
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
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "numberOfBidsForCurrentAuction",
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
                    "type": "CampaignFundingTierStandard",
                    "abstractKey": null
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
    "cacheID": "fd0f81d3a3adc6e57a48d294bd6718ff",
    "id": null,
    "metadata": {},
    "name": "CampaignFundingTierManageNftsModalUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignFundingTierManageNftsModalUpdateMutation(\n  $input: UpdateCampaignFundingTierNftsInput!\n  $firstForFundingTierNfts: PaginationAmount!\n) {\n  CampaignsNamespace {\n    updateCampaignFundingTierNfts(input: $input) {\n      campaignFundingTier {\n        __typename\n        ... on CampaignFundingTierStandard {\n          nftOrder\n          metadataAccountsMutationResponse: metadataAccounts(first: $firstForFundingTierNfts) {\n            edges {\n              node {\n                id\n                nft {\n                  id\n                }\n                mint\n                ...GenericNftSearchRow_MetadataAccount\n                ...GenericNftSearchDndRow_MetadataAccount\n              }\n            }\n          }\n          ...FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard\n          ...CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  benefits {\n    description\n    id\n  }\n  title\n  description\n  id\n  metadataAccountsForSection: metadataAccounts(first: $firstForFundingTierNfts) {\n    edges {\n      node {\n        id\n        ...ListingCardForMetadata_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment CampaignFundingTierManageNftsModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n}\n\nfragment EditFundingTierModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  benefits {\n    description\n    id\n  }\n  id\n}\n\nfragment FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  metadataAccountsForPreview: metadataAccounts(first: 3) {\n    edges {\n      node {\n        ...FundingTierNftPreviewAssets_MetadataAccount\n        id\n      }\n    }\n  }\n  ...EditFundingTierModal_CampaignFundingTierStandard\n  ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard\n  ...FundingTierNftsContext_CampaignFundingTierStandard\n}\n\nfragment FundingTierNftPreviewAssets_MetadataAccount on MetadataAccount {\n  id\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment FundingTierNftsContext_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  nftOrder\n  metadataAccounts(first: 300) {\n    edges {\n      node {\n        id\n        nft {\n          id\n        }\n        mint\n        ...GenericNftSearchRow_MetadataAccount\n        ...GenericNftSearchDndRow_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {\n  id\n  ...GenericNftSearchRow_MetadataAccount\n}\n\nfragment GenericNftSearchRow_MetadataAccount on MetadataAccount {\n  id\n  data {\n    name\n  }\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b9ee42bce08b9404a27ecc8ca30ace76";

export default node;
