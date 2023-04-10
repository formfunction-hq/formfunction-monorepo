/**
 * @generated SignedSource<<b6e7b516212ee2109d0e12ad7d18f39f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type OpenBidsInput = {
  userId: string;
};
export type MetadataAccountsInput = {
  address: string;
  includeCreator?: boolean | null;
  includeOffPlatform?: boolean | null;
  includeOwner?: boolean | null;
  status?: NftStatusExpress_enum | null;
};
export type ActivityAuctionsQuery$variables = {
  openBidsInput: OpenBidsInput;
  userId: string;
  yourAuctionsInput: MetadataAccountsInput;
};
export type ActivityAuctionsQuery$data = {
  readonly openBids: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ActivityAuctionsOpenBids_OpenBid">;
  }>;
  readonly yourAuctions: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ActivityAuctionsYourAuctions_MetadataAccount">;
  }>;
};
export type ActivityAuctionsQuery = {
  response: ActivityAuctionsQuery$data;
  variables: ActivityAuctionsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "openBidsInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "yourAuctionsInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "openBidsInput"
  }
],
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "yourAuctionsInput"
  }
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
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "primarySaleHappened",
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
  "name": "videoPreviewPlaybackId",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v11 = {
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
v12 = {
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
    },
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
        (v10/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "user",
          "plural": false,
          "selections": [
            (v11/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v13 = {
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
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creatorId",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isImported",
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Creator",
  "plural": false,
  "selections": [
    (v16/*: any*/),
    (v11/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v18 = {
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
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "masterEditionMint",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "Owner",
  "plural": false,
  "selections": [
    (v16/*: any*/),
    (v3/*: any*/)
  ],
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isMasterEdition",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isPnft",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxSupplyOnchain",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxSupplyOfMasterEdition",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "concreteType": "CandyMachineExpress",
  "kind": "LinkedField",
  "name": "CandyMachine",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "__typename",
      "storageKey": null
    },
    (v3/*: any*/)
  ],
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "edition",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxSupply",
  "storageKey": null
},
v28 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numberOfStandardEditionsMinted",
  "storageKey": null
},
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "auctionEndTime",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "auctionHoldingPeriodEndTime",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isOffPlatform",
  "storageKey": null
},
v32 = [
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
v33 = {
  "alias": null,
  "args": null,
  "concreteType": "Price",
  "kind": "LinkedField",
  "name": "priceV2",
  "plural": false,
  "selections": (v32/*: any*/),
  "storageKey": null
},
v34 = {
  "alias": null,
  "args": null,
  "concreteType": "Price",
  "kind": "LinkedField",
  "name": "priceLastSoldV2",
  "plural": false,
  "selections": (v32/*: any*/),
  "storageKey": null
},
v35 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "scheduledAuctionTime",
  "storageKey": null
},
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numberOfBidsForCurrentAuction",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OpenBid",
        "kind": "LinkedField",
        "name": "openBids",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ActivityAuctionsOpenBids_OpenBid"
          }
        ],
        "storageKey": null
      },
      {
        "alias": "yourAuctions",
        "args": (v2/*: any*/),
        "concreteType": "MetadataAccount",
        "kind": "LinkedField",
        "name": "metadataAccounts",
        "plural": true,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ActivityAuctionsYourAuctions_MetadataAccount"
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
    "name": "ActivityAuctionsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "OpenBid",
        "kind": "LinkedField",
        "name": "openBids",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "metadataAccount",
            "plural": false,
            "selections": [
              (v3/*: any*/),
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "userId",
                    "variableName": "userId"
                  }
                ],
                "kind": "ScalarField",
                "name": "openBidStatus",
                "storageKey": null
              },
              (v4/*: any*/),
              (v5/*: any*/),
              (v6/*: any*/),
              (v7/*: any*/),
              (v8/*: any*/),
              (v9/*: any*/),
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
                  (v15/*: any*/),
                  (v10/*: any*/),
                  (v17/*: any*/),
                  (v18/*: any*/),
                  (v3/*: any*/),
                  (v19/*: any*/),
                  (v20/*: any*/),
                  (v21/*: any*/),
                  (v22/*: any*/),
                  (v23/*: any*/),
                  (v24/*: any*/),
                  (v25/*: any*/),
                  (v26/*: any*/),
                  (v27/*: any*/),
                  (v28/*: any*/),
                  (v29/*: any*/),
                  (v30/*: any*/),
                  (v31/*: any*/),
                  (v33/*: any*/),
                  (v34/*: any*/),
                  (v35/*: any*/)
                ],
                "storageKey": null
              },
              (v36/*: any*/),
              (v37/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": "yourAuctions",
        "args": (v2/*: any*/),
        "concreteType": "MetadataAccount",
        "kind": "LinkedField",
        "name": "metadataAccounts",
        "plural": true,
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
              (v29/*: any*/),
              (v3/*: any*/),
              (v14/*: any*/),
              (v15/*: any*/),
              (v10/*: any*/),
              (v17/*: any*/),
              (v18/*: any*/),
              (v19/*: any*/),
              (v20/*: any*/),
              (v21/*: any*/),
              (v22/*: any*/),
              (v23/*: any*/),
              (v24/*: any*/),
              (v25/*: any*/),
              (v26/*: any*/),
              (v27/*: any*/),
              (v28/*: any*/),
              (v30/*: any*/),
              (v31/*: any*/),
              (v33/*: any*/),
              (v34/*: any*/),
              (v35/*: any*/)
            ],
            "storageKey": null
          },
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          (v12/*: any*/),
          (v13/*: any*/),
          (v36/*: any*/),
          (v37/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d716f0c84ae589bcd021561dd3225aac",
    "id": null,
    "metadata": {},
    "name": "ActivityAuctionsQuery",
    "operationKind": "query",
    "text": "query ActivityAuctionsQuery(\n  $openBidsInput: OpenBidsInput!\n  $userId: String!\n  $yourAuctionsInput: MetadataAccountsInput!\n) {\n  openBids(input: $openBidsInput) {\n    ...ActivityAuctionsOpenBids_OpenBid\n  }\n  yourAuctions: metadataAccounts(input: $yourAuctionsInput) {\n    ...ActivityAuctionsYourAuctions_MetadataAccount\n    id\n  }\n}\n\nfragment ActivityAuctionsOpenBids_OpenBid on OpenBid {\n  metadataAccount {\n    id\n    openBidStatus(userId: $userId)\n  }\n  ...OpenBidCard_OpenBid\n}\n\nfragment ActivityAuctionsYourAuctions_MetadataAccount on MetadataAccount {\n  id\n  nft {\n    auctionEndTime\n    id\n  }\n  ...ListingCardForMetadata_MetadataAccount\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment OpenBidCard_OpenBid on OpenBid {\n  metadataAccount {\n    ...ListingCardForMetadata_MetadataAccount\n    openBidStatus(userId: $userId)\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "5f57dae476e40eaef0abd3bab1c58410";

export default node;
