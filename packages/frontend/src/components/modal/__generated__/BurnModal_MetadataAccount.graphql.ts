/**
 * @generated SignedSource<<9789dfb8add693accc01c74f14782830>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BurnModal_MetadataAccount$data = {
  readonly mint: string;
  readonly " $fragmentType": "BurnModal_MetadataAccount";
};
export type BurnModal_MetadataAccount$key = {
  readonly " $data"?: BurnModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"BurnModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BurnModal_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "2c7ea71aacd9507dafe981e7f9fff06a";

export default node;
