/**
 * @generated SignedSource<<6ee8b648b18416cdc4735275dea6e602>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CrossmintModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CrossmintButton_MetadataAccount">;
  readonly " $fragmentType": "CrossmintModal_MetadataAccount";
};
export type CrossmintModal_MetadataAccount$key = {
  readonly " $data"?: CrossmintModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"CrossmintModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CrossmintModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CrossmintButton_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "51429849491ee9b0c98e5040cdc09347";

export default node;
