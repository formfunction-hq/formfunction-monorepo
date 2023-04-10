/**
 * @generated SignedSource<<60159b8508b7b1ee07d2d5529cca9488>>
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
export type DiscordAuthDisconnectModalDisconnectMutation$variables = {
  input: DisconnectSocialNetworkInput;
};
export type DiscordAuthDisconnectModalDisconnectMutation$data = {
  readonly disconnectSocialNetwork: {
    readonly authLink: string;
  };
};
export type DiscordAuthDisconnectModalDisconnectMutation = {
  response: DiscordAuthDisconnectModalDisconnectMutation$data;
  variables: DiscordAuthDisconnectModalDisconnectMutation$variables;
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
    "name": "DiscordAuthDisconnectModalDisconnectMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DiscordAuthDisconnectModalDisconnectMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "df576ac6c34b4e87ab51abf94c80f290",
    "id": null,
    "metadata": {},
    "name": "DiscordAuthDisconnectModalDisconnectMutation",
    "operationKind": "mutation",
    "text": "mutation DiscordAuthDisconnectModalDisconnectMutation(\n  $input: DisconnectSocialNetworkInput!\n) {\n  disconnectSocialNetwork(input: $input) {\n    authLink\n  }\n}\n"
  }
};
})();

(node as any).hash = "425cc7e8ae87babe76ab8d6162ee5132";

export default node;
