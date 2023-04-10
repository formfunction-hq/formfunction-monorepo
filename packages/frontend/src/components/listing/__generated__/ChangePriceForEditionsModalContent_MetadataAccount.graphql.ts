/**
 * @generated SignedSource<<ab73740fc79e1b3c314c32f6fb0a5d0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangePriceForEditionsModalContent_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount" | "ChangePriceForEditionsLinearPrice_MetadataAccount">;
  readonly " $fragmentType": "ChangePriceForEditionsModalContent_MetadataAccount";
};
export type ChangePriceForEditionsModalContent_MetadataAccount$key = {
  readonly " $data"?: ChangePriceForEditionsModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePriceForEditionsModalContent_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangePriceForEditionsLinearPrice_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a9fec5845b4666fd6a962b375c173b6c";

export default node;
