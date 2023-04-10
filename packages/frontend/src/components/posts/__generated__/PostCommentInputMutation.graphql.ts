/**
 * @generated SignedSource<<b475d13f0f621077305047b56f9cf464>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateCommentForPostInput = {
  comment: string;
  postId: string;
};
export type PostCommentInputMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreateCommentForPostInput;
};
export type PostCommentInputMutation$data = {
  readonly CommentMutations: {
    readonly createCommentForPost: {
      readonly comment: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"PostCommentForCommentExpress_CommentExpress">;
      };
    };
  };
};
export type PostCommentInputMutation = {
  response: PostCommentInputMutation$data;
  variables: PostCommentInputMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "connections"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PostCommentInputMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommentMutationsMutationResponse",
        "kind": "LinkedField",
        "name": "CommentMutations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CreateCommentForPostResponse",
            "kind": "LinkedField",
            "name": "createCommentForPost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommentExpress",
                "kind": "LinkedField",
                "name": "comment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "PostCommentForCommentExpress_CommentExpress"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PostCommentInputMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CommentMutationsMutationResponse",
        "kind": "LinkedField",
        "name": "CommentMutations",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CreateCommentForPostResponse",
            "kind": "LinkedField",
            "name": "createCommentForPost",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CommentExpress",
                "kind": "LinkedField",
                "name": "comment",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "comment",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "timeCreated",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "commenter",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhotoExpress",
                        "kind": "LinkedField",
                        "name": "ProfilePhoto",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "photoUrl",
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "appendNode",
                "key": "",
                "kind": "LinkedHandle",
                "name": "comment",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  },
                  {
                    "kind": "Literal",
                    "name": "edgeTypeName",
                    "value": "CommentsEdge"
                  }
                ]
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "3f1df668ba182b72200fca295a4682fa",
    "id": null,
    "metadata": {},
    "name": "PostCommentInputMutation",
    "operationKind": "mutation",
    "text": "mutation PostCommentInputMutation(\n  $input: CreateCommentForPostInput!\n) {\n  CommentMutations {\n    createCommentForPost(input: $input) {\n      comment {\n        id\n        ...PostCommentForCommentExpress_CommentExpress\n      }\n    }\n  }\n}\n\nfragment PostCommentForCommentExpress_CommentExpress on CommentExpress {\n  comment\n  timeCreated\n  commenter {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c3f8d19605f1af8d7a5e26265fc27b0";

export default node;
