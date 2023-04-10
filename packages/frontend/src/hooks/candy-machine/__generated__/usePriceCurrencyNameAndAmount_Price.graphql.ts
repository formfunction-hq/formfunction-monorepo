/**
 * @generated SignedSource<<4bc54b33fc3926c463a5ec5a4c292e0f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type usePriceCurrencyNameAndAmount_Price$data = {
  readonly amount: number;
  readonly currencyInfo: {
    readonly name: CurrencyNameExpress_enum;
  };
  readonly " $fragmentType": "usePriceCurrencyNameAndAmount_Price";
};
export type usePriceCurrencyNameAndAmount_Price$key = {
  readonly " $data"?: usePriceCurrencyNameAndAmount_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"usePriceCurrencyNameAndAmount_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "usePriceCurrencyNameAndAmount_Price",
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "bb9a5ba0e248ea1b2e407f10d367e5a6";

export default node;
