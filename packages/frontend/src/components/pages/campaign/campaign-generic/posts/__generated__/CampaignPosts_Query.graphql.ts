/**
 * @generated SignedSource<<24b1a1c47748f12a5ab97488f2d4ccfa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignPosts_Query$data = {
  readonly PostsNamespace: {
    readonly postsForCampaign: {
      readonly posts: {
        readonly __id: string;
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly __typename: "PostTextOnly";
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"PostForPostTextOnly_PostTextOnly">;
          } | {
            readonly __typename: "PostWithAirdrop";
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithAirdrop_PostWithAirdrop">;
          } | {
            readonly __typename: "PostWithPoll";
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithPoll_PostWithPoll">;
          } | {
            readonly __typename: "PostWithSingleAsset";
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithSingleAsset_PostWithSingleAsset">;
          } | {
            // This will never be '%other', but we need some
            // value in case none of the concrete values match.
            readonly __typename: "%other";
          };
        }>;
      };
    };
  };
  readonly " $fragmentType": "CampaignPosts_Query";
};
export type CampaignPosts_Query$key = {
  readonly " $data"?: CampaignPosts_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignPosts_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "PostsNamespace",
  "postsForCampaign",
  "posts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
      "operation": require('./CampaignCommunityPostsPaginationQuery.graphql')
    }
  },
  "name": "CampaignPosts_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "PostsNamespaceQueryResponse",
      "kind": "LinkedField",
      "name": "PostsNamespace",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "PostsForCampaignResponse",
          "kind": "LinkedField",
          "name": "postsForCampaign",
          "plural": false,
          "selections": [
            {
              "alias": "posts",
              "args": [
                {
                  "kind": "Variable",
                  "name": "input",
                  "variableName": "input"
                }
              ],
              "concreteType": "PostsConnection",
              "kind": "LinkedField",
              "name": "__CampaignCommunityPosts_Query_posts_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PostsEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "node",
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
                            (v1/*: any*/),
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "PostForPostTextOnly_PostTextOnly"
                            }
                          ],
                          "type": "PostTextOnly",
                          "abstractKey": null
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            (v1/*: any*/),
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "PostForPostWithSingleAsset_PostWithSingleAsset"
                            }
                          ],
                          "type": "PostWithSingleAsset",
                          "abstractKey": null
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            (v1/*: any*/),
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "PostForPostWithPoll_PostWithPoll"
                            }
                          ],
                          "type": "PostWithPoll",
                          "abstractKey": null
                        },
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            (v1/*: any*/),
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "PostForPostWithAirdrop_PostWithAirdrop"
                            }
                          ],
                          "type": "PostWithAirdrop",
                          "abstractKey": null
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

(node as any).hash = "8da49827dfaa008fb5444f9f2b793e59";

export default node;
