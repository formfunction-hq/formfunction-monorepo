/**
 * @generated SignedSource<<6d3a3acf1dc2526486869198e76844fd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftTransaction_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useNftKindNullable_MetadataAccount">;
  readonly " $fragmentType": "NftTransaction_MetadataAccount";
};
export type NftTransaction_MetadataAccount$key = {
  readonly " $data"?: NftTransaction_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftTransaction_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftTransaction_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKindNullable_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "806bf4b27b5436a0d451840600b87909";

export default node;
