/**
 * @generated SignedSource<<81b16f0a2ca0e416fe94c6d71925b94e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignV2ForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type useCampaignPageCampaignV2GoalQuery$variables = {
  input: CampaignV2ForSlugInput;
};
export type useCampaignPageCampaignV2GoalQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignV2ForSlug: {
      readonly campaign: {
        readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressTowardsGoalForCampaignV2_CampaignV2">;
      } | null;
    };
  };
};
export type useCampaignPageCampaignV2GoalQuery = {
  response: useCampaignPageCampaignV2GoalQuery$data;
  variables: useCampaignPageCampaignV2GoalQuery$variables;
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
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentAmount",
  "storageKey": null
},
v4 = {
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
    "name": "useCampaignPageCampaignV2GoalQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignV2ForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignV2ForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaign",
                "plural": false,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignProgressTowardsGoalForCampaignV2_CampaignV2"
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
    "name": "useCampaignPageCampaignV2GoalQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignV2ForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignV2ForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignV2",
                "kind": "LinkedField",
                "name": "campaign",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "goalProgressSymbol",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "goal",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CurrencyExpress",
                            "kind": "LinkedField",
                            "name": "currency",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "decimals",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shortSymbol",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "symbol",
                                "storageKey": null
                              },
                              (v4/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CampaignMonetaryGoal",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          (v3/*: any*/)
                        ],
                        "type": "CampaignSaleCountGoal",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v4/*: any*/)
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
    "cacheID": "4cc8844ecd0496c3d83e3a952b8040c5",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageCampaignV2GoalQuery",
    "operationKind": "query",
    "text": "query useCampaignPageCampaignV2GoalQuery(\n  $input: CampaignV2ForSlugInput!\n) {\n  CampaignsNamespace {\n    campaignV2ForSlug(input: $input) {\n      campaign {\n        ...CampaignProgressTowardsGoalForCampaignV2_CampaignV2\n        id\n      }\n    }\n  }\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment CampaignProgressTowardsGoalForCampaignV2_CampaignV2 on CampaignV2 {\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "f5c2e0a3fa9588d8fbaf8a36ad9c9dcd";

export default node;
