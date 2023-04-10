/**
 * @generated SignedSource<<ddc958b4f1b048638a4617193a4db9f2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrencyName_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type CurrencySelect_Query$variables = {};
export type CurrencySelect_Query$data = {
  readonly Currency: ReadonlyArray<{
    readonly decimals: number;
    readonly iconSrc: string | null;
    readonly mint: string;
    readonly name: CurrencyName_enum;
    readonly shortSymbol: string | null;
    readonly symbol: string;
  }>;
};
export type CurrencySelect_Query = {
  response: CurrencySelect_Query$data;
  variables: CurrencySelect_Query$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Currency",
    "kind": "LinkedField",
    "name": "Currency",
    "plural": true,
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
        "name": "iconSrc",
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
        "name": "shortSymbol",
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
        "name": "mint",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CurrencySelect_Query",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "CurrencySelect_Query",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a804f09745b033d9e81744a442ea79e0",
    "id": null,
    "metadata": {},
    "name": "CurrencySelect_Query",
    "operationKind": "query",
    "text": "query CurrencySelect_Query {\n  Currency {\n    decimals\n    iconSrc\n    name\n    shortSymbol\n    symbol\n    mint\n  }\n}\n"
  }
};
})();

(node as any).hash = "36736a711639439624bcda79fdaa1547";

export default node;
