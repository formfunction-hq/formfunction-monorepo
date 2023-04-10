/**
 * @generated SignedSource<<4cd2c2c4a7ab73014aa74b402408543b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type SocialNetworkType_enum = "Discord" | "Instagram" | "Twitter" | "%future added value";
export type DisconnectSocialNetworkInput = {
  socialNetworkType: SocialNetworkType_enum;
  userId: string;
};
export type ConnectSocialNetworkButtonDisconnectMutation$variables = {
  input: DisconnectSocialNetworkInput;
};
export type ConnectSocialNetworkButtonDisconnectMutation$data = {
  readonly disconnectSocialNetwork: {
    readonly authLink: string;
  };
};
export type ConnectSocialNetworkButtonDisconnectMutation = {
  response: ConnectSocialNetworkButtonDisconnectMutation$data;
  variables: ConnectSocialNetworkButtonDisconnectMutation$variables;
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
    "concreteType": "SocialNetwork",
    "kind": "LinkedField",
    "name": "disconnectSocialNetwork",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "authLink",
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
    "name": "ConnectSocialNetworkButtonDisconnectMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectSocialNetworkButtonDisconnectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0441421d32756d0d7bcb33fc5125dfcf",
    "id": null,
    "metadata": {},
    "name": "ConnectSocialNetworkButtonDisconnectMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectSocialNetworkButtonDisconnectMutation(\n  $input: DisconnectSocialNetworkInput!\n) {\n  disconnectSocialNetwork(input: $input) {\n    authLink\n  }\n}\n"
  }
};
})();

(node as any).hash = "8f00f1ff5cdf03b769569a332c76e50a";

export default node;
