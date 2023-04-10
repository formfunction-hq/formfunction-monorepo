/**
 * @generated SignedSource<<9089f8bce139a3ce5b8ee8017b889310>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListEditionsConstantOrMinimumPrice_MetadataAccount$data = {
  readonly primarySaleHappened: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"useListEditionsForSale_MetadataAccount">;
  readonly " $fragmentType": "ListEditionsConstantOrMinimumPrice_MetadataAccount";
};
export type ListEditionsConstantOrMinimumPrice_MetadataAccount$key = {
  readonly " $data"?: ListEditionsConstantOrMinimumPrice_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsConstantOrMinimumPrice_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListEditionsConstantOrMinimumPrice_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useListEditionsForSale_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "5f1e0f750de4c1b2de67ff276853bb4c";

export default node;
