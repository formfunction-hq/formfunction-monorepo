/**
 * @generated SignedSource<<8e351f739a6f8774c4d4d6b0f52c6108>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type ReactionTypeExpress_enum = "Like" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ReactionTypeExpressEnum_IPost$data = {
  readonly reactions: {
    readonly viewerReactionType: ReactionTypeExpress_enum | null;
  };
  readonly " $fragmentType": "ReactionTypeExpressEnum_IPost";
};
export type ReactionTypeExpressEnum_IPost$key = {
  readonly " $data"?: ReactionTypeExpressEnum_IPost$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReactionTypeExpressEnum_IPost">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReactionTypeExpressEnum_IPost",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Reactions",
      "kind": "LinkedField",
      "name": "reactions",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "viewerReactionType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
};

(node as any).hash = "ae150aef94e0cf4e66fdae2d7fa9fa9a";

export default node;
