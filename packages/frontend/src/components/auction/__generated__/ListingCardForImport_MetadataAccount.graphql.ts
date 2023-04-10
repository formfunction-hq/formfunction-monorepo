/**
 * @generated SignedSource<<7b535a615a2f76db43708c440064587e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListingCardForImport_MetadataAccount$data = {
  readonly mint: string;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "ListingCardForImport_MetadataAccount";
};
export type ListingCardForImport_MetadataAccount$key = {
  readonly " $data"?: ListingCardForImport_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForImport_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListingCardForImport_MetadataAccount",
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
      "name": "ListingCardForMetadata_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "3506c33dc63aad38f215431ff7775544";

export default node;
