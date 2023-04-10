/**
 * @generated SignedSource<<9c4c4d3c991d62bec4cde62644bea2e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useFormattedNftPrice_Price$data = {
  readonly amount: number;
  readonly currencyInfo: {
    readonly decimals: number;
  };
  readonly " $fragmentType": "useFormattedNftPrice_Price";
};
export type useFormattedNftPrice_Price$key = {
  readonly " $data"?: useFormattedNftPrice_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useFormattedNftPrice_Price",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurrencyExpress",
      "kind": "LinkedField",
      "name": "currencyInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "decimals",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "4c4589028e50306ba3278cb4d9faa102";

export default node;
