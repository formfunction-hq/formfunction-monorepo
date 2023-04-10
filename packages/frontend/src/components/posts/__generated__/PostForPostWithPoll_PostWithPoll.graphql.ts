/**
 * @generated SignedSource<<d9e99acc5f39f7f366c82962c857a496>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostForPostWithPoll_PostWithPoll$data = {
  readonly comments: {
    readonly totalCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewComments_PostComments">;
  };
  readonly id: string;
  readonly poll: {
    readonly id: string;
    readonly options: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"PollOptionForPollOptionExpress_PollOptionExpress">;
    }>;
    readonly totalResponses: number;
    readonly viewerRespondedToPoll: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"PollOptionForPollOptionExpress_PollExpress">;
  };
  readonly pollAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  } | null;
  readonly reactions: {
    readonly totalCount: number;
    readonly viewerReactionType: ReactionTypeExpress_enum | null;
  };
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderForPostExpress_PostExpress">;
  readonly " $fragmentType": "PostForPostWithPoll_PostWithPoll";
};
export type PostForPostWithPoll_PostWithPoll$key = {
  readonly " $data"?: PostForPostWithPoll_PostWithPoll$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithPoll_PostWithPoll">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalCount",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostForPostWithPoll_PostWithPoll",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Reactions",
      "kind": "LinkedField",
      "name": "reactions",
      "plural": false,
      "selections": [
        (v1/*: any*/),
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
    {
      "alias": null,
      "args": null,
      "concreteType": "PostComments",
      "kind": "LinkedField",
      "name": "comments",
      "plural": false,
      "selections": [
        (v1/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostPreviewComments_PostComments"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PollExpress",
      "kind": "LinkedField",
      "name": "poll",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "PollOptionExpress",
          "kind": "LinkedField",
          "name": "options",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "PollOptionForPollOptionExpress_PollOptionExpress"
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PollOptionForPollOptionExpress_PollExpress"
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
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForAssetExpress_AssetExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderForPostExpress_PostExpress"
    }
  ],
  "type": "PostWithPoll",
  "abstractKey": null
};
})();

(node as any).hash = "e77a73e8f532d09b764193f048d90d4e";

export default node;
