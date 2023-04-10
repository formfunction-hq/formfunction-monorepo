/**
 * @generated SignedSource<<1328937da88bd534c89fb6c6ec8219e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useNftPriceSymbol_Price$data = {
  readonly currencyInfo: {
    readonly shortSymbol: string | null;
    readonly symbol: string;
  };
  readonly " $fragmentType": "useNftPriceSymbol_Price";
};
export type useNftPriceSymbol_Price$key = {
  readonly " $data"?: useNftPriceSymbol_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNftPriceSymbol_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useNftPriceSymbol_Price",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "symbol",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortSymbol",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "7e93266e71ce294e63733a9e95f661aa";

export default node;
