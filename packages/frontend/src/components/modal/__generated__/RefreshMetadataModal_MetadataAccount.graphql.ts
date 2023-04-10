/**
 * @generated SignedSource<<75417a236380afbd760a2c3dead799aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RefreshMetadataModal_MetadataAccount$data = {
  readonly mint: string;
  readonly " $fragmentType": "RefreshMetadataModal_MetadataAccount";
};
export type RefreshMetadataModal_MetadataAccount$key = {
  readonly " $data"?: RefreshMetadataModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"RefreshMetadataModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "RefreshMetadataModal_MetadataAccount",
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

(node as any).hash = "296acf0b1d43dc3a7af8db0214e22b7e";

export default node;
