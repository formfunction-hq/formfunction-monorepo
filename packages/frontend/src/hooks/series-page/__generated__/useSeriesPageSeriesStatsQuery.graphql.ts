/**
 * @generated SignedSource<<4fa668a6a76869bf50ea1b97cd4251b6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesStatsInput = {
  creatorId?: string | null;
  creatorUsername?: string | null;
  seriesSlug: string;
};
export type useSeriesPageSeriesStatsQuery$variables = {
  input: SeriesStatsInput;
};
export type useSeriesPageSeriesStatsQuery$data = {
  readonly SeriesNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"SeriesStats_SeriesNamespaceResponse">;
  };
};
export type useSeriesPageSeriesStatsQuery = {
  response: useSeriesPageSeriesStatsQuery$data;
  variables: useSeriesPageSeriesStatsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useSeriesPageSeriesStatsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SeriesNamespaceResponse",
        "kind": "LinkedField",
        "name": "SeriesNamespace",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SeriesStats_SeriesNamespaceResponse"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useSeriesPageSeriesStatsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "SeriesNamespaceResponse",
        "kind": "LinkedField",
        "name": "SeriesNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": [
              {
                "kind": "Variable",
                "name": "input",
                "variableName": "input"
              }
            ],
            "concreteType": "SeriesStatsResponse",
            "kind": "LinkedField",
            "name": "seriesStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "floorPriceInLamports",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "volumeInLamports",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ff6abc5a73d455fae6b341dbb89c4181",
    "id": null,
    "metadata": {},
    "name": "useSeriesPageSeriesStatsQuery",
    "operationKind": "query",
    "text": "query useSeriesPageSeriesStatsQuery(\n  $input: SeriesStatsInput!\n) {\n  SeriesNamespace {\n    ...SeriesStats_SeriesNamespaceResponse\n  }\n}\n\nfragment SeriesStats_SeriesNamespaceResponse on SeriesNamespaceResponse {\n  seriesStats(input: $input) {\n    floorPriceInLamports\n    volumeInLamports\n  }\n}\n"
  }
};
})();

(node as any).hash = "02045475892afca26da8abe3bd9a2767";

export default node;
