/**
 * @generated SignedSource<<ed308412c61aa72d0ecd5cbae6c2d61b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DiscordAuthConnectModalCheckJoinedDiscordMutation$variables = {};
export type DiscordAuthConnectModalCheckJoinedDiscordMutation$data = {
  readonly updateDiscordRolesForUser: {
    readonly __typename: "UpdateDiscordRolesForUserResponseFailure";
    readonly reason: string;
  } | {
    readonly __typename: "UpdateDiscordRolesForUserResponseSuccess";
    readonly roleIds: ReadonlyArray<string>;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
};
export type DiscordAuthConnectModalCheckJoinedDiscordMutation = {
  response: DiscordAuthConnectModalCheckJoinedDiscordMutation$data;
  variables: DiscordAuthConnectModalCheckJoinedDiscordMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": null,
    "kind": "LinkedField",
    "name": "updateDiscordRolesForUser",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "__typename",
        "storageKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "roleIds",
            "storageKey": null
          }
        ],
        "type": "UpdateDiscordRolesForUserResponseSuccess",
        "abstractKey": null
      },
      {
        "kind": "InlineFragment",
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "reason",
            "storageKey": null
          }
        ],
        "type": "UpdateDiscordRolesForUserResponseFailure",
        "abstractKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "DiscordAuthConnectModalCheckJoinedDiscordMutation",
    "selections": (v0/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "DiscordAuthConnectModalCheckJoinedDiscordMutation",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6fe030a480a767e6ca453e71804d2a05",
    "id": null,
    "metadata": {},
    "name": "DiscordAuthConnectModalCheckJoinedDiscordMutation",
    "operationKind": "mutation",
    "text": "mutation DiscordAuthConnectModalCheckJoinedDiscordMutation {\n  updateDiscordRolesForUser {\n    __typename\n    ... on UpdateDiscordRolesForUserResponseSuccess {\n      roleIds\n    }\n    ... on UpdateDiscordRolesForUserResponseFailure {\n      reason\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "388fa7e24ecc3c5f630c16869c776494";

export default node;
