/**
 * @generated SignedSource<<2a7d057f8c0e49afd690f34b56ff6c6b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrencyName_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type ExchangeRatesContextQuery$variables = {};
export type ExchangeRatesContextQuery$data = {
  readonly Currency: ReadonlyArray<{
    readonly name: CurrencyName_enum;
    readonly solRate: any | null;
    readonly usdRate: any | null;
  }>;
};
export type ExchangeRatesContextQuery = {
  response: ExchangeRatesContextQuery$data;
  variables: ExchangeRatesContextQuery$variables;
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
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "usdRate",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "solRate",
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
    "name": "ExchangeRatesContextQuery",
    "selections": (v0/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ExchangeRatesContextQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "ffe69ee294362d19fa1afc50cd5b1483",
    "id": null,
    "metadata": {},
    "name": "ExchangeRatesContextQuery",
    "operationKind": "query",
    "text": "query ExchangeRatesContextQuery {\n  Currency {\n    name\n    usdRate\n    solRate\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f6c0b2bfd610abab64b5f9b599c6ab9";

export default node;
