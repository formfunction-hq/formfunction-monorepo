/**
 * @generated SignedSource<<03d34c8f533b422852b337c8c542ac87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useNftPageOfferTxs_Query$data = {
  readonly nftOffers: {
    readonly nftOffers: {
      readonly __id: string;
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly expirationDate: string;
          readonly isValid: boolean;
          readonly transaction: {
            readonly fromAddress: string;
            readonly id: string;
            readonly toAddress: string;
            readonly type: NftTransactionTypeExpress_enum;
            readonly " $fragmentSpreads": FragmentRefs<"CancelOfferModal_NftTransactionExpress" | "NftOffer_NftTransactionExpress">;
          };
        };
      }>;
    };
  };
  readonly " $fragmentType": "useNftPageOfferTxs_Query";
};
export type useNftPageOfferTxs_Query$key = {
  readonly " $data"?: useNftPageOfferTxs_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNftPageOfferTxs_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "nftOffers",
  "nftOffers"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./NftOfferTransactionsPaginationQuery.graphql')
    }
  },
  "name": "useNftPageOfferTxs_Query",
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
          "alias": "nftOffers",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "input"
            }
          ],
          "concreteType": "NftOffersConnection",
          "kind": "LinkedField",
          "name": "__NftOffers_Query_nftOffers_connection",
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
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "id",
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
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "NftOffer_NftTransactionExpress"
                        },
                        {
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "CancelOfferModal_NftTransactionExpress"
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "query_root",
  "abstractKey": null
};
})();

(node as any).hash = "dd1fc1f7ef938d16fd65f597e9faab70";

export default node;
