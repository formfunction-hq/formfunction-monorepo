/**
 * @generated SignedSource<<fb3deb00833bbdf140ccbc67b4c3cf18>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
export type DeleteReactionForPostInput = {
  postId: string;
};
export type PostReactionsDeleteReactionMutation$variables = {
  input: DeleteReactionForPostInput;
};
export type PostReactionsDeleteReactionMutation$data = {
  readonly ReactionMutations: {
    readonly deleteReactionForPost: {
      readonly type: ReactionTypeExpress_enum;
    };
  };
};
export type PostReactionsDeleteReactionMutation = {
  response: PostReactionsDeleteReactionMutation$data;
  variables: PostReactionsDeleteReactionMutation$variables;
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
    "args": null,
    "concreteType": "ReactionMutationsMutationResponse",
    "kind": "LinkedField",
    "name": "ReactionMutations",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "DeleteReactionForPostResponse",
        "kind": "LinkedField",
        "name": "deleteReactionForPost",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "type",
            "storageKey": null
          }
        ],
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
    "name": "PostReactionsDeleteReactionMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostReactionsDeleteReactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9b96d06e7828a826ba06bff61ea7769c",
    "id": null,
    "metadata": {},
    "name": "PostReactionsDeleteReactionMutation",
    "operationKind": "mutation",
    "text": "mutation PostReactionsDeleteReactionMutation(\n  $input: DeleteReactionForPostInput!\n) {\n  ReactionMutations {\n    deleteReactionForPost(input: $input) {\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "957c108037666863a8aa66c0c66c27d6";

export default node;
