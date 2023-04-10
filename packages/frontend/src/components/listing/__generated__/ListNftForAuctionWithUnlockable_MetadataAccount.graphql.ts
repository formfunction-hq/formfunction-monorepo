/**
 * @generated SignedSource<<8e0d3fd8f7b0867daa3cca31b50548fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForAuctionWithUnlockable_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForAuctionWithUnlockable_MetadataAccount";
};
export type ListNftForAuctionWithUnlockable_MetadataAccount$key = {
  readonly " $data"?: ListNftForAuctionWithUnlockable_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuctionWithUnlockable_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForAuctionWithUnlockable_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useListNftForSale_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a311331ec78c35ac395179ad6b8ac466";

export default node;
