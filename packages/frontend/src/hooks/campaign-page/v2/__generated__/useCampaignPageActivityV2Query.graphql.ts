/**
 * @generated SignedSource<<8a0bc290ef12ad60a88fe69d082bf2b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignV2ActivityForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type useCampaignPageActivityV2Query$variables = {
  first: number;
  input: CampaignV2ActivityForSlugInput;
};
export type useCampaignPageActivityV2Query$data = {
  readonly CampaignsNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
  };
};
export type useCampaignPageActivityV2Query = {
  response: useCampaignPageActivityV2Query$data;
  variables: useCampaignPageActivityV2Query$variables;
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
v2 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
},
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
    "name": "useCampaignPageActivityV2Query",
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
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse"
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
    "name": "useCampaignPageActivityV2Query",
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
            "args": [
              (v2/*: any*/)
            ],
            "concreteType": "CampaignV2ActivityForSlugReponse",
            "kind": "LinkedField",
            "name": "campaignV2ActivityForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": [
                  {
                    "kind": "Variable",
                    "name": "first",
                    "variableName": "first"
                  },
                  (v2/*: any*/)
                ],
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
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "505f9cbd3402d5ba3703c323ba9fd808",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageActivityV2Query",
    "operationKind": "query",
    "text": "query useCampaignPageActivityV2Query(\n  $input: CampaignV2ActivityForSlugInput!\n  $first: PaginationAmount!\n) {\n  CampaignsNamespace {\n    ...CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse\n  }\n}\n\nfragment CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ActivityForSlug(input: $input) {\n    campaignActivity(first: $first, input: $input) {\n      edges {\n        node {\n          id\n          ...CampaignActivityItemForNftTransaction_NftTransactionExpress\n        }\n      }\n    }\n  }\n}\n\nfragment CampaignActivityItemForNftTransaction_NftTransactionExpress on NftTransactionExpress {\n  fromAddress\n  toAddress\n  nftInfo {\n    assetHeight\n    assetWidth\n    edition\n    maxSupplyOfMasterEdition\n    mint\n    name\n  }\n  timeCreated\n  type\n  From {\n    username\n    id\n  }\n  To {\n    username\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "6c60d77fac5a101bd28433b9ffb52366";

export default node;
