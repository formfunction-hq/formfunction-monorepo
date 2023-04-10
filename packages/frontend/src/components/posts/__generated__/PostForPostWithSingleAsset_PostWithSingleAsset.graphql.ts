/**
 * @generated SignedSource<<71181b770e48b3e7621bbf3a819dad62>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostForPostWithSingleAsset_PostWithSingleAsset$data = {
  readonly asset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  };
  readonly body: string | null;
  readonly comments: {
    readonly totalCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewComments_PostComments">;
  };
  readonly id: string;
  readonly reactions: {
    readonly totalCount: number;
    readonly viewerReactionType: ReactionTypeExpress_enum | null;
  };
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderForPostExpress_PostExpress" | "PostLink_IPost">;
  readonly " $fragmentType": "PostForPostWithSingleAsset_PostWithSingleAsset";
};
export type PostForPostWithSingleAsset_PostWithSingleAsset$key = {
  readonly " $data"?: PostForPostWithSingleAsset_PostWithSingleAsset$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithSingleAsset_PostWithSingleAsset">;
};

const node: ReaderFragment = (function(){
var v0 = {
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
  "name": "PostForPostWithSingleAsset_PostWithSingleAsset",
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
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
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
      "alias": null,
      "args": null,
      "concreteType": "Reactions",
      "kind": "LinkedField",
      "name": "reactions",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
        (v0/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostPreviewComments_PostComments"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostHeaderForPostExpress_PostExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostLink_IPost"
    }
  ],
  "type": "PostWithSingleAsset",
  "abstractKey": null
};
})();

(node as any).hash = "f7be6eb0c8ec06ee86ecedd00fdc9c0e";

export default node;
