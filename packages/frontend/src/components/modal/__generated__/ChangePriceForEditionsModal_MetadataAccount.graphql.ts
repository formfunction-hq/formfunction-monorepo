/**
 * @generated SignedSource<<677c2e2b471a740d2d98dadd9c0446fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangePriceForEditionsModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsModalContent_MetadataAccount">;
  readonly " $fragmentType": "ChangePriceForEditionsModal_MetadataAccount";
};
export type ChangePriceForEditionsModal_MetadataAccount$key = {
  readonly " $data"?: ChangePriceForEditionsModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePriceForEditionsModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangePriceForEditionsModalContent_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "9f23e4f8d2f8d3627ec01b97590afb3d";

export default node;
