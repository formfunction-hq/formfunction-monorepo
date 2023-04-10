/**
 * @generated SignedSource<<1e3bbed9f15ae07f11d4993da2f0157b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
export type CreateReactionForPostInput = {
  postId: string;
  type: ReactionTypeExpress_enum;
};
export type PostReactionsCreateReactionMutation$variables = {
  input: CreateReactionForPostInput;
};
export type PostReactionsCreateReactionMutation$data = {
  readonly ReactionMutations: {
    readonly createReactionForPost: {
      readonly type: ReactionTypeExpress_enum;
    };
  };
};
export type PostReactionsCreateReactionMutation = {
  response: PostReactionsCreateReactionMutation$data;
  variables: PostReactionsCreateReactionMutation$variables;
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
        "concreteType": "CreateReactionForPostResponse",
        "kind": "LinkedField",
        "name": "createReactionForPost",
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
    "name": "PostReactionsCreateReactionMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostReactionsCreateReactionMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "c559a35f724250e3d2554beb9bc3fddb",
    "id": null,
    "metadata": {},
    "name": "PostReactionsCreateReactionMutation",
    "operationKind": "mutation",
    "text": "mutation PostReactionsCreateReactionMutation(\n  $input: CreateReactionForPostInput!\n) {\n  ReactionMutations {\n    createReactionForPost(input: $input) {\n      type\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cea58754a508591cdf8bae3d01a12b4b";

export default node;
