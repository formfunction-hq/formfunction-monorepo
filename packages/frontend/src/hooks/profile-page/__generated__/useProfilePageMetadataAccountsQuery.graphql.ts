/**
 * @generated SignedSource<<be98d527c2902ebed4d83216a1fceb75>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetadataAccountsCollectedInput = {
  collectorAddress?: string | null;
  collectorUsername?: string | null;
};
export type MetadataAccountsCreatedInput = {
  creatorAddress?: string | null;
  creatorUsername?: string | null;
  includeCollaborations?: boolean | null;
};
export type useProfilePageMetadataAccountsQuery$variables = {
  metadataAccountsCollectedAfter?: string | null;
  metadataAccountsCollectedAndListedAfter?: string | null;
  metadataAccountsCollectedAndListedFirst: number;
  metadataAccountsCollectedFirst: number;
  metadataAccountsCollectedInput: MetadataAccountsCollectedInput;
  metadataAccountsCreatedAfter?: string | null;
  metadataAccountsCreatedFirst: number;
  metadataAccountsCreatedInput: MetadataAccountsCreatedInput;
};
export type useProfilePageMetadataAccountsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUserMetadataAccountsCollectedAndListed_Query" | "ProfilePageForUserMetadataAccountsCollected_Query" | "ProfilePageForUserMetadataAccounts_Query">;
};
export type useProfilePageMetadataAccountsQuery = {
  response: useProfilePageMetadataAccountsQuery$data;
  variables: useProfilePageMetadataAccountsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCollectedAfter"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCollectedAndListedAfter"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCollectedAndListedFirst"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCollectedFirst"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCollectedInput"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCreatedAfter"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCreatedFirst"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "metadataAccountsCreatedInput"
},
v8 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "metadataAccountsCreatedAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "metadataAccountsCreatedFirst"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "metadataAccountsCreatedInput"
  }
],
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "status",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v15 = {
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
    (v9/*: any*/)
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v17 = [
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
      (v9/*: any*/),
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
v18 = [
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
          (v9/*: any*/),
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
                "name": "auctionEndTime",
                "storageKey": null
              },
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
                "name": "isMasterEdition",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isAirdrop",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isPnft",
                "storageKey": null
              },
              (v10/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "ownerId",
                "storageKey": null
              },
              (v11/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "SeriesExpress",
                "kind": "LinkedField",
                "name": "Series",
                "plural": false,
                "selections": [
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  (v12/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "nftOrder",
                    "storageKey": null
                  },
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              (v9/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "isImported",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "Creator",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  (v15/*: any*/),
                  (v9/*: any*/)
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
                  (v13/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "masterEditionMint",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "Owner",
                "plural": false,
                "selections": [
                  (v14/*: any*/),
                  (v9/*: any*/)
                ],
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
                  (v16/*: any*/),
                  (v9/*: any*/)
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
                "selections": (v17/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "priceLastSoldV2",
                "plural": false,
                "selections": (v17/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assetHeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assetWidth",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "contentType",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "primarySaleHappened",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "videoPlaybackId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "videoPreviewPlaybackId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccountData",
            "kind": "LinkedField",
            "name": "data",
            "plural": false,
            "selections": [
              (v12/*: any*/),
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v15/*: any*/),
                      (v9/*: any*/)
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
          (v10/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numberOfBidsForCurrentAuction",
            "storageKey": null
          },
          (v16/*: any*/)
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
    "kind": "ScalarField",
    "name": "totalCount",
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
v19 = [
  "input"
],
v20 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "metadataAccountsCollectedInput"
},
v21 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "metadataAccountsCollectedAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "metadataAccountsCollectedFirst"
  },
  (v20/*: any*/)
],
v22 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "metadataAccountsCollectedAndListedAfter"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "metadataAccountsCollectedAndListedFirst"
  },
  (v20/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useProfilePageMetadataAccountsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProfilePageForUserMetadataAccounts_Query"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProfilePageForUserMetadataAccountsCollected_Query"
      },
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ProfilePageForUserMetadataAccountsCollectedAndListed_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/)
    ],
    "kind": "Operation",
    "name": "useProfilePageMetadataAccountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MetadataAccountsCreatedResponse",
        "kind": "LinkedField",
        "name": "metadataAccountsCreated",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v8/*: any*/),
            "concreteType": "MetadataAccountsConnection",
            "kind": "LinkedField",
            "name": "metadataAccounts",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v8/*: any*/),
            "filters": (v19/*: any*/),
            "handle": "connection",
            "key": "ProfilePageForUser_MetadataAccounts_Query_metadataAccounts",
            "kind": "LinkedHandle",
            "name": "metadataAccounts"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "MetadataAccountsCollectedResponse",
        "kind": "LinkedField",
        "name": "metadataAccountsCollected",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v21/*: any*/),
            "concreteType": "MetadataAccountsConnection",
            "kind": "LinkedField",
            "name": "metadataAccounts",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v21/*: any*/),
            "filters": (v19/*: any*/),
            "handle": "connection",
            "key": "ProfilePageForUser_MetadataAccountsCollected_Query_metadataAccounts",
            "kind": "LinkedHandle",
            "name": "metadataAccounts"
          },
          {
            "alias": null,
            "args": (v22/*: any*/),
            "concreteType": "MetadataAccountsConnection",
            "kind": "LinkedField",
            "name": "metadataAccountsListedByUser",
            "plural": false,
            "selections": (v18/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v22/*: any*/),
            "filters": (v19/*: any*/),
            "handle": "connection",
            "key": "ProfilePageForUser_MetadataAccountsCollectedAndListed_Query_metadataAccountsListedByUser",
            "kind": "LinkedHandle",
            "name": "metadataAccountsListedByUser"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "8e6cbc4cdd8b72a9ef0f0de5dcd33b8e",
    "id": null,
    "metadata": {},
    "name": "useProfilePageMetadataAccountsQuery",
    "operationKind": "query",
    "text": "query useProfilePageMetadataAccountsQuery(\n  $metadataAccountsCollectedAfter: String\n  $metadataAccountsCollectedFirst: Int!\n  $metadataAccountsCollectedAndListedAfter: String\n  $metadataAccountsCollectedAndListedFirst: Int!\n  $metadataAccountsCollectedInput: MetadataAccountsCollectedInput!\n  $metadataAccountsCreatedAfter: String\n  $metadataAccountsCreatedFirst: PaginationAmount!\n  $metadataAccountsCreatedInput: MetadataAccountsCreatedInput!\n) {\n  ...ProfilePageForUserMetadataAccounts_Query\n  ...ProfilePageForUserMetadataAccountsCollected_Query\n  ...ProfilePageForUserMetadataAccountsCollectedAndListed_Query\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment NftsForAddress_MetadataAccount on MetadataAccount {\n  id\n  nft {\n    auctionEndTime\n    creatorId\n    isMasterEdition\n    isAirdrop\n    isPnft\n    mint\n    ownerId\n    status\n    Series {\n      id\n      mint\n      slug\n      name\n      nftOrder\n      type\n    }\n    id\n  }\n  ...ListingCardForMetadata_MetadataAccount\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment ProfilePageForUserMetadataAccountsCollectedAndListed_Query on query_root {\n  metadataAccountsCollected {\n    metadataAccountsListedByUser(after: $metadataAccountsCollectedAndListedAfter, first: $metadataAccountsCollectedAndListedFirst, input: $metadataAccountsCollectedInput) {\n      edges {\n        node {\n          ...NftsForAddress_MetadataAccount\n          id\n          __typename\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ProfilePageForUserMetadataAccountsCollected_Query on query_root {\n  metadataAccountsCollected {\n    metadataAccounts(after: $metadataAccountsCollectedAfter, first: $metadataAccountsCollectedFirst, input: $metadataAccountsCollectedInput) {\n      edges {\n        node {\n          ...NftsForAddress_MetadataAccount\n          id\n          __typename\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment ProfilePageForUserMetadataAccounts_Query on query_root {\n  metadataAccountsCreated {\n    metadataAccounts(after: $metadataAccountsCreatedAfter, first: $metadataAccountsCreatedFirst, input: $metadataAccountsCreatedInput) {\n      edges {\n        node {\n          ...NftsForAddress_MetadataAccount\n          id\n          __typename\n        }\n        cursor\n      }\n      totalCount\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "f593d85ac53bd5a39a9ec2209ac4eeba";

export default node;
