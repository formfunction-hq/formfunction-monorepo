/**
 * @generated SignedSource<<e2adff04e0bd2625cdd1316a874a7562>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTiersForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type useCampaignPageFundingTiersQuery$variables = {
  firstForFundingTierNfts: number;
  firstForPreviewNfts: number;
  input: CampaignFundingTiersForSlugInput;
};
export type useCampaignPageFundingTiersQuery$data = {
  readonly CampaignsNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse" | "CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
  };
};
export type useCampaignPageFundingTiersQuery = {
  response: useCampaignPageFundingTiersQuery$data;
  variables: useCampaignPageFundingTiersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "firstForFundingTierNfts"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "firstForPreviewNfts"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
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
  "name": "description",
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
  "name": "videoPlaybackId",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v7 = {
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
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "masterEditionMint",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v13 = [
  (v12/*: any*/),
  (v2/*: any*/)
],
v14 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": (v13/*: any*/),
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v18 = {
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
      (v2/*: any*/),
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCampaignPageFundingTiersQuery",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse"
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
    "name": "useCampaignPageFundingTiersQuery",
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
              {
                "kind": "Variable",
                "name": "input",
                "variableName": "input"
              }
            ],
            "concreteType": "CampaignFundingTiersForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignFundingTiersForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "campaignFundingTiers",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
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
                            "kind": "Variable",
                            "name": "first",
                            "variableName": "firstForPreviewNfts"
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
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/),
                                  (v10/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "NftExpress",
                                    "kind": "LinkedField",
                                    "name": "nft",
                                    "plural": false,
                                    "selections": [
                                      (v11/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/),
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
                                      (v11/*: any*/),
                                      (v14/*: any*/),
                                      (v15/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v10/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MetadataAccountData",
                                    "kind": "LinkedField",
                                    "name": "data",
                                    "plural": false,
                                    "selections": [
                                      (v16/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  (v4/*: any*/),
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  (v7/*: any*/),
                                  (v8/*: any*/),
                                  (v9/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": "metadataAccounts(first:300)"
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CampaignBenefitExpress",
                        "kind": "LinkedField",
                        "name": "benefits",
                        "plural": true,
                        "selections": [
                          (v3/*: any*/),
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": "metadataAccountsForSection",
                        "args": [
                          {
                            "kind": "Variable",
                            "name": "first",
                            "variableName": "firstForFundingTierNfts"
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
                                  (v8/*: any*/),
                                  (v9/*: any*/),
                                  (v4/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "primarySaleHappened",
                                    "storageKey": null
                                  },
                                  (v5/*: any*/),
                                  (v6/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "MetadataAccountData",
                                    "kind": "LinkedField",
                                    "name": "data",
                                    "plural": false,
                                    "selections": [
                                      (v16/*: any*/),
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
                                          (v17/*: any*/),
                                          {
                                            "alias": null,
                                            "args": null,
                                            "concreteType": "UserExpress",
                                            "kind": "LinkedField",
                                            "name": "user",
                                            "plural": false,
                                            "selections": [
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
                                      (v17/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "UserExpress",
                                        "kind": "LinkedField",
                                        "name": "Creator",
                                        "plural": false,
                                        "selections": [
                                          (v12/*: any*/),
                                          (v18/*: any*/),
                                          (v2/*: any*/)
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
                                      (v2/*: any*/),
                                      (v11/*: any*/),
                                      (v15/*: any*/),
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
                                          (v1/*: any*/),
                                          (v2/*: any*/)
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
                                        "selections": (v19/*: any*/),
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "Price",
                                        "kind": "LinkedField",
                                        "name": "priceLastSoldV2",
                                        "plural": false,
                                        "selections": (v19/*: any*/),
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
                                  (v10/*: any*/),
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
    "cacheID": "c5b234e91596e3e97f114b69c019d96b",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageFundingTiersQuery",
    "operationKind": "query",
    "text": "query useCampaignPageFundingTiersQuery(\n  $firstForFundingTierNfts: PaginationAmount!\n  $firstForPreviewNfts: PaginationAmount!\n  $input: CampaignFundingTiersForSlugInput!\n) {\n  CampaignsNamespace {\n    ...CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse\n    ...CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  benefits {\n    description\n    id\n  }\n  title\n  description\n  id\n  metadataAccountsForSection: metadataAccounts(first: $firstForFundingTierNfts) {\n    edges {\n      node {\n        id\n        ...ListingCardForMetadata_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment CampaignFundingTierManageNftsModal_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n}\n\nfragment CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  description\n  title\n  id\n  metadataAccountsForPreview: metadataAccounts(first: $firstForPreviewNfts) {\n    edges {\n      node {\n        ...CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount\n        id\n      }\n    }\n  }\n  ...CampaignFundingTierManageNftsModal_CampaignFundingTierStandard\n  ...FundingTierNftsContext_CampaignFundingTierStandard\n}\n\nfragment CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount on MetadataAccount {\n  id\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignFundingTiersForSlug(input: $input) {\n    campaignFundingTiers {\n      __typename\n      ... on CampaignFundingTierStandard {\n        id\n        ...CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard\n      }\n    }\n  }\n}\n\nfragment CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignFundingTiersForSlug(input: $input) {\n    campaignFundingTiers {\n      __typename\n      ... on CampaignFundingTierStandard {\n        id\n        ...CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard\n      }\n    }\n  }\n}\n\nfragment FundingTierNftsContext_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  nftOrder\n  metadataAccounts(first: 300) {\n    edges {\n      node {\n        id\n        nft {\n          id\n        }\n        mint\n        ...GenericNftSearchRow_MetadataAccount\n        ...GenericNftSearchDndRow_MetadataAccount\n      }\n    }\n  }\n}\n\nfragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {\n  id\n  ...GenericNftSearchRow_MetadataAccount\n}\n\nfragment GenericNftSearchRow_MetadataAccount on MetadataAccount {\n  id\n  data {\n    name\n  }\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "d57d36ab710da63087c3f36077a3145e";

export default node;
