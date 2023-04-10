/**
 * @generated SignedSource<<241d3870caf963e0611fbf720b235082>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftAllowlistInfo_EditionBuyerInfoResponse$data = {
  readonly merkleAllowlistInfo: {
    readonly amountAllowed: number;
    readonly amountMinted: number;
  } | null;
  readonly " $fragmentType": "NftAllowlistInfo_EditionBuyerInfoResponse";
};
export type NftAllowlistInfo_EditionBuyerInfoResponse$key = {
  readonly " $data"?: NftAllowlistInfo_EditionBuyerInfoResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftAllowlistInfo_EditionBuyerInfoResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftAllowlistInfo_EditionBuyerInfoResponse",
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

(node as any).hash = "f11e0f8188d807871b30b5e3dc4dfb35";

export default node;
