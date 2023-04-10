/**
 * @generated SignedSource<<ad79ca00a1730398a33b1f603a193588>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useGetCurrencyConfigForCurrencyExpress_CurrencyExpress$data = {
  readonly decimals: number;
  readonly mint: string;
  readonly name: CurrencyNameExpress_enum;
  readonly shortSymbol: string | null;
  readonly symbol: string;
  readonly " $fragmentType": "useGetCurrencyConfigForCurrencyExpress_CurrencyExpress";
};
export type useGetCurrencyConfigForCurrencyExpress_CurrencyExpress$key = {
  readonly " $data"?: useGetCurrencyConfigForCurrencyExpress_CurrencyExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForCurrencyExpress_CurrencyExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useGetCurrencyConfigForCurrencyExpress_CurrencyExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "decimals",
      "storageKey": null
    },
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    }
  ],
  "type": "CurrencyExpress",
  "abstractKey": null
};

(node as any).hash = "bddfa87c1b0755e2e1a5e3fbc31f1285";

export default node;
