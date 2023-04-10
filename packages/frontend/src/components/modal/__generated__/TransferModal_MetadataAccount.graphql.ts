/**
 * @generated SignedSource<<0b3858ee0159178996ae650ee159eced>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type TransferModal_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly creatorId: string;
    readonly ownerId: string;
  };
  readonly " $fragmentType": "TransferModal_MetadataAccount";
};
export type TransferModal_MetadataAccount$key = {
  readonly " $data"?: TransferModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"TransferModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TransferModal_MetadataAccount",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ownerId",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "f701246d8d4f2a8d0dc581b8090fcdf8";

export default node;
