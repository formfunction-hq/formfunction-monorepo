/**
 * @generated SignedSource<<93d58743a5158471b84be022b500ea93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PriceWithSymbolText_Price$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
  readonly " $fragmentType": "PriceWithSymbolText_Price";
};
export type PriceWithSymbolText_Price$key = {
  readonly " $data"?: PriceWithSymbolText_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbolText_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceWithSymbolText_Price",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useFormattedNftPrice_Price"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftPriceSymbol_Price"
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "fe41433f8f4b07500522bc163b360a42";

export default node;
