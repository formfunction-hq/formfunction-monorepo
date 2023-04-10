/**
 * @generated SignedSource<<8612a9ed30124722829f764581d3b27c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type Currency_Price$data = {
  readonly currencyInfo: {
    readonly name: CurrencyNameExpress_enum;
  };
  readonly " $fragmentType": "Currency_Price";
};
export type Currency_Price$key = {
  readonly " $data"?: Currency_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"Currency_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Currency_Price",
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
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "0c2ee0ef389ee39cfab4aa55b1ff8910";

export default node;
