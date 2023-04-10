/**
 * @generated SignedSource<<5651dd47f00d14259a10fe9d8eabdf66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OwnedNftBottomDrawer_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NftListedOptionsModals_MetadataAccount" | "NftListedOptions_MetadataAccount">;
  readonly " $fragmentType": "OwnedNftBottomDrawer_MetadataAccount";
};
export type OwnedNftBottomDrawer_MetadataAccount$key = {
  readonly " $data"?: OwnedNftBottomDrawer_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"OwnedNftBottomDrawer_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OwnedNftBottomDrawer_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftListedOptions_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftListedOptionsModals_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "6482c21db16fc63be2e849eedfbd6e03";

export default node;
