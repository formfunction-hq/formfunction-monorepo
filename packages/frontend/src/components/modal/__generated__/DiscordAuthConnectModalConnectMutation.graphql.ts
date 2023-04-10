/**
 * @generated SignedSource<<26b7855a129e5bff7551113938f4f2d1>>
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
export type DiscordAuthConnectModalConnectMutation$variables = {
  input: ConnectSocialNetworkInput;
};
export type DiscordAuthConnectModalConnectMutation$data = {
  readonly connectSocialNetwork: {
    readonly authLink: string;
  };
};
export type DiscordAuthConnectModalConnectMutation = {
  response: DiscordAuthConnectModalConnectMutation$data;
  variables: DiscordAuthConnectModalConnectMutation$variables;
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
    "name": "DiscordAuthConnectModalConnectMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscordAuthConnectModalConnectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d45a67dc60c940db9ce3871536b90819",
    "id": null,
    "metadata": {},
    "name": "DiscordAuthConnectModalConnectMutation",
    "operationKind": "mutation",
    "text": "mutation DiscordAuthConnectModalConnectMutation(\n  $input: ConnectSocialNetworkInput!\n) {\n  connectSocialNetwork(input: $input) {\n    authLink\n  }\n}\n"
  }
};
})();

(node as any).hash = "05a5981b866c2130d293570b2690019e";

export default node;
