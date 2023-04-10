/**
 * @generated SignedSource<<3b13569a7e85dbdc4b4f9637f2f246b1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOffersInput = {
  mint: string;
  viewerId?: string | null;
};
export type useNftPageOfferTxsQuery$variables = {
  after?: string | null;
  first: number;
  input: NftOffersInput;
};
export type useNftPageOfferTxsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useNftPageOfferTxs_Query">;
};
export type useNftPageOfferTxsQuery = {
  response: useNftPageOfferTxsQuery$data;
  variables: useNftPageOfferTxsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNftPageOfferTxsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "useNftPageOfferTxs_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useNftPageOfferTxsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NftOffersResponse",
        "kind": "LinkedField",
        "name": "nftOffers",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "NftOffersConnection",
            "kind": "LinkedField",
            "name": "nftOffers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftOffersEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftOffer",
                    "kind": "LinkedField",
                    "name": "node",
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
                          (v2/*: any*/),
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
                            "kind": "ScalarField",
                            "name": "toAddress",
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
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "To",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "From",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
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
                                    "name": "name",
                                    "storageKey": null
                                  },
                                  (v2/*: any*/),
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
                            "name": "comment",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "timeCreated",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "expirationDate",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "isValid",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
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
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "input"
            ],
            "handle": "connection",
            "key": "NftOffers_Query_nftOffers",
            "kind": "LinkedHandle",
            "name": "nftOffers"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "485a82a5909872264c238baffe264ea7",
    "id": null,
    "metadata": {},
    "name": "useNftPageOfferTxsQuery",
    "operationKind": "query",
    "text": "query useNftPageOfferTxsQuery(\n  $after: String\n  $first: Int!\n  $input: NftOffersInput!\n) {\n  ...useNftPageOfferTxs_Query\n}\n\nfragment AcceptOfferModal_NftTransactionExpress on NftTransactionExpress {\n  id\n  price {\n    amount\n    currencyInfo {\n      name\n      id\n    }\n    ...useAuctionHouseSdkForPrice_Price\n    ...useFormattedNftPrice_Price\n    ...useNftPriceSymbol_Price\n  }\n  From {\n    id\n    username\n    ...SettleSaleModalContent_UserExpress\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment CancelOfferModal_NftTransactionExpress on NftTransactionExpress {\n  id\n  txid\n  price {\n    amount\n    ...useAuctionHouseSdkForPrice_Price\n  }\n}\n\nfragment NftOfferGeneric_NftTransactionExpress on NftTransactionExpress {\n  comment\n  fromAddress\n  price {\n    ...PriceWithSymbol_Price\n  }\n  timeCreated\n  txid\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment NftOffer_NftTransactionExpress on NftTransactionExpress {\n  To {\n    id\n  }\n  From {\n    id\n  }\n  ...AcceptOfferModal_NftTransactionExpress\n  ...CancelOfferModal_NftTransactionExpress\n  ...NftOfferGeneric_NftTransactionExpress\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment SettleSaleModalContent_UserExpress on UserExpress {\n  ...ArtistPillButtonForUserExpress_UserExpress\n}\n\nfragment useAuctionHouseSdkForPrice_Price on Price {\n  currencyInfo {\n    name\n    id\n  }\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftPageOfferTxs_Query on query_root {\n  nftOffers {\n    nftOffers(after: $after, first: $first, input: $input) {\n      edges {\n        node {\n          transaction {\n            id\n            fromAddress\n            toAddress\n            type\n            ...NftOffer_NftTransactionExpress\n            ...CancelOfferModal_NftTransactionExpress\n          }\n          expirationDate\n          isValid\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "644972b8ec36d84299196edf08c793fb";

export default node;
