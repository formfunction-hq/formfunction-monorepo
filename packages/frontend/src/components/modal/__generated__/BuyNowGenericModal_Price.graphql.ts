/**
 * @generated SignedSource<<6cf4e92f30ed0d6ca8183f561bb53eb9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BuyNowGenericModal_Price$data = {
  readonly currencyInfo: {
    readonly name: CurrencyNameExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price" | "useFormattedNftPrice_Price">;
  readonly " $fragmentType": "BuyNowGenericModal_Price";
};
export type BuyNowGenericModal_Price$key = {
  readonly " $data"?: BuyNowGenericModal_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModal_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyNowGenericModal_Price",
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
      "name": "useFormattedNftPrice_Price"
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "788d566158fe6b80330c3bf86370a7ee";

export default node;
