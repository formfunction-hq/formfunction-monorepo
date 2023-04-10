/**
 * @generated SignedSource<<114376cb34960bfd1569154585e4eaa5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type TopCreatorStatsInput = {
  afterTime: string;
};
export type StatsBodyCreatorsQuery$variables = {
  input: TopCreatorStatsInput;
  limit: number;
};
export type StatsBodyCreatorsQuery$data = {
  readonly StatsNamespace: {
    readonly topCreatorStats: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly creator: {
            readonly ProfilePhoto: {
              readonly photoUrl: string;
            } | null;
            readonly displayName: string | null;
            readonly id: string;
            readonly username: string;
          };
          readonly numCollectors: number;
          readonly numPiecesSold: number;
          readonly totalSalesInSol: number;
        };
      }>;
    };
  };
};
export type StatsBodyCreatorsQuery = {
  response: StatsBodyCreatorsQuery$data;
  variables: StatsBodyCreatorsQuery$variables;
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
  "name": "numCollectors",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "numPiecesSold",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "totalSalesInSol",
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
    "name": "StatsBodyCreatorsQuery",
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
            "concreteType": "CreatorStatsConnection",
            "kind": "LinkedField",
            "name": "topCreatorStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreatorStatsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreatorStats",
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
                        "name": "creator",
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
    "name": "StatsBodyCreatorsQuery",
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
            "concreteType": "CreatorStatsConnection",
            "kind": "LinkedField",
            "name": "topCreatorStats",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CreatorStatsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CreatorStats",
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
                        "name": "creator",
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
    "cacheID": "ab0fbb34816961fb7e03ee490e134171",
    "id": null,
    "metadata": {},
    "name": "StatsBodyCreatorsQuery",
    "operationKind": "query",
    "text": "query StatsBodyCreatorsQuery(\n  $input: TopCreatorStatsInput!\n  $limit: Int!\n) {\n  StatsNamespace {\n    topCreatorStats(input: $input, first: $limit) {\n      edges {\n        node {\n          numCollectors\n          numPiecesSold\n          totalSalesInSol\n          creator {\n            id\n            displayName\n            username\n            ProfilePhoto {\n              photoUrl\n              id\n            }\n          }\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "13243cf10b7d768f5f9c682f3647c2dc";

export default node;
