/**
 * @generated SignedSource<<66a76c27f3618349ce1be6f4ea671d3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BuyEditionModal_EditionBuyerInfoResponse$data = {
  readonly merkleAllowlistInfo: {
    readonly amountMinted: number;
    readonly " $fragmentSpreads": FragmentRefs<"useBuyEdition_EditionsMerkleAllowlistInfoExpress">;
  } | null;
  readonly numberBought: number;
  readonly " $fragmentType": "BuyEditionModal_EditionBuyerInfoResponse";
};
export type BuyEditionModal_EditionBuyerInfoResponse$key = {
  readonly " $data"?: BuyEditionModal_EditionBuyerInfoResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyEditionModal_EditionBuyerInfoResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyEditionModal_EditionBuyerInfoResponse",
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
          "name": "amountMinted",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useBuyEdition_EditionsMerkleAllowlistInfoExpress"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberBought",
      "storageKey": null
    }
  ],
  "type": "EditionBuyerInfoResponse",
  "abstractKey": null
};

(node as any).hash = "12756bd9ab5e540411f38ed0ad6427a1";

export default node;
