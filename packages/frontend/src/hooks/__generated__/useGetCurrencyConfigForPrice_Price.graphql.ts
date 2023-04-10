/**
 * @generated SignedSource<<8e708da2b8bad332f7a08848bef5ab8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useGetCurrencyConfigForPrice_Price$data = {
  readonly currencyInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForCurrencyExpress_CurrencyExpress">;
  };
  readonly " $fragmentType": "useGetCurrencyConfigForPrice_Price";
};
export type useGetCurrencyConfigForPrice_Price$key = {
  readonly " $data"?: useGetCurrencyConfigForPrice_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForPrice_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useGetCurrencyConfigForPrice_Price",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CurrencyExpress",
      "kind": "LinkedField",
      "name": "currencyInfo",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useGetCurrencyConfigForCurrencyExpress_CurrencyExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "1a35d610419d8c00bef1292570d28ab7";

export default node;
