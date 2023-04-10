/**
 * @generated SignedSource<<32ee9e629554fbda437f01eb555cedba>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
export type NftTransactionsForImportInput = {
  mintAddress: string;
};
export type NftHistoryModalQuery$variables = {
  input: NftTransactionsForImportInput;
};
export type NftHistoryModalQuery$data = {
  readonly nftTransactionsForImport: {
    readonly transactions: ReadonlyArray<{
      readonly fromAddress: string;
      readonly toAddress: string;
      readonly type: NftTransactionTypeExpress_enum;
      readonly " $fragmentSpreads": FragmentRefs<"NftTransaction_NftTransactionExpress">;
    }>;
  };
};
export type NftHistoryModalQuery = {
  response: NftHistoryModalQuery$data;
  variables: NftHistoryModalQuery$variables;
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
  "name": "fromAddress",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "toAddress",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  },
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
      (v5/*: any*/)
    ],
    "storageKey": null
  },
  (v5/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "NftHistoryModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NftTransactionsForImportResponse",
        "kind": "LinkedField",
        "name": "nftTransactionsForImport",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transactions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NftTransaction_NftTransactionExpress"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "NftHistoryModalQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "NftTransactionsForImportResponse",
        "kind": "LinkedField",
        "name": "nftTransactionsForImport",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transactions",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "comment",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NftTransactionNftInfo",
                "kind": "LinkedField",
                "name": "nftInfo",
                "plural": false,
                "selections": [
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
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "price",
                "plural": false,
                "selections": [
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
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
                "name": "source",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "timeCreated",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "txid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "usdPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "From",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "To",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "bfc150ec5127029f3c4852aba6873a80",
    "id": null,
    "metadata": {},
    "name": "NftHistoryModalQuery",
    "operationKind": "query",
    "text": "query NftHistoryModalQuery(\n  $input: NftTransactionsForImportInput!\n) {\n  nftTransactionsForImport(input: $input) {\n    transactions {\n      fromAddress\n      toAddress\n      type\n      ...NftTransaction_NftTransactionExpress\n      id\n    }\n  }\n}\n\nfragment NftTransaction_NftTransactionExpress on NftTransactionExpress {\n  auctionCount\n  comment\n  fromAddress\n  nftInfo {\n    edition\n    maxSupply\n  }\n  price {\n    ...PriceWithSymbol_Price\n    ...useFormattedNftPrice_Price\n    currencyInfo {\n      name\n      id\n    }\n  }\n  source\n  timeCreated\n  toAddress\n  txid\n  type\n  usdPrice\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  To {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "906cab61531a0defd45509d961285984";

export default node;
