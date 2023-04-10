/**
 * @generated SignedSource<<37919bd79ec242a046b44e41f3046be1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostVisibilityExpress_enum = "CampaignSupportersOnly" | "Public" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostVisibilityExpressEnum_IPost$data = {
  readonly visibility: PostVisibilityExpress_enum;
  readonly " $fragmentType": "PostVisibilityExpressEnum_IPost";
};
export type PostVisibilityExpressEnum_IPost$key = {
  readonly " $data"?: PostVisibilityExpressEnum_IPost$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilityExpressEnum_IPost">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVisibilityExpressEnum_IPost",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibility",
      "storageKey": null
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
};

(node as any).hash = "5b5352dcfd9253b68b11daac38d60fe3";

export default node;
