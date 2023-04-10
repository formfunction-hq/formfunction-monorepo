/**
 * @generated SignedSource<<835a1e63cd9428f9cc27875b6da5dce6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type ProfileButtonQuery$variables = {
  id: string;
};
export type ProfileButtonQuery$data = {
  readonly User_by_pk: {
    readonly ProfilePhoto: {
      readonly id: string;
      readonly photoUrl: string;
    } | null;
    readonly id: string;
  } | null;
};
export type ProfileButtonQuery = {
  response: ProfileButtonQuery$data;
  variables: ProfileButtonQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "User_by_pk",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "ProfilePhoto",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "photoUrl",
            "storageKey": null
          }
        ],
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
    "name": "ProfileButtonQuery",
    "selections": (v2/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ProfileButtonQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f1bef3c9585d0b945a6e4d6494a069c5",
    "id": null,
    "metadata": {},
    "name": "ProfileButtonQuery",
    "operationKind": "query",
    "text": "query ProfileButtonQuery(\n  $id: String!\n) {\n  User_by_pk(id: $id) {\n    id\n    ProfilePhoto {\n      id\n      photoUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "62e2f2e201ff6b914a9361836601a442";

export default node;
