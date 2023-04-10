/**
 * @generated SignedSource<<bbe515f4439ea412e2dbca3543e61380>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useListNftForSale_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly creatorId: string;
  };
  readonly tags: ReadonlyArray<string>;
  readonly " $fragmentType": "useListNftForSale_MetadataAccount";
};
export type useListNftForSale_MetadataAccount$key = {
  readonly " $data"?: useListNftForSale_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useListNftForSale_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useListNftForSale_MetadataAccount",
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
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "creatorId",
          "storageKey": null
        }
      ],
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

(node as any).hash = "067cbb8d859bbf899a51036c69cbed35";

export default node;
