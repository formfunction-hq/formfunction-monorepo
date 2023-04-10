/**
 * @generated SignedSource<<f6eab02b34ad167e6c06d7317684de13>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AttributesForSeriesInput = {
  creatorId?: string | null;
  creatorUsername?: string | null;
  seriesSlug: string;
};
export type useGenerativeSeriesPageAttributesQuery$variables = {
  input: AttributesForSeriesInput;
};
export type useGenerativeSeriesPageAttributesQuery$data = {
  readonly attributesForSeries: {
    readonly " $fragmentSpreads": FragmentRefs<"GenerativeSeriesFilters_AttributesForSeriesResponse">;
  } | null;
};
export type useGenerativeSeriesPageAttributesQuery = {
  response: useGenerativeSeriesPageAttributesQuery$data;
  variables: useGenerativeSeriesPageAttributesQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useGenerativeSeriesPageAttributesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AttributesForSeriesResponse",
        "kind": "LinkedField",
        "name": "attributesForSeries",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GenerativeSeriesFilters_AttributesForSeriesResponse"
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
    "name": "useGenerativeSeriesPageAttributesQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "AttributesForSeriesResponse",
        "kind": "LinkedField",
        "name": "attributesForSeries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AttributesForSeriesTrait",
            "kind": "LinkedField",
            "name": "traits",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "count",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "traitName",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "traitValue",
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
    "cacheID": "01bab347db5681127a1b8db465d25460",
    "id": null,
    "metadata": {},
    "name": "useGenerativeSeriesPageAttributesQuery",
    "operationKind": "query",
    "text": "query useGenerativeSeriesPageAttributesQuery(\n  $input: AttributesForSeriesInput!\n) {\n  attributesForSeries(input: $input) {\n    ...GenerativeSeriesFilters_AttributesForSeriesResponse\n  }\n}\n\nfragment GenerativeSeriesFilters_AttributesForSeriesResponse on AttributesForSeriesResponse {\n  traits {\n    count\n    traitName\n    traitValue\n  }\n}\n"
  }
};
})();

(node as any).hash = "7a59655de586e9697d11c959ea7b969b";

export default node;
