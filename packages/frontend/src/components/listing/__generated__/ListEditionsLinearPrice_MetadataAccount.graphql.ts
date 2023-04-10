/**
 * @generated SignedSource<<2db2d727f1361860140a881c23a004d6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListEditionsLinearPrice_MetadataAccount$data = {
  readonly primarySaleHappened: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"useListEditionsForSale_MetadataAccount">;
  readonly " $fragmentType": "ListEditionsLinearPrice_MetadataAccount";
};
export type ListEditionsLinearPrice_MetadataAccount$key = {
  readonly " $data"?: ListEditionsLinearPrice_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsLinearPrice_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListEditionsLinearPrice_MetadataAccount",
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

(node as any).hash = "29b839e6eaf43276cc2ab5c97d56a4b9";

export default node;
