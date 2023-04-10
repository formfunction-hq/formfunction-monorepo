/**
 * @generated SignedSource<<deab44851341f435d2f3176b8cafb95f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type OtherNftBottomDrawer_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NftOptionsModals_MetadataAccount" | "NftOptions_MetadataAccount">;
  readonly " $fragmentType": "OtherNftBottomDrawer_MetadataAccount";
};
export type OtherNftBottomDrawer_MetadataAccount$key = {
  readonly " $data"?: OtherNftBottomDrawer_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"OtherNftBottomDrawer_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "OtherNftBottomDrawer_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOptions_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOptionsModals_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "b22259b7970ef50f1bdab0bef556a4f3";

export default node;
