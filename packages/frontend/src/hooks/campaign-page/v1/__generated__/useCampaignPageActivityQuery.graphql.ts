/**
 * @generated SignedSource<<f75542fcc12cf46db5e2439800fc5817>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignActivityForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type useCampaignPageActivityQuery$variables = {
  first: number;
  input: CampaignActivityForSlugInput;
};
export type useCampaignPageActivityQuery$data = {
  readonly campaignActivityForSlug: {
    readonly campaignActivity: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"CampaignActivityItemForNftTransaction_NftTransactionExpress">;
        };
      }>;
    } | null;
  };
};
export type useCampaignPageActivityQuery = {
  response: useCampaignPageActivityQuery$data;
  variables: useCampaignPageActivityQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "first"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "input"
},
v2 = [
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  },
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useCampaignPageActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignActivityForSlugResponse",
        "kind": "LinkedField",
        "name": "campaignActivityForSlug",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "NftTransactionsConnection",
            "kind": "LinkedField",
            "name": "campaignActivity",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftTransactionsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftTransactionExpress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "CampaignActivityItemForNftTransaction_NftTransactionExpress"
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
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "useCampaignPageActivityQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignActivityForSlugResponse",
        "kind": "LinkedField",
        "name": "campaignActivityForSlug",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "NftTransactionsConnection",
            "kind": "LinkedField",
            "name": "campaignActivity",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "NftTransactionsEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftTransactionExpress",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "fromAddress",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "toAddress",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftTransactionNftInfo",
                        "kind": "LinkedField",
                        "name": "nftInfo",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assetHeight",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assetWidth",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "edition",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "maxSupplyOfMasterEdition",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "mint",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "name",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "timeCreated",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "type",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "From",
                        "plural": false,
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "To",
                        "plural": false,
                        "selections": (v4/*: any*/),
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
    "cacheID": "0a4c88276ccf9007569a1589f6f050b7",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageActivityQuery",
    "operationKind": "query",
    "text": "query useCampaignPageActivityQuery(\n  $input: CampaignActivityForSlugInput!\n  $first: PaginationAmount!\n) {\n  campaignActivityForSlug {\n    campaignActivity(first: $first, input: $input) {\n      edges {\n        node {\n          id\n          ...CampaignActivityItemForNftTransaction_NftTransactionExpress\n        }\n      }\n    }\n  }\n}\n\nfragment CampaignActivityItemForNftTransaction_NftTransactionExpress on NftTransactionExpress {\n  fromAddress\n  toAddress\n  nftInfo {\n    assetHeight\n    assetWidth\n    edition\n    maxSupplyOfMasterEdition\n    mint\n    name\n  }\n  timeCreated\n  type\n  From {\n    username\n    id\n  }\n  To {\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "be4f1fde465cdd2799a42b5db4380cb0";

export default node;
