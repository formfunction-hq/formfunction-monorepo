/**
 * @generated SignedSource<<b8899c2dbcf187c13c8b376c98433a99>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftStatusExpressEnum_NftExpress$data = {
  readonly status: NftStatusExpress_enum;
  readonly " $fragmentType": "NftStatusExpressEnum_NftExpress";
};
export type NftStatusExpressEnum_NftExpress$key = {
  readonly " $data"?: NftStatusExpressEnum_NftExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftStatusExpressEnum_NftExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftStatusExpressEnum_NftExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "NftExpress",
  "abstractKey": null
};

(node as any).hash = "fea412f82e4f1ad4cfb6b4b47cc53996";

export default node;
