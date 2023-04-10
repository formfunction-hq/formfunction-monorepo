/**
 * @generated SignedSource<<a769ea80018f05ff3d32a59fb7f8cd55>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceWithSymbol_Price$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbolText_Price">;
  readonly " $fragmentType": "PriceWithSymbol_Price";
};
export type PriceWithSymbol_Price$key = {
  readonly " $data"?: PriceWithSymbol_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceWithSymbol_Price",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceWithSymbolText_Price"
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "eb6e9e1a46a78f141b8c32200d41fca7";

export default node;
