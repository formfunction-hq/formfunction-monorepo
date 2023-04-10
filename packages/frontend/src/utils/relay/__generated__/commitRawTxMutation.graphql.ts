/**
 * @generated SignedSource<<abdb7726f8133a774e9a2c6d91938ec3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type commitRawTxMutation$variables = {
  extraData?: string | null;
  mint: string;
  txid: string;
  type: string;
};
export type commitRawTxMutation$data = {
  readonly insert_NftTransactionRaw_one: {
    readonly mint: string;
    readonly txid: string;
  } | null;
};
export type commitRawTxMutation = {
  response: commitRawTxMutation$data;
  variables: commitRawTxMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "extraData"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mint"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "txid"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v4 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "extraData",
            "variableName": "extraData"
          },
          {
            "kind": "Variable",
            "name": "mint",
            "variableName": "mint"
          },
          {
            "kind": "Variable",
            "name": "txid",
            "variableName": "txid"
          },
          {
            "kind": "Variable",
            "name": "type",
            "variableName": "type"
          }
        ],
        "kind": "ObjectValue",
        "name": "object"
      }
    ],
    "concreteType": "NftTransactionRaw",
    "kind": "LinkedField",
    "name": "insert_NftTransactionRaw_one",
    "plural": false,
    "selections": [
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
        "name": "mint",
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
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "commitRawTxMutation",
    "selections": (v4/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "commitRawTxMutation",
    "selections": (v4/*: any*/)
  },
  "params": {
    "cacheID": "e65b615aaa0fc25e24da6718af026004",
    "id": null,
    "metadata": {},
    "name": "commitRawTxMutation",
    "operationKind": "mutation",
    "text": "mutation commitRawTxMutation(\n  $txid: String!\n  $type: String!\n  $mint: String!\n  $extraData: String\n) {\n  insert_NftTransactionRaw_one(object: {txid: $txid, type: $type, mint: $mint, extraData: $extraData}) {\n    txid\n    mint\n  }\n}\n"
  }
};
})();

(node as any).hash = "de69a3bba807c28d5d90ab03a8a6d3cc";

export default node;
