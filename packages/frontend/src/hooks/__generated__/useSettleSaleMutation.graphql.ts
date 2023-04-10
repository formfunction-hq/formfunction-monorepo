/**
 * @generated SignedSource<<ceb2791ce54c25ba064052d1a020beb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
export type useSettleSaleMutation$variables = {
  buyer: string;
  connections: ReadonlyArray<string>;
  creator: string;
  currencyName?: CurrencyNameExpress_enum | null;
  mint: string;
  offerTransactionId?: string | null;
  price: number;
  seller: string;
  transactionType: NftTransactionTypeExpress_enum;
  txid: string;
};
export type useSettleSaleMutation$data = {
  readonly insertNftTransaction: {
    readonly transaction: {
      readonly " $fragmentSpreads": FragmentRefs<"NftTransaction_NftTransactionExpress">;
    };
    readonly updatedMetadataAccount: {
      readonly nft: {
        readonly priceLastSoldV2: {
          readonly amount: number;
          readonly currencyInfo: {
            readonly decimals: number;
            readonly shortSymbol: string | null;
            readonly symbol: string;
          };
        } | null;
      };
    };
  };
};
export type useSettleSaleMutation = {
  response: useSettleSaleMutation$data;
  variables: useSettleSaleMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "buyer"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "creator"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currencyName"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mint"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "offerTransactionId"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "price"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seller"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "transactionType"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "txid"
},
v10 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "creatorId",
        "variableName": "creator"
      },
      {
        "kind": "Variable",
        "name": "currencyName",
        "variableName": "currencyName"
      },
      {
        "kind": "Variable",
        "name": "fromUserId",
        "variableName": "seller"
      },
      {
        "kind": "Variable",
        "name": "mint",
        "variableName": "mint"
      },
      {
        "kind": "Variable",
        "name": "offerTransactionId",
        "variableName": "offerTransactionId"
      },
      {
        "kind": "Variable",
        "name": "price",
        "variableName": "price"
      },
      {
        "kind": "Variable",
        "name": "toUserId",
        "variableName": "buyer"
      },
      {
        "kind": "Variable",
        "name": "txid",
        "variableName": "txid"
      },
      {
        "kind": "Variable",
        "name": "type",
        "variableName": "transactionType"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "decimals",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortSymbol",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "symbol",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v16 = [
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
      (v15/*: any*/)
    ],
    "storageKey": null
  },
  (v15/*: any*/)
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
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSettleSaleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NftTransaction_NftTransactionExpress"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
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
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceLastSoldV2",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CurrencyExpress",
                        "kind": "LinkedField",
                        "name": "currencyInfo",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/)
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
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v7/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v9/*: any*/),
      (v1/*: any*/),
      (v8/*: any*/)
    ],
    "kind": "Operation",
    "name": "useSettleSaleMutation",
    "selections": [
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
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
                "kind": "ScalarField",
                "name": "fromAddress",
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
                  (v11/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CurrencyExpress",
                    "kind": "LinkedField",
                    "name": "currencyInfo",
                    "plural": false,
                    "selections": [
                      (v12/*: any*/),
                      (v15/*: any*/),
                      (v14/*: any*/),
                      (v13/*: any*/),
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
                "name": "toAddress",
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
                "name": "type",
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
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "To",
                "plural": false,
                "selections": (v16/*: any*/),
                "storageKey": null
              },
              (v15/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "transaction",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "NftTransactionsEdge"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
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
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceLastSoldV2",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CurrencyExpress",
                        "kind": "LinkedField",
                        "name": "currencyInfo",
                        "plural": false,
                        "selections": [
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v14/*: any*/),
                          (v15/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v15/*: any*/)
                ],
                "storageKey": null
              },
              (v15/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "233cbc08b16dd37920f8a3e55b9e2201",
    "id": null,
    "metadata": {},
    "name": "useSettleSaleMutation",
    "operationKind": "mutation",
    "text": "mutation useSettleSaleMutation(\n  $creator: String!\n  $currencyName: CurrencyNameExpress_enum\n  $buyer: String!\n  $seller: String!\n  $mint: String!\n  $offerTransactionId: String\n  $price: bigint!\n  $txid: String!\n  $transactionType: NftTransactionTypeExpress_enum!\n) {\n  insertNftTransaction(input: {creatorId: $creator, currencyName: $currencyName, fromUserId: $seller, toUserId: $buyer, mint: $mint, offerTransactionId: $offerTransactionId, price: $price, txid: $txid, type: $transactionType}) {\n    transaction {\n      ...NftTransaction_NftTransactionExpress\n      id\n    }\n    updatedMetadataAccount {\n      nft {\n        priceLastSoldV2 {\n          amount\n          currencyInfo {\n            decimals\n            shortSymbol\n            symbol\n            id\n          }\n        }\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment NftTransaction_NftTransactionExpress on NftTransactionExpress {\n  auctionCount\n  comment\n  fromAddress\n  nftInfo {\n    edition\n    maxSupply\n  }\n  price {\n    ...PriceWithSymbol_Price\n    ...useFormattedNftPrice_Price\n    currencyInfo {\n      name\n      id\n    }\n  }\n  source\n  timeCreated\n  toAddress\n  txid\n  type\n  usdPrice\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  To {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "da457b95bb18317556c0741666d2ac45";

export default node;
