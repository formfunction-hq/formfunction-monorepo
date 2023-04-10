/**
 * @generated SignedSource<<176058026103400ff794828f196844d0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TagNumResultsQuery$variables = {
  tag: string;
};
export type TagNumResultsQuery$data = {
  readonly NftToTag_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
};
export type TagNumResultsQuery = {
  response: TagNumResultsQuery$data;
  variables: TagNumResultsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "tag"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "kind": "Variable",
                    "name": "_eq",
                    "variableName": "tag"
                  }
                ],
                "kind": "ObjectValue",
                "name": "value"
              }
            ],
            "kind": "ObjectValue",
            "name": "Tag"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "NftToTag_aggregate",
    "kind": "LinkedField",
    "name": "NftToTag_aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "NftToTag_aggregate_fields",
        "kind": "LinkedField",
        "name": "aggregate",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "count",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TagNumResultsQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TagNumResultsQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "0f07d08dcfd732e844976d9be9a377c3",
    "id": null,
    "metadata": {},
    "name": "TagNumResultsQuery",
    "operationKind": "query",
    "text": "query TagNumResultsQuery(\n  $tag: String!\n) {\n  NftToTag_aggregate(where: {Tag: {value: {_eq: $tag}}}) {\n    aggregate {\n      count\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "9947f1cfca210bede5ec2ac6fcad2305";

export default node;
