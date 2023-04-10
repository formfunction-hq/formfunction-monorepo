/**
 * @generated SignedSource<<ef78bb1978dca35835c7cb395e005d50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HowAuctionsWorkButton_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"HowAuctionsWorkModal_MetadataAccount">;
  readonly " $fragmentType": "HowAuctionsWorkButton_MetadataAccount";
};
export type HowAuctionsWorkButton_MetadataAccount$key = {
  readonly " $data"?: HowAuctionsWorkButton_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"HowAuctionsWorkButton_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HowAuctionsWorkButton_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HowAuctionsWorkModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "83d2b11ddd177757f8a33e48af782b87";

export default node;
