/**
 * @generated SignedSource<<78e5de31df2ac0068059c55d702a61c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AcceptCreatorInviteInput = {
  inviteLinkToken: string;
  username: string;
};
export type AcceptInviteAccountSetupModalMutation$variables = {
  input: AcceptCreatorInviteInput;
};
export type AcceptInviteAccountSetupModalMutation$data = {
  readonly acceptCreatorInvite: {
    readonly username: string;
  };
};
export type AcceptInviteAccountSetupModalMutation = {
  response: AcceptInviteAccountSetupModalMutation$data;
  variables: AcceptInviteAccountSetupModalMutation$variables;
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
    "concreteType": "AcceptCreatorInviteResponse",
    "kind": "LinkedField",
    "name": "acceptCreatorInvite",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "username",
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
    "name": "AcceptInviteAccountSetupModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AcceptInviteAccountSetupModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "6a1e37e44911269ed6e018168926d296",
    "id": null,
    "metadata": {},
    "name": "AcceptInviteAccountSetupModalMutation",
    "operationKind": "mutation",
    "text": "mutation AcceptInviteAccountSetupModalMutation(\n  $input: AcceptCreatorInviteInput!\n) {\n  acceptCreatorInvite(input: $input) {\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "7f598def17017814fc3e84cfac0a23e1";

export default node;
