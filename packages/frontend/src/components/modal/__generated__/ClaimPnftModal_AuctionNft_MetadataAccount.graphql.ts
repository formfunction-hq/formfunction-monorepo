/**
 * @generated SignedSource<<d93607913f0ecff3aab753dc1f7cb02e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClaimPnftModal_AuctionNft_MetadataAccount$data = {
  readonly assetHeight: number | null;
  readonly assetWidth: number | null;
  readonly mint: string;
  readonly " $fragmentType": "ClaimPnftModal_AuctionNft_MetadataAccount";
};
export type ClaimPnftModal_AuctionNft_MetadataAccount$key = {
  readonly " $data"?: ClaimPnftModal_AuctionNft_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_AuctionNft_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClaimPnftModal_AuctionNft_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetHeight",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetWidth",
      "storageKey": null
    },
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

(node as any).hash = "7a7c50f0dbfc97431660306552f340dc";

export default node;
