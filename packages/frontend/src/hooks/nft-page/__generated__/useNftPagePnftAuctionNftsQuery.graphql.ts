/**
 * @generated SignedSource<<a8a28ea8af05a478ca0cdbe1583a68f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type PnftAuctionNftsInput = {
  masterEditionPnftId: string;
};
export type useNftPagePnftAuctionNftsQuery$variables = {
  input: PnftAuctionNftsInput;
};
export type useNftPagePnftAuctionNftsQuery$data = {
  readonly pnftAuctionNfts: {
    readonly metadataAccounts: ReadonlyArray<{
      readonly assetHeight: number | null;
      readonly assetWidth: number | null;
      readonly data: {
        readonly name: string;
      };
      readonly id: string;
      readonly nft: {
        readonly Creator: {
          readonly username: string;
        } | null;
        readonly mint: string;
      };
    }>;
  };
};
export type useNftPagePnftAuctionNftsQuery = {
  response: useNftPagePnftAuctionNftsQuery$data;
  variables: useNftPagePnftAuctionNftsQuery$variables;
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
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
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
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNftPagePnftAuctionNftsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PnftAuctionNftsResponse",
        "kind": "LinkedField",
        "name": "pnftAuctionNfts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "metadataAccounts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Creator",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v7/*: any*/)
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
    "name": "useNftPagePnftAuctionNftsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "PnftAuctionNftsResponse",
        "kind": "LinkedField",
        "name": "pnftAuctionNfts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "metadataAccounts",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Creator",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/),
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              (v7/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "fe9261760cdf5d8d232b62bb6f63d0ec",
    "id": null,
    "metadata": {},
    "name": "useNftPagePnftAuctionNftsQuery",
    "operationKind": "query",
    "text": "query useNftPagePnftAuctionNftsQuery(\n  $input: PnftAuctionNftsInput!\n) {\n  pnftAuctionNfts(input: $input) {\n    metadataAccounts {\n      id\n      assetHeight\n      assetWidth\n      nft {\n        mint\n        Creator {\n          username\n          id\n        }\n        id\n      }\n      data {\n        name\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "6df9a39aba35917807e66989c69519cd";

export default node;
