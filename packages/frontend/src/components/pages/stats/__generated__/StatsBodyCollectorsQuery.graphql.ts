/**
 * @generated SignedSource<<e3288e76d8afd61c0c4ea1dc7a418a03>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TopCollectorStatsInput = {
  afterTime: string;
};
export type StatsBodyCollectorsQuery$variables = {
  input: TopCollectorStatsInput;
  limit: number;
};
export type StatsBodyCollectorsQuery$data = {
  readonly StatsNamespace: {
    readonly topCollectorStats: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly collector: {
            readonly ProfilePhoto: {
              readonly photoUrl: string;
            } | null;
            readonly displayName: string | null;
            readonly id: string;
            readonly username: string;
          };
          readonly numCreatorsSupported: number;
          readonly numPiecesBought: number;
          readonly totalPaidInSol: number;
        };
      }>;
    };
  };
};
export type StatsBodyCollectorsQuery = {
  response: StatsBodyCollectorsQuery$data;
  variables: StatsBodyCollectorsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "limit"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "limit"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numCreatorsSupported",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numPiecesBought",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalPaidInSol",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "displayName",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "StatsBodyCollectorsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StatsNamespaceResponse",
        "kind": "LinkedField",
        "name": "StatsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CollectorStatsConnection",
            "kind": "LinkedField",
            "name": "topCollectorStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CollectorStatsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CollectorStats",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "collector",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PhotoExpress",
                            "kind": "LinkedField",
                            "name": "ProfilePhoto",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "StatsBodyCollectorsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "StatsNamespaceResponse",
        "kind": "LinkedField",
        "name": "StatsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "CollectorStatsConnection",
            "kind": "LinkedField",
            "name": "topCollectorStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CollectorStatsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CollectorStats",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      (v3/*: any*/),
                      (v4/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "collector",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          (v6/*: any*/),
                          (v7/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PhotoExpress",
                            "kind": "LinkedField",
                            "name": "ProfilePhoto",
                            "plural": false,
                            "selections": [
                              (v8/*: any*/),
                              (v5/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
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
    "cacheID": "326c4875111dd8cdbe8bd40d05fe75fc",
    "id": null,
    "metadata": {},
    "name": "StatsBodyCollectorsQuery",
    "operationKind": "query",
    "text": "query StatsBodyCollectorsQuery(\n  $input: TopCollectorStatsInput!\n  $limit: Int!\n) {\n  StatsNamespace {\n    topCollectorStats(input: $input, first: $limit) {\n      edges {\n        node {\n          numCreatorsSupported\n          numPiecesBought\n          totalPaidInSol\n          collector {\n            id\n            displayName\n            username\n            ProfilePhoto {\n              photoUrl\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8eb0d9efe1c784f1bfd6ebdd9d9efca5";

export default node;
