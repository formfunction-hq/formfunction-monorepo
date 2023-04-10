/**
 * @generated SignedSource<<e9d90a952f1e9c9f78a7c34deb986629>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CampaignSortOrder_enum = "Newest" | "Oldest" | "%future added value";
export type CampaignSortOrderEnumQuery$variables = {
  campaignSortOrder: CampaignSortOrder_enum;
};
export type CampaignSortOrderEnumQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignsForExplore: {
      readonly __typename: "CampaignsForExploreResponse";
    };
  };
};
export type CampaignSortOrderEnumQuery = {
  response: CampaignSortOrderEnumQuery$data;
  variables: CampaignSortOrderEnumQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "campaignSortOrder"
  }
],
v1 = [
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
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "sortOrder",
                "variableName": "campaignSortOrder"
              }
            ],
            "kind": "ObjectValue",
            "name": "input"
          }
        ],
        "concreteType": "CampaignsForExploreResponse",
        "kind": "LinkedField",
        "name": "campaignsForExplore",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "__typename",
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
    "name": "CampaignSortOrderEnumQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignSortOrderEnumQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "d47f26832b8394504f22e1711cfc7cbd",
    "id": null,
    "metadata": {},
    "name": "CampaignSortOrderEnumQuery",
    "operationKind": "query",
    "text": "query CampaignSortOrderEnumQuery(\n  $campaignSortOrder: CampaignSortOrder_enum!\n) {\n  CampaignsNamespace {\n    campaignsForExplore(input: {sortOrder: $campaignSortOrder}) {\n      __typename\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f819515e923b66c1c48234bf5fb662d9";

export default node;
