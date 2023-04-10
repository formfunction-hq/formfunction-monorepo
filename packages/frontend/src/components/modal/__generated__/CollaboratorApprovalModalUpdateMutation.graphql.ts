/**
 * @generated SignedSource<<47c1e4e47499814fa6a577291a577e89>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RequestStatus_enum = "Approved" | "Pending" | "Rejected" | "%future added value";
export type Request_set_input = {
  fromUserId?: string | null;
  id?: string | null;
  status?: RequestStatus_enum | null;
  timeCreated?: string | null;
  toUserId?: string | null;
};
export type Request_pk_columns_input = {
  id: string;
};
export type CollaboratorApprovalModalUpdateMutation$variables = {
  _set: Request_set_input;
  pk_columns: Request_pk_columns_input;
};
export type CollaboratorApprovalModalUpdateMutation$data = {
  readonly update_Request_by_pk: {
    readonly id: string;
  } | null;
};
export type CollaboratorApprovalModalUpdateMutation = {
  response: CollaboratorApprovalModalUpdateMutation$data;
  variables: CollaboratorApprovalModalUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "_set"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "pk_columns"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "_set",
        "variableName": "_set"
      },
      {
        "kind": "Variable",
        "name": "pk_columns",
        "variableName": "pk_columns"
      }
    ],
    "concreteType": "Request",
    "kind": "LinkedField",
    "name": "update_Request_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "CollaboratorApprovalModalUpdateMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CollaboratorApprovalModalUpdateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "123d89de6bea32add210948104cbea97",
    "id": null,
    "metadata": {},
    "name": "CollaboratorApprovalModalUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation CollaboratorApprovalModalUpdateMutation(\n  $_set: Request_set_input!\n  $pk_columns: Request_pk_columns_input!\n) {\n  update_Request_by_pk(_set: $_set, pk_columns: $pk_columns) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "59f5d42b581a8526bfbbfebd41c07a19";

export default node;
