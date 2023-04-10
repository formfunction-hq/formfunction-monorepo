/**
 * @generated SignedSource<<0009aedf18ad05daf0aa24446b29157b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type MakeAnOfferModalNftOwnerQuery$variables = {
  mint: string;
};
export type MakeAnOfferModalNftOwnerQuery$data = {
  readonly Nft: ReadonlyArray<{
    readonly ownerId: string;
  }>;
};
export type MakeAnOfferModalNftOwnerQuery = {
  response: MakeAnOfferModalNftOwnerQuery$data;
  variables: MakeAnOfferModalNftOwnerQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "mint"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_eq",
                "variableName": "mint"
              }
            ],
            "kind": "ObjectValue",
            "name": "mint"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Nft",
    "kind": "LinkedField",
    "name": "Nft",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "ownerId",
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
    "name": "MakeAnOfferModalNftOwnerQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MakeAnOfferModalNftOwnerQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "640b0ffd45d3cb95dd3da8cc03100a85",
    "id": null,
    "metadata": {},
    "name": "MakeAnOfferModalNftOwnerQuery",
    "operationKind": "query",
    "text": "query MakeAnOfferModalNftOwnerQuery(\n  $mint: String!\n) {\n  Nft(where: {mint: {_eq: $mint}}) {\n    ownerId\n  }\n}\n"
  }
};
})();

(node as any).hash = "bcc0293b9f8462d1a74395aac7a555b7";

export default node;
