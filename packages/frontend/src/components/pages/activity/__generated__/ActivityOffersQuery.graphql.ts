/**
 * @generated SignedSource<<7b7e78be9d46c67f19e387b002ab9fe2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOfferForUserKind = "Made" | "Received" | "%future added value";
export type NftOffersForUserInput = {
  kinds: ReadonlyArray<NftOfferForUserKind>;
  userId: string;
};
export type ActivityOffersQuery$variables = {
  offersMadeInput: NftOffersForUserInput;
  offersReceivedInput: NftOffersForUserInput;
};
export type ActivityOffersQuery$data = {
  readonly offersMade: {
    readonly nftOffers: {
      readonly edges: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"ActivityOffersMade_NftOffersForUserEdge">;
      }>;
    };
  };
  readonly offersReceived: {
    readonly nftOffers: {
      readonly edges: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"ActivityOffersReceived_NftOffersForUserEdge">;
      }>;
    };
  };
};
export type ActivityOffersQuery = {
  response: ActivityOffersQuery$data;
  variables: ActivityOffersQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offersMadeInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offersReceivedInput"
  }
],
v1 = {
  "kind": "Literal",
  "name": "first",
  "value": 200
},
v2 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "offersMadeInput"
  }
],
v3 = [
  (v1/*: any*/),
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "offersReceivedInput"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "expirationDate",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isValid",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = [
  (v6/*: any*/),
  (v7/*: any*/)
],
v9 = {
  "alias": null,
  "args": null,
  "concreteType": "MetadataAccount",
  "kind": "LinkedField",
  "name": "metadataAccount",
  "plural": false,
  "selections": [
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
      "name": "mint",
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
          "name": "masterEditionMint",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": (v8/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Owner",
          "plural": false,
          "selections": (v8/*: any*/),
          "storageKey": null
        },
        (v7/*: any*/)
      ],
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
    (v7/*: any*/)
  ],
  "storageKey": null
},
v10 = {
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
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "From",
      "plural": false,
      "selections": [
        (v7/*: any*/),
        (v6/*: any*/),
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
            (v7/*: any*/)
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
            (v7/*: any*/),
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
    (v7/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityOffersQuery",
    "selections": [
      {
        "alias": "offersMade",
        "args": null,
        "concreteType": "NftOffersForUserResponse",
        "kind": "LinkedField",
        "name": "nftOffersForUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "NftOffersForUserConnection",
            "kind": "LinkedField",
            "name": "nftOffers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftOffersForUserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ActivityOffersMade_NftOffersForUserEdge"
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
        "alias": "offersReceived",
        "args": null,
        "concreteType": "NftOffersForUserResponse",
        "kind": "LinkedField",
        "name": "nftOffersForUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "NftOffersForUserConnection",
            "kind": "LinkedField",
            "name": "nftOffers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftOffersForUserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ActivityOffersReceived_NftOffersForUserEdge"
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
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivityOffersQuery",
    "selections": [
      {
        "alias": "offersMade",
        "args": null,
        "concreteType": "NftOffersForUserResponse",
        "kind": "LinkedField",
        "name": "nftOffersForUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "NftOffersForUserConnection",
            "kind": "LinkedField",
            "name": "nftOffers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftOffersForUserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftOfferForUser",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
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
        "alias": "offersReceived",
        "args": null,
        "concreteType": "NftOffersForUserResponse",
        "kind": "LinkedField",
        "name": "nftOffersForUser",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "NftOffersForUserConnection",
            "kind": "LinkedField",
            "name": "nftOffers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftOffersForUserEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftOfferForUser",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v4/*: any*/),
                      (v9/*: any*/),
                      (v10/*: any*/)
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
    ]
  },
  "params": {
    "cacheID": "b1fa2db927da0c6d653171d6b066488c",
    "id": null,
    "metadata": {},
    "name": "ActivityOffersQuery",
    "operationKind": "query",
    "text": "query ActivityOffersQuery(\n  $offersMadeInput: NftOffersForUserInput!\n  $offersReceivedInput: NftOffersForUserInput!\n) {\n  offersMade: nftOffersForUser {\n    nftOffers(first: 200, input: $offersMadeInput) {\n      edges {\n        ...ActivityOffersMade_NftOffersForUserEdge\n      }\n    }\n  }\n  offersReceived: nftOffersForUser {\n    nftOffers(first: 200, input: $offersReceivedInput) {\n      edges {\n        ...ActivityOffersReceived_NftOffersForUserEdge\n      }\n    }\n  }\n}\n\nfragment ActivityOffersMade_NftOffersForUserEdge on NftOffersForUserEdge {\n  node {\n    ...NftOfferForActivity_NftOfferForUser\n  }\n}\n\nfragment ActivityOffersReceived_NftOffersForUserEdge on NftOffersForUserEdge {\n  node {\n    isValid\n    ...NftOfferForActivity_NftOfferForUser\n  }\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment NftOfferForActivity_NftOfferForUser on NftOfferForUser {\n  expirationDate\n  isValid\n  metadataAccount {\n    ...useNftLinkForMetadataAccount_MetadataAccount\n    ...NftAssetForMetadataAccount_MetadataAccount\n    id\n  }\n  transaction {\n    From {\n      id\n    }\n    ...NftOfferGeneric_NftTransactionExpress\n    id\n  }\n}\n\nfragment NftOfferGeneric_NftTransactionExpress on NftTransactionExpress {\n  comment\n  fromAddress\n  price {\n    ...PriceWithSymbol_Price\n  }\n  timeCreated\n  txid\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "58d0c5c7eeec80471d59a0b4e626171b";

export default node;
