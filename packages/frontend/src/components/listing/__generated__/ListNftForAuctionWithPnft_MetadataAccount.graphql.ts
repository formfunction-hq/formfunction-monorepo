/**
 * @generated SignedSource<<d02d3c019e835f33b223692609cd1a84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForAuctionWithPnft_MetadataAccount$data = {
  readonly mint: string;
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForAuctionWithPnft_MetadataAccount";
};
export type ListNftForAuctionWithPnft_MetadataAccount$key = {
  readonly " $data"?: ListNftForAuctionWithPnft_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuctionWithPnft_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForAuctionWithPnft_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useListNftForSale_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "494e876e787d37651cbc61fc7cb0943e";

export default node;
