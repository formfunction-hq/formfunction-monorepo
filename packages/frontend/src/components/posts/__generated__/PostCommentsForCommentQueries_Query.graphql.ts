/**
 * @generated SignedSource<<c6ea1d49633590979434cd448baaaf6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCommentsForCommentQueries_Query$data = {
  readonly CommentQueries: {
    readonly commentsForPost: {
      readonly comments: {
        readonly __id: string;
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly timeCreated: string;
            readonly " $fragmentSpreads": FragmentRefs<"PostCommentForCommentExpress_CommentExpress">;
          };
        }>;
      };
    };
  };
  readonly " $fragmentType": "PostCommentsForCommentQueries_Query";
};
export type PostCommentsForCommentQueries_Query$key = {
  readonly " $data"?: PostCommentsForCommentQueries_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCommentsForCommentQueries_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "CommentQueries",
  "commentsForPost",
  "comments"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./PostCommentsForCommentQueriesPaginationQuery.graphql')
    }
  },
  "name": "PostCommentsForCommentQueries_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CommentQueriesResponse",
      "kind": "LinkedField",
      "name": "CommentQueries",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CommentsForPostResponse",
          "kind": "LinkedField",
          "name": "commentsForPost",
          "plural": false,
          "selections": [
            {
              "alias": "comments",
              "args": [
                {
                  "kind": "Variable",
                  "name": "input",
                  "variableName": "input"
                }
              ],
              "concreteType": "CommentsConnection",
              "kind": "LinkedField",
              "name": "__PostCommentsForCommentQueries_Query_comments_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CommentsEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CommentExpress",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "id",
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
                          "args": null,
                          "kind": "FragmentSpread",
                          "name": "PostCommentForCommentExpress_CommentExpress"
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "__typename",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "cursor",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PageInfo",
                  "kind": "LinkedField",
                  "name": "pageInfo",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "endCursor",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "hasNextPage",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "kind": "ClientExtension",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__id",
                      "storageKey": null
                    }
                  ]
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
  "type": "query_root",
  "abstractKey": null
};
})();

(node as any).hash = "14562cb3329dc701f413f9701273dc82";

export default node;
