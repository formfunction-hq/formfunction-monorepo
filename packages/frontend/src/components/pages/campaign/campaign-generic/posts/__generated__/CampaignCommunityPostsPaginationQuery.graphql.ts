/**
 * @generated SignedSource<<444e668c323b9a9e019c6469a77a815c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostsForCampaignInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
  viewerId?: string | null;
};
export type CampaignCommunityPostsPaginationQuery$variables = {
  after?: string | null;
  first: number;
  input: PostsForCampaignInput;
};
export type CampaignCommunityPostsPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CampaignPosts_Query">;
};
export type CampaignCommunityPostsPaginationQuery = {
  response: CampaignCommunityPostsPaginationQuery$data;
  variables: CampaignCommunityPostsPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
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
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
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
  "name": "__typename",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "concreteType": "Reactions",
  "kind": "LinkedField",
  "name": "reactions",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerReactionType",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeCreated",
  "storageKey": null
},
v9 = [
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
      (v3/*: any*/)
    ],
    "storageKey": null
  },
  (v3/*: any*/)
],
v10 = {
  "alias": null,
  "args": null,
  "concreteType": "PostComments",
  "kind": "LinkedField",
  "name": "comments",
  "plural": false,
  "selections": [
    (v6/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CommentExpress",
      "kind": "LinkedField",
      "name": "previewComments",
      "plural": true,
      "selections": [
        (v3/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "comment",
          "storageKey": null
        },
        (v8/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "commenter",
          "plural": false,
          "selections": (v9/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "creator",
  "plural": false,
  "selections": (v9/*: any*/),
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibility",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "visibilityFundingTiers",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v4/*: any*/)
      ],
      "type": "ICampaignFundingTier",
      "abstractKey": "__isICampaignFundingTier"
    },
    {
      "kind": "InlineFragment",
      "selections": [
        (v3/*: any*/)
      ],
      "type": "CampaignFundingTierStandard",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v15 = {
  "alias": null,
  "args": null,
  "concreteType": "Link",
  "kind": "LinkedField",
  "name": "link",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    (v14/*: any*/)
  ],
  "storageKey": null
},
v16 = {
  "kind": "InlineFragment",
  "selections": [
    (v8/*: any*/),
    (v11/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v15/*: any*/)
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "concreteType": "AssetDarkModeInfo",
  "kind": "LinkedField",
  "name": "darkModeInfo",
  "plural": false,
  "selections": [
    (v18/*: any*/)
  ],
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v21 = [
  (v17/*: any*/),
  (v18/*: any*/),
  (v19/*: any*/),
  (v20/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignCommunityPostsPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CampaignPosts_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignCommunityPostsPaginationQuery",
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
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "PostsConnection",
                "kind": "LinkedField",
                "name": "posts",
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
                          (v2/*: any*/),
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              (v7/*: any*/),
                              (v10/*: any*/),
                              (v16/*: any*/)
                            ],
                            "type": "PostTextOnly",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v5/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "AssetExpress",
                                "kind": "LinkedField",
                                "name": "asset",
                                "plural": false,
                                "selections": (v21/*: any*/),
                                "storageKey": null
                              },
                              (v7/*: any*/),
                              (v10/*: any*/),
                              (v16/*: any*/)
                            ],
                            "type": "PostWithSingleAsset",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              (v4/*: any*/),
                              (v7/*: any*/),
                              (v10/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PollExpress",
                                "kind": "LinkedField",
                                "name": "poll",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "PollOptionExpress",
                                    "kind": "LinkedField",
                                    "name": "options",
                                    "plural": true,
                                    "selections": [
                                      (v3/*: any*/),
                                      (v14/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "responseCount",
                                        "storageKey": null
                                      },
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "viewerRespondedToPollOption",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "totalResponses",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "viewerRespondedToPoll",
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "isMultiSelect",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": "pollAsset",
                                "args": null,
                                "concreteType": "AssetExpress",
                                "kind": "LinkedField",
                                "name": "asset",
                                "plural": false,
                                "selections": (v21/*: any*/),
                                "storageKey": null
                              },
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v8/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  (v13/*: any*/)
                                ],
                                "type": "IPost",
                                "abstractKey": "__isIPost"
                              }
                            ],
                            "type": "PostWithPoll",
                            "abstractKey": null
                          },
                          {
                            "kind": "InlineFragment",
                            "selections": [
                              (v3/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "NftAsset",
                                "kind": "LinkedField",
                                "name": "nftAsset",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "AssetExpress",
                                    "kind": "LinkedField",
                                    "name": "asset",
                                    "plural": false,
                                    "selections": [
                                      (v17/*: any*/),
                                      (v18/*: any*/),
                                      (v19/*: any*/),
                                      (v20/*: any*/),
                                      {
                                        "alias": null,
                                        "args": null,
                                        "concreteType": "AssetDimensions",
                                        "kind": "LinkedField",
                                        "name": "dimensions",
                                        "plural": false,
                                        "selections": [
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "height",
                                            "storageKey": null
                                          },
                                          {
                                            "alias": null,
                                            "args": null,
                                            "kind": "ScalarField",
                                            "name": "width",
                                            "storageKey": null
                                          }
                                        ],
                                        "storageKey": null
                                      },
                                      (v3/*: any*/)
                                    ],
                                    "storageKey": null
                                  },
                                  {
                                    "alias": null,
                                    "args": null,
                                    "concreteType": "NftAssetNftInfo",
                                    "kind": "LinkedField",
                                    "name": "nftInfo",
                                    "plural": false,
                                    "selections": [
                                      {
                                        "alias": null,
                                        "args": null,
                                        "kind": "ScalarField",
                                        "name": "mint",
                                        "storageKey": null
                                      }
                                    ],
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              (v7/*: any*/),
                              (v10/*: any*/),
                              (v13/*: any*/),
                              {
                                "kind": "InlineFragment",
                                "selections": [
                                  (v8/*: any*/),
                                  (v11/*: any*/),
                                  (v12/*: any*/),
                                  (v15/*: any*/)
                                ],
                                "type": "IPost",
                                "abstractKey": "__isIPost"
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
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "filters": [
                  "input"
                ],
                "handle": "connection",
                "key": "CampaignCommunityPosts_Query_posts",
                "kind": "LinkedHandle",
                "name": "posts"
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
    "cacheID": "9c9795619736155399059cd6648c50ba",
    "id": null,
    "metadata": {},
    "name": "CampaignCommunityPostsPaginationQuery",
    "operationKind": "query",
    "text": "query CampaignCommunityPostsPaginationQuery(\n  $after: String\n  $first: Int!\n  $input: PostsForCampaignInput!\n) {\n  ...CampaignPosts_Query\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment AssetForNftAsset_NftAsset on NftAsset {\n  asset {\n    ...AssetForAssetExpress_AssetExpress\n    dimensions {\n      height\n      width\n    }\n    id\n  }\n  nftInfo {\n    mint\n  }\n}\n\nfragment CampaignPosts_Query on query_root {\n  PostsNamespace {\n    postsForCampaign {\n      posts(input: $input, after: $after, first: $first) {\n        edges {\n          node {\n            __typename\n            ... on PostTextOnly {\n              __typename\n              id\n              ...PostForPostTextOnly_PostTextOnly\n            }\n            ... on PostWithSingleAsset {\n              __typename\n              id\n              ...PostForPostWithSingleAsset_PostWithSingleAsset\n            }\n            ... on PostWithPoll {\n              __typename\n              id\n              ...PostForPostWithPoll_PostWithPoll\n            }\n            ... on PostWithAirdrop {\n              __typename\n              id\n              ...PostForPostWithAirdrop_PostWithAirdrop\n            }\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n\nfragment LinkWithIconForLink_Link on Link {\n  href\n  text\n}\n\nfragment PollOptionForPollOptionExpress_PollExpress on PollExpress {\n  id\n  totalResponses\n  viewerRespondedToPoll\n  isMultiSelect\n}\n\nfragment PollOptionForPollOptionExpress_PollOptionExpress on PollOptionExpress {\n  id\n  text\n  responseCount\n  viewerRespondedToPollOption\n}\n\nfragment PostCommentForCommentExpress_CommentExpress on CommentExpress {\n  comment\n  timeCreated\n  commenter {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PostForPostTextOnly_PostTextOnly on PostTextOnly {\n  id\n  title\n  body\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  ...PostHeaderForPostExpress_PostExpress\n  ...PostLink_IPost\n}\n\nfragment PostForPostWithAirdrop_PostWithAirdrop on PostWithAirdrop {\n  id\n  nftAsset {\n    ...AssetForNftAsset_NftAsset\n  }\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  visibilityFundingTiers {\n    __typename\n    ... on ICampaignFundingTier {\n      __isICampaignFundingTier: __typename\n      title\n    }\n    ... on CampaignFundingTierStandard {\n      id\n    }\n  }\n  ...PostHeaderForPostExpress_PostExpress\n  ...PostLink_IPost\n}\n\nfragment PostForPostWithPoll_PostWithPoll on PostWithPoll {\n  id\n  title\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  poll {\n    id\n    options {\n      ...PollOptionForPollOptionExpress_PollOptionExpress\n    }\n    totalResponses\n    viewerRespondedToPoll\n    ...PollOptionForPollOptionExpress_PollExpress\n  }\n  pollAsset: asset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  ...PostHeaderForPostExpress_PostExpress\n}\n\nfragment PostForPostWithSingleAsset_PostWithSingleAsset on PostWithSingleAsset {\n  id\n  title\n  body\n  asset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  ...PostHeaderForPostExpress_PostExpress\n  ...PostLink_IPost\n}\n\nfragment PostHeaderForPostExpress_PostExpress on IPost {\n  __isIPost: __typename\n  timeCreated\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  ...PostVisibilitySection_IPost\n}\n\nfragment PostLink_IPost on IPost {\n  __isIPost: __typename\n  link {\n    href\n    ...LinkWithIconForLink_Link\n  }\n}\n\nfragment PostPreviewComments_PostComments on PostComments {\n  totalCount\n  previewComments {\n    id\n    ...PostCommentForCommentExpress_CommentExpress\n  }\n}\n\nfragment PostVisibilitySection_IPost on IPost {\n  __isIPost: __typename\n  visibility\n  visibilityFundingTiers {\n    __typename\n    ... on ICampaignFundingTier {\n      __isICampaignFundingTier: __typename\n      title\n    }\n    ... on CampaignFundingTierStandard {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8da49827dfaa008fb5444f9f2b793e59";

export default node;
