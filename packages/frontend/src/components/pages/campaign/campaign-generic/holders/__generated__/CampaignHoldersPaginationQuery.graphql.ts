/**
 * @generated SignedSource<<40b3db78041795999a96969447d65c82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHoldersForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
  fundingTierIds?: ReadonlyArray<string> | null;
  viewerId?: string | null;
};
export type CampaignHoldersPaginationQuery$variables = {
  after?: string | null;
  first: number;
  input: CampaignHoldersForSlugInput;
};
export type CampaignHoldersPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHolders_Query">;
};
export type CampaignHoldersPaginationQuery = {
  response: CampaignHoldersPaginationQuery$data;
  variables: CampaignHoldersPaginationQuery$variables;
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
v1 = [
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
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignHoldersPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "CampaignHolders_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignHoldersPaginationQuery",
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
            "args": null,
            "concreteType": "CampaignHoldersForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignHoldersForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "HolderConnection",
                "kind": "LinkedField",
                "name": "holders",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "HolderEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Holder",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "user",
                            "plural": false,
                            "selections": [
                              (v2/*: any*/),
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "username",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "PhotoExpress",
                                "kind": "LinkedField",
                                "name": "ProfilePhoto",
                                "plural": false,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "photoUrl",
                                    "storageKey": null
                                  },
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "__typename",
                            "storageKey": null
                          }
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v1/*: any*/),
                "filters": [
                  "input"
                ],
                "handle": "connection",
                "key": "CampaignHolders_holders",
                "kind": "LinkedHandle",
                "name": "holders"
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
    "cacheID": "462e4d5718d8e57f3c2333ad91821c2a",
    "id": null,
    "metadata": {},
    "name": "CampaignHoldersPaginationQuery",
    "operationKind": "query",
    "text": "query CampaignHoldersPaginationQuery(\n  $after: String\n  $first: PaginationAmount!\n  $input: CampaignHoldersForSlugInput!\n) {\n  ...CampaignHolders_Query\n}\n\nfragment CampaignHolders_Query on query_root {\n  CampaignsNamespace {\n    campaignHoldersForSlug {\n      holders(input: $input, after: $after, first: $first) {\n        edges {\n          node {\n            user {\n              id\n              ...ProfileLinkForUserExpress_UserExpress\n            }\n            __typename\n          }\n          cursor\n        }\n        pageInfo {\n          endCursor\n          hasNextPage\n        }\n      }\n    }\n  }\n}\n\nfragment ProfileLinkForUserExpress_UserExpress on UserExpress {\n  id\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "e1a16315a2d1687152bf7dec48aef7e9";

export default node;
