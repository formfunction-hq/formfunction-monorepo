/**
 * @generated SignedSource<<e845edf5512bbac0f75d9696eb37866b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostForPostTextOnly_PostTextOnly$data = {
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
  readonly " $fragmentType": "PostForPostTextOnly_PostTextOnly";
};
export type PostForPostTextOnly_PostTextOnly$key = {
  readonly " $data"?: PostForPostTextOnly_PostTextOnly$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostForPostTextOnly_PostTextOnly">;
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
  "name": "PostForPostTextOnly_PostTextOnly",
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
  "type": "PostTextOnly",
  "abstractKey": null
};
})();

(node as any).hash = "551dab1097e5531a50a771e2ccd516a8";

export default node;
