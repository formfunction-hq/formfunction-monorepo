/**
 * @generated SignedSource<<cd4c66429861609ca596ff4a97a22a96>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftActionButton_EditionBuyerInfoResponse$data = {
  readonly merkleAllowlistInfo: {
    readonly amountAllowed: number;
    readonly amountMinted: number;
  } | null;
  readonly " $fragmentType": "NftActionButton_EditionBuyerInfoResponse";
};
export type NftActionButton_EditionBuyerInfoResponse$key = {
  readonly " $data"?: NftActionButton_EditionBuyerInfoResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftActionButton_EditionBuyerInfoResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftActionButton_EditionBuyerInfoResponse",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionsMerkleAllowlistInfoExpress",
      "kind": "LinkedField",
      "name": "merkleAllowlistInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amountAllowed",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amountMinted",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "EditionBuyerInfoResponse",
  "abstractKey": null
};

(node as any).hash = "2e17e0a850c77b2861f1a55e8ef9ee54";

export default node;
