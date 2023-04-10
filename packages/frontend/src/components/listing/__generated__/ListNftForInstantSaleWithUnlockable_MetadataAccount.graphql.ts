/**
 * @generated SignedSource<<b360e88a6dbf583eec3823af20abe0d9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForInstantSaleWithUnlockable_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForInstantSaleWithUnlockable_MetadataAccount";
};
export type ListNftForInstantSaleWithUnlockable_MetadataAccount$key = {
  readonly " $data"?: ListNftForInstantSaleWithUnlockable_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForInstantSaleWithUnlockable_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForInstantSaleWithUnlockable_MetadataAccount",
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

(node as any).hash = "6129627f308bab58c18ca172812a71a4";

export default node;
