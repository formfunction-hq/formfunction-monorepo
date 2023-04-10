/**
 * @generated SignedSource<<563cc739c9d546301713925d7e85f184>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ActivityNotification_set_input = {
  id?: string | null;
  nftId?: string | null;
  nftTransactionId?: string | null;
  notificationId?: string | null;
  timeCreated?: string | null;
  timeSeen?: string | null;
};
export type ActivityNotification_pk_columns_input = {
  id: string;
};
export type useUpdateActivityNotificationTimeSeenMutation$variables = {
  pkColumns: ActivityNotification_pk_columns_input;
  set: ActivityNotification_set_input;
};
export type useUpdateActivityNotificationTimeSeenMutation$data = {
  readonly update_ActivityNotification_by_pk: {
    readonly __typename: "ActivityNotification";
  } | null;
};
export type useUpdateActivityNotificationTimeSeenMutation = {
  response: useUpdateActivityNotificationTimeSeenMutation$data;
  variables: useUpdateActivityNotificationTimeSeenMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "pkColumns"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "set"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "_set",
        "variableName": "set"
      },
      {
        "kind": "Variable",
        "name": "pk_columns",
        "variableName": "pkColumns"
      }
    ],
    "concreteType": "ActivityNotification",
    "kind": "LinkedField",
    "name": "update_ActivityNotification_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
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
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useUpdateActivityNotificationTimeSeenMutation",
    "selections": (v2/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useUpdateActivityNotificationTimeSeenMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "f93b99c024ea07c457c74bfa0dd47d25",
    "id": null,
    "metadata": {},
    "name": "useUpdateActivityNotificationTimeSeenMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateActivityNotificationTimeSeenMutation(\n  $set: ActivityNotification_set_input!\n  $pkColumns: ActivityNotification_pk_columns_input!\n) {\n  update_ActivityNotification_by_pk(_set: $set, pk_columns: $pkColumns) {\n    __typename\n  }\n}\n"
  }
};
})();

(node as any).hash = "7afd83040078405bdf1b7239e2127562";

export default node;
