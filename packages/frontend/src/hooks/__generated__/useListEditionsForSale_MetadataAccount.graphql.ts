/**
 * @generated SignedSource<<fa3648b822e7145f2005bd00b3c23942>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useListEditionsForSale_MetadataAccount$data = {
  readonly mint: string;
  readonly tags: ReadonlyArray<string>;
  readonly " $fragmentType": "useListEditionsForSale_MetadataAccount";
};
export type useListEditionsForSale_MetadataAccount$key = {
  readonly " $data"?: useListEditionsForSale_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useListEditionsForSale_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useListEditionsForSale_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "3b58413ba55c00d24e0973461786ce00";

export default node;
