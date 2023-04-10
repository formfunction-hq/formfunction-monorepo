/**
 * @generated SignedSource<<2b22516bb0b04c1384ffdfd42127795f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RedirectLocation_enum = "Apply" | "EditProfile" | "Profile" | "%future added value";
export type SocialNetworkType_enum = "Discord" | "Instagram" | "Twitter" | "%future added value";
export type ConnectSocialNetworkInput = {
  redirectLocation?: RedirectLocation_enum | null;
  socialNetworkType: SocialNetworkType_enum;
  userId: string;
};
export type ConnectSocialNetworkButtonConnectMutation$variables = {
  input: ConnectSocialNetworkInput;
};
export type ConnectSocialNetworkButtonConnectMutation$data = {
  readonly connectSocialNetwork: {
    readonly authLink: string;
  };
};
export type ConnectSocialNetworkButtonConnectMutation = {
  response: ConnectSocialNetworkButtonConnectMutation$data;
  variables: ConnectSocialNetworkButtonConnectMutation$variables;
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
    "name": "connectSocialNetwork",
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
    "name": "ConnectSocialNetworkButtonConnectMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ConnectSocialNetworkButtonConnectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "1f943f417bd78a81996f6475ae40eb84",
    "id": null,
    "metadata": {},
    "name": "ConnectSocialNetworkButtonConnectMutation",
    "operationKind": "mutation",
    "text": "mutation ConnectSocialNetworkButtonConnectMutation(\n  $input: ConnectSocialNetworkInput!\n) {\n  connectSocialNetwork(input: $input) {\n    authLink\n  }\n}\n"
  }
};
})();

(node as any).hash = "c1eaf7631782045e5b436bd88f1c1a5b";

export default node;
