/**
 * @generated SignedSource<<f07691da7f83de218a821f091da69581>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForAuction_MetadataAccount$data = {
  readonly primarySaleHappened: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForAuction_MetadataAccount";
};
export type ListNftForAuction_MetadataAccount$key = {
  readonly " $data"?: ListNftForAuction_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuction_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForAuction_MetadataAccount",
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
      "name": "useListNftForSale_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "08eb5a0c6e34ce4556e706c0f3baf2df";

export default node;
