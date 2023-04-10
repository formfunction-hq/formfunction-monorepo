/**
 * @generated SignedSource<<e436e039e1f0ff8ffb848b8b502abe85>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostForPostWithAirdrop_PostWithAirdrop$data = {
  readonly comments: {
    readonly totalCount: number;
    readonly " $fragmentSpreads": FragmentRefs<"PostPreviewComments_PostComments">;
  };
  readonly id: string;
  readonly nftAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNftAsset_NftAsset">;
  };
  readonly reactions: {
    readonly totalCount: number;
    readonly viewerReactionType: ReactionTypeExpress_enum | null;
  };
  readonly visibilityFundingTiers: ReadonlyArray<{
    readonly title?: string;
  }> | null;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderForPostExpress_PostExpress" | "PostLink_IPost">;
  readonly " $fragmentType": "PostForPostWithAirdrop_PostWithAirdrop";
};
export type PostForPostWithAirdrop_PostWithAirdrop$key = {
  readonly " $data"?: PostForPostWithAirdrop_PostWithAirdrop$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostForPostWithAirdrop_PostWithAirdrop">;
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
  "name": "PostForPostWithAirdrop_PostWithAirdrop",
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
      "concreteType": "NftAsset",
      "kind": "LinkedField",
      "name": "nftAsset",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForNftAsset_NftAsset"
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
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "visibilityFundingTiers",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "type": "ICampaignFundingTier",
          "abstractKey": "__isICampaignFundingTier"
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
  "type": "PostWithAirdrop",
  "abstractKey": null
};
})();

(node as any).hash = "d72302fe212cad76a6158aa41665ae80";

export default node;
