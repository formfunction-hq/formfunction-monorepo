/**
 * @generated SignedSource<<bb5557c16101e0aecbb364661a495f5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BuyEditionModalPriceInput_Price$data = {
  readonly currencyInfo: {
    readonly name: CurrencyNameExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price" | "useFormattedNftPrice_Price" | "useGetCurrencyConfigForPrice_Price" | "useNftPriceSymbol_Price">;
  readonly " $fragmentType": "BuyEditionModalPriceInput_Price";
};
export type BuyEditionModalPriceInput_Price$key = {
  readonly " $data"?: BuyEditionModalPriceInput_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyEditionModalPriceInput_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyEditionModalPriceInput_Price",
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
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PriceWithSymbol_Price"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useGetCurrencyConfigForPrice_Price"
    },
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

(node as any).hash = "bc3d0e1c11bb3cd57245a505321ef909";

export default node;
