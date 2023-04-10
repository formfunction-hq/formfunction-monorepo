/**
 * @generated SignedSource<<ad457ef27b2c659edbf00c7d6c8a19c7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AddToAllowlistModal_MetadataAccount$data = {
  readonly mint: string;
  readonly " $fragmentType": "AddToAllowlistModal_MetadataAccount";
};
export type AddToAllowlistModal_MetadataAccount$key = {
  readonly " $data"?: AddToAllowlistModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"AddToAllowlistModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AddToAllowlistModal_MetadataAccount",
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

(node as any).hash = "c349bb4cade511e19839bb84bc71bd48";

export default node;
