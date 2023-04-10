/**
 * @generated SignedSource<<17d85c9fd9c69051ecc06d747050f0ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type AccountSetupModalContainerUserQuery$variables = {
  id: string;
};
export type AccountSetupModalContainerUserQuery$data = {
  readonly User_by_pk: {
    readonly hasCompletedSignup: boolean;
    readonly id: string;
  } | null;
};
export type AccountSetupModalContainerUserQuery = {
  response: AccountSetupModalContainerUserQuery$data;
  variables: AccountSetupModalContainerUserQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
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
        "name": "hasCompletedSignup",
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
    "name": "AccountSetupModalContainerUserQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AccountSetupModalContainerUserQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cc4fc23a054aa2cd5801ff01ef2dfa9d",
    "id": null,
    "metadata": {},
    "name": "AccountSetupModalContainerUserQuery",
    "operationKind": "query",
    "text": "query AccountSetupModalContainerUserQuery(\n  $id: String!\n) {\n  User_by_pk(id: $id) {\n    id\n    hasCompletedSignup\n  }\n}\n"
  }
};
})();

(node as any).hash = "6f56115f655f40123bc99c74778c80e4";

export default node;
