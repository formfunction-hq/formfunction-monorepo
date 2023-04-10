/**
 * @generated SignedSource<<40fb90573dcb20a335581f736f93c543>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOptionsModals_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"BurnModal_MetadataAccount" | "DeleteModal_MetadataAccount" | "RefreshMetadataModal_MetadataAccount" | "TransferModal_MetadataAccount">;
  readonly " $fragmentType": "NftOptionsModals_MetadataAccount";
};
export type NftOptionsModals_MetadataAccount$key = {
  readonly " $data"?: NftOptionsModals_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOptionsModals_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOptionsModals_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BurnModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RefreshMetadataModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TransferModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "cdb5d64e4792a7624391a8c3a0fd3669";

export default node;
