/**
 * @generated SignedSource<<07ed94968170163f67df6132a275090d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForInstantSale_MetadataAccount$data = {
  readonly primarySaleHappened: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForInstantSale_MetadataAccount";
};
export type ListNftForInstantSale_MetadataAccount$key = {
  readonly " $data"?: ListNftForInstantSale_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForInstantSale_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForInstantSale_MetadataAccount",
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

(node as any).hash = "67e0a07491515e40d21c57abf2cc5db1";

export default node;
