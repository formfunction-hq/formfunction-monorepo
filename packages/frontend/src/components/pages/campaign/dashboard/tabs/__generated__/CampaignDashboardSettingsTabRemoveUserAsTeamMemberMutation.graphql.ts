/**
 * @generated SignedSource<<4a2887c3a1b20b2b92abc7150c19dba7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RemoveUserAsTeamMemberFromCampaignInput = {
  campaignId: string;
  userId: string;
};
export type CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation$variables = {
  input: RemoveUserAsTeamMemberFromCampaignInput;
};
export type CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation$data = {
  readonly CampaignsNamespace: {
    readonly removeUserAsTeamMemberFromCampaign: {
      readonly campaign: {
        readonly id: string;
      };
    };
  };
};
export type CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation = {
  response: CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation$data;
  variables: CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation$variables;
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
        "concreteType": "RemoveUserAsTeamMemberFromCampaignResponse",
        "kind": "LinkedField",
        "name": "removeUserAsTeamMemberFromCampaign",
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
    "name": "CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "28cd3db5d8a7f6ded8726394e3500c72",
    "id": null,
    "metadata": {},
    "name": "CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignDashboardSettingsTabRemoveUserAsTeamMemberMutation(\n  $input: RemoveUserAsTeamMemberFromCampaignInput!\n) {\n  CampaignsNamespace {\n    removeUserAsTeamMemberFromCampaign(input: $input) {\n      campaign {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "a930eb2a48d900272e809b879844a86e";

export default node;
