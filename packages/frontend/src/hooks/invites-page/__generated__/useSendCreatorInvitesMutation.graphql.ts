/**
 * @generated SignedSource<<ae696587aebe873d32c7ee81d22cda6a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SendCreatorInvitesInput = {
  emails: ReadonlyArray<string>;
  userIdsOrUsernames: ReadonlyArray<string>;
};
export type useSendCreatorInvitesMutation$variables = {
  input: SendCreatorInvitesInput;
};
export type useSendCreatorInvitesMutation$data = {
  readonly sendCreatorInvites: {
    readonly convertedUserIds: ReadonlyArray<string>;
    readonly sentEmails: ReadonlyArray<string>;
  };
};
export type useSendCreatorInvitesMutation = {
  response: useSendCreatorInvitesMutation$data;
  variables: useSendCreatorInvitesMutation$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "SendCreatorInvitesResponse",
    "kind": "LinkedField",
    "name": "sendCreatorInvites",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "convertedUserIds",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "sentEmails",
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
    "name": "useSendCreatorInvitesMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSendCreatorInvitesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b06e226d678dd2b740f46990f66f4611",
    "id": null,
    "metadata": {},
    "name": "useSendCreatorInvitesMutation",
    "operationKind": "mutation",
    "text": "mutation useSendCreatorInvitesMutation(\n  $input: SendCreatorInvitesInput!\n) {\n  sendCreatorInvites(input: $input) {\n    convertedUserIds\n    sentEmails\n  }\n}\n"
  }
};
})();

(node as any).hash = "3d41f50163703d2ad69c105314054fc8";

export default node;
