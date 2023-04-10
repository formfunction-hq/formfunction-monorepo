/**
 * @generated SignedSource<<cd88ff570cc829801f4c071e69c747cb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
export type CampaignsForUserInput = {
  statuses?: ReadonlyArray<CampaignStatusExpress_enum> | null;
  userId?: string | null;
  username?: string | null;
  viewerId?: string | null;
};
export type CampaignManageCampaignsPageQuery$variables = {
  after?: string | null;
  first: number;
  input: CampaignsForUserInput;
};
export type CampaignManageCampaignsPageQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignsForUser: {
      readonly campaigns: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly creator: {
              readonly id: string;
            };
            readonly id: string;
            readonly status: CampaignStatusExpress_enum;
            readonly " $fragmentSpreads": FragmentRefs<"CampaignManageCampaignsCard_CampaignV2">;
          };
        }>;
      } | null;
    };
  };
};
export type CampaignManageCampaignsPageQuery = {
  response: CampaignManageCampaignsPageQuery$data;
  variables: CampaignManageCampaignsPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
},
v2 = [
  (v1/*: any*/)
],
v3 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  (v1/*: any*/)
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignManageCampaignsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "CampaignsForUserResponse",
            "kind": "LinkedField",
            "name": "campaignsForUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "CampaignsConnection",
                "kind": "LinkedField",
                "name": "campaigns",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignsEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CampaignV2",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "creator",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "CampaignManageCampaignsCard_CampaignV2"
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
    "name": "CampaignManageCampaignsPageQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "CampaignsForUserResponse",
            "kind": "LinkedField",
            "name": "campaignsForUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v3/*: any*/),
                "concreteType": "CampaignsConnection",
                "kind": "LinkedField",
                "name": "campaigns",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignsEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CampaignV2",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "creator",
                            "plural": false,
                            "selections": [
                              (v4/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "slug",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "goalProgressSymbol",
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
    "cacheID": "fb1fc2e80794ef4c7d39f1ff47b6387e",
    "id": null,
    "metadata": {},
    "name": "CampaignManageCampaignsPageQuery",
    "operationKind": "query",
    "text": "query CampaignManageCampaignsPageQuery(\n  $after: String\n  $first: PaginationAmount!\n  $input: CampaignsForUserInput!\n) {\n  CampaignsNamespace {\n    campaignsForUser(input: $input) {\n      campaigns(after: $after, first: $first, input: $input) {\n        edges {\n          node {\n            id\n            creator {\n              id\n            }\n            status\n            ...CampaignManageCampaignsCard_CampaignV2\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment CampaignManageCampaignsCard_CampaignV2 on CampaignV2 {\n  status\n  title\n  slug\n  goalProgressSymbol\n  creator {\n    id\n    username\n  }\n}\n"
  }
};
})();

(node as any).hash = "9dbdca1e79d3ef507dcaa5e2294b2a1f";

export default node;
