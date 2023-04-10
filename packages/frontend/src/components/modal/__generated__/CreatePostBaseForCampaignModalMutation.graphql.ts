/**
 * @generated SignedSource<<fa3b187935bbdfb54c8baafb4059cb6e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVisibilityExpress_enum = "CampaignSupportersOnly" | "Public" | "%future added value";
export type CreatePostBaseForCampaignInput = {
  airdropMasterEditionMint?: string | null;
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
  postInput: CreatePostBaseInput;
};
export type CreatePostBaseInput = {
  assets?: ReadonlyArray<AssetInput> | null;
  body?: string | null;
  link?: string | null;
  title: string;
  visibility: PostVisibilityExpress_enum;
  visibilityFundingTierIds?: ReadonlyArray<string> | null;
};
export type AssetInput = {
  arweaveTxid?: string | null;
  contentType: string;
  dimensions?: AssetDimensionsInput | null;
  downloadUrl: string;
  path: string;
};
export type AssetDimensionsInput = {
  height: number;
  width: number;
};
export type CreatePostBaseForCampaignModalMutation$variables = {
  connections: ReadonlyArray<string>;
  input: CreatePostBaseForCampaignInput;
};
export type CreatePostBaseForCampaignModalMutation$data = {
  readonly PostNamespace: {
    readonly createPostBaseForCampaign: {
      readonly post: {
        readonly __typename: "PostTextOnly";
        readonly __typename: "PostTextOnly";
        readonly " $fragmentSpreads": FragmentRefs<"PostForPostTextOnly_PostTextOnly">;
      } | {
        readonly __typename: "PostWithPoll";
        readonly __typename: "PostWithPoll";
        readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithPoll_PostWithPoll">;
      } | {
        readonly __typename: "PostWithSingleAsset";
        readonly __typename: "PostWithSingleAsset";
        readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithSingleAsset_PostWithSingleAsset">;
      } | {
        // This will never be '%other', but we need some
        // value in case none of the concrete values match.
        readonly __typename: "%other";
      };
    } | null;
  };
};
export type CreatePostBaseForCampaignModalMutation = {
  response: CreatePostBaseForCampaignModalMutation$data;
  variables: CreatePostBaseForCampaignModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "body",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "concreteType": "Reactions",
  "kind": "LinkedField",
  "name": "reactions",
  "plural": false,
  "selections": [
    (v7/*: any*/),
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
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeCreated",
  "storageKey": null
},
v10 = [
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
      (v4/*: any*/)
    ],
    "storageKey": null
  },
  (v4/*: any*/)
],
v11 = {
  "alias": null,
  "args": null,
  "concreteType": "PostComments",
  "kind": "LinkedField",
  "name": "comments",
  "plural": false,
  "selections": [
    (v7/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CommentExpress",
      "kind": "LinkedField",
      "name": "previewComments",
      "plural": true,
      "selections": [
        (v4/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "comment",
          "storageKey": null
        },
        (v9/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "commenter",
          "plural": false,
          "selections": (v10/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "concreteType": "UserExpress",
  "kind": "LinkedField",
  "name": "creator",
  "plural": false,
  "selections": (v10/*: any*/),
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "visibility",
  "storageKey": null
},
v14 = [
  (v4/*: any*/)
],
v15 = {
  "alias": null,
  "args": null,
  "concreteType": null,
  "kind": "LinkedField",
  "name": "visibilityFundingTiers",
  "plural": true,
  "selections": [
    (v3/*: any*/),
    {
      "kind": "InlineFragment",
      "selections": [
        (v5/*: any*/)
      ],
      "type": "ICampaignFundingTier",
      "abstractKey": "__isICampaignFundingTier"
    },
    {
      "kind": "InlineFragment",
      "selections": (v14/*: any*/),
      "type": "CampaignFundingTierStandard",
      "abstractKey": null
    }
  ],
  "storageKey": null
},
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "text",
  "storageKey": null
},
v17 = {
  "kind": "InlineFragment",
  "selections": [
    (v9/*: any*/),
    (v12/*: any*/),
    (v13/*: any*/),
    (v15/*: any*/),
    {
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
        (v16/*: any*/)
      ],
      "storageKey": null
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v19 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "contentType",
    "storageKey": null
  },
  (v18/*: any*/),
  {
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
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "videoPlaybackId",
    "storageKey": null
  },
  (v4/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "CreatePostBaseForCampaignModalMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "CreatePostBaseForCampaignResponse",
            "kind": "LinkedField",
            "name": "createPostBaseForCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "post",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
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
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "PostForPostWithPoll_PostWithPoll"
                      }
                    ],
                    "type": "PostWithPoll",
                    "abstractKey": null
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "CreatePostBaseForCampaignModalMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "CreatePostBaseForCampaignResponse",
            "kind": "LinkedField",
            "name": "createPostBaseForCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "post",
                "plural": false,
                "selections": [
                  (v3/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v8/*: any*/),
                      (v11/*: any*/),
                      (v17/*: any*/)
                    ],
                    "type": "PostTextOnly",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v6/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "AssetExpress",
                        "kind": "LinkedField",
                        "name": "asset",
                        "plural": false,
                        "selections": (v19/*: any*/),
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      (v11/*: any*/),
                      (v17/*: any*/)
                    ],
                    "type": "PostWithSingleAsset",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      (v8/*: any*/),
                      (v11/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PollExpress",
                        "kind": "LinkedField",
                        "name": "poll",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PollOptionExpress",
                            "kind": "LinkedField",
                            "name": "options",
                            "plural": true,
                            "selections": [
                              (v4/*: any*/),
                              (v16/*: any*/),
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
                        "selections": (v19/*: any*/),
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v9/*: any*/),
                          (v12/*: any*/),
                          (v13/*: any*/),
                          (v15/*: any*/)
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
                    "selections": (v14/*: any*/),
                    "type": "PostWithAirdrop",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "filters": null,
                "handle": "prependNode",
                "key": "",
                "kind": "LinkedHandle",
                "name": "post",
                "handleArgs": [
                  {
                    "kind": "Variable",
                    "name": "connections",
                    "variableName": "connections"
                  },
                  {
                    "kind": "Literal",
                    "name": "edgeTypeName",
                    "value": "PostsEdge"
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
    "cacheID": "f58176c11e8819a748e62445fcdd5ec6",
    "id": null,
    "metadata": {},
    "name": "CreatePostBaseForCampaignModalMutation",
    "operationKind": "mutation",
    "text": "mutation CreatePostBaseForCampaignModalMutation(\n  $input: CreatePostBaseForCampaignInput!\n) {\n  PostNamespace {\n    createPostBaseForCampaign(input: $input) {\n      post {\n        __typename\n        ... on PostTextOnly {\n          __typename\n          ...PostForPostTextOnly_PostTextOnly\n          id\n        }\n        ... on PostWithSingleAsset {\n          __typename\n          ...PostForPostWithSingleAsset_PostWithSingleAsset\n          id\n        }\n        ... on PostWithPoll {\n          __typename\n          ...PostForPostWithPoll_PostWithPoll\n          id\n        }\n        ... on PostWithAirdrop {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment LinkWithIconForLink_Link on Link {\n  href\n  text\n}\n\nfragment PollOptionForPollOptionExpress_PollExpress on PollExpress {\n  id\n  totalResponses\n  viewerRespondedToPoll\n  isMultiSelect\n}\n\nfragment PollOptionForPollOptionExpress_PollOptionExpress on PollOptionExpress {\n  id\n  text\n  responseCount\n  viewerRespondedToPollOption\n}\n\nfragment PostCommentForCommentExpress_CommentExpress on CommentExpress {\n  comment\n  timeCreated\n  commenter {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PostForPostTextOnly_PostTextOnly on PostTextOnly {\n  id\n  title\n  body\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  ...PostHeaderForPostExpress_PostExpress\n  ...PostLink_IPost\n}\n\nfragment PostForPostWithPoll_PostWithPoll on PostWithPoll {\n  id\n  title\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  poll {\n    id\n    options {\n      ...PollOptionForPollOptionExpress_PollOptionExpress\n    }\n    totalResponses\n    viewerRespondedToPoll\n    ...PollOptionForPollOptionExpress_PollExpress\n  }\n  pollAsset: asset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  ...PostHeaderForPostExpress_PostExpress\n}\n\nfragment PostForPostWithSingleAsset_PostWithSingleAsset on PostWithSingleAsset {\n  id\n  title\n  body\n  asset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  reactions {\n    totalCount\n    viewerReactionType\n  }\n  comments {\n    totalCount\n    ...PostPreviewComments_PostComments\n  }\n  ...PostHeaderForPostExpress_PostExpress\n  ...PostLink_IPost\n}\n\nfragment PostHeaderForPostExpress_PostExpress on IPost {\n  __isIPost: __typename\n  timeCreated\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  ...PostVisibilitySection_IPost\n}\n\nfragment PostLink_IPost on IPost {\n  __isIPost: __typename\n  link {\n    href\n    ...LinkWithIconForLink_Link\n  }\n}\n\nfragment PostPreviewComments_PostComments on PostComments {\n  totalCount\n  previewComments {\n    id\n    ...PostCommentForCommentExpress_CommentExpress\n  }\n}\n\nfragment PostVisibilitySection_IPost on IPost {\n  __isIPost: __typename\n  visibility\n  visibilityFundingTiers {\n    __typename\n    ... on ICampaignFundingTier {\n      __isICampaignFundingTier: __typename\n      title\n    }\n    ... on CampaignFundingTierStandard {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7ce73f054a301f0bad9e70493396575e";

export default node;
