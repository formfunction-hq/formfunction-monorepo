/**
 * @generated SignedSource<<7c27c158ba764744d27fe10e2de02e36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListEditionsModalContent_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsConstantOrMinimumPrice_MetadataAccount" | "ListEditionsLinearPrice_MetadataAccount">;
  readonly " $fragmentType": "ListEditionsModalContent_MetadataAccount";
};
export type ListEditionsModalContent_MetadataAccount$key = {
  readonly " $data"?: ListEditionsModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListEditionsModalContent_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListEditionsConstantOrMinimumPrice_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListEditionsLinearPrice_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "717d9a8798b9644c18d28b1c33e8c15a";

export default node;
