/**
 * @generated SignedSource<<520c639403aa96674f18e2a8bc89ce4e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
export type ConcludeCampaignInput = {
  campaignId: string;
};
export type CampaignDashboardSettingsTabConcludeCampaignMutation$variables = {
  input: ConcludeCampaignInput;
};
export type CampaignDashboardSettingsTabConcludeCampaignMutation$data = {
  readonly CampaignsNamespace: {
    readonly concludeCampaign: {
      readonly campaign: {
        readonly id: string;
        readonly status: CampaignStatusExpress_enum;
      };
    };
  };
};
export type CampaignDashboardSettingsTabConcludeCampaignMutation = {
  response: CampaignDashboardSettingsTabConcludeCampaignMutation$data;
  variables: CampaignDashboardSettingsTabConcludeCampaignMutation$variables;
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
    "alias": null,
    "args": null,
    "concreteType": "CampaignsNamespaceMutationResponse",
    "kind": "LinkedField",
    "name": "CampaignsNamespace",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "ConcludeCampaignResponse",
        "kind": "LinkedField",
        "name": "concludeCampaign",
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
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "status",
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignDashboardSettingsTabConcludeCampaignMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignDashboardSettingsTabConcludeCampaignMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "8becb78998cda50146a0e73cf99c3fe7",
    "id": null,
    "metadata": {},
    "name": "CampaignDashboardSettingsTabConcludeCampaignMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignDashboardSettingsTabConcludeCampaignMutation(\n  $input: ConcludeCampaignInput!\n) {\n  CampaignsNamespace {\n    concludeCampaign(input: $input) {\n      campaign {\n        id\n        status\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "cde78b1ae08f17fba979c5c767afea9a";

export default node;
