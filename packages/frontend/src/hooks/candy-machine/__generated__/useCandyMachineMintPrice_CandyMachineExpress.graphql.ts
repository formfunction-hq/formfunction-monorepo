/**
 * @generated SignedSource<<5036224a16ee9384cbb7b229b0c2a4c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCandyMachineMintPrice_CandyMachineExpress$data = {
  readonly allowlistPrice: {
    readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModal_Price" | "PriceWithSymbolText_Price" | "PriceWithSymbol_Price" | "usePriceCurrencyNameAndAmount_Price">;
  } | null;
  readonly premintPrice: {
    readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModal_Price" | "PriceWithSymbolText_Price" | "PriceWithSymbol_Price" | "usePriceCurrencyNameAndAmount_Price">;
  } | null;
  readonly price: {
    readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModal_Price" | "PriceWithSymbolText_Price" | "PriceWithSymbol_Price" | "usePriceCurrencyNameAndAmount_Price">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPhase_CandyMachineExpress">;
  readonly " $fragmentType": "useCandyMachineMintPrice_CandyMachineExpress";
};
export type useCandyMachineMintPrice_CandyMachineExpress$key = {
  readonly " $data"?: useCandyMachineMintPrice_CandyMachineExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPrice_CandyMachineExpress">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "PriceWithSymbol_Price"
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "PriceWithSymbolText_Price"
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "BuyNowGenericModal_Price"
  },
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "usePriceCurrencyNameAndAmount_Price"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCandyMachineMintPrice_CandyMachineExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "allowlistPrice",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "premintPrice",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "price",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCandyMachineMintPhase_CandyMachineExpress"
    }
  ],
  "type": "CandyMachineExpress",
  "abstractKey": null
};
})();

(node as any).hash = "a52db328b37be9a2dffcb9dcdce7a559";

export default node;
