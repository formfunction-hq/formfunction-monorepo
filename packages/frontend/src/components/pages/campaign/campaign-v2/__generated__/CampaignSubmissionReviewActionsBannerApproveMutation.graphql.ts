/**
 * @generated SignedSource<<92bcfc3db9f7166b84538dd786f7a713>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ApproveCampaignInput = {
  campaignId: string;
};
export type CampaignSubmissionReviewActionsBannerApproveMutation$variables = {
  input: ApproveCampaignInput;
};
export type CampaignSubmissionReviewActionsBannerApproveMutation$data = {
  readonly CampaignsNamespace: {
    readonly approveCampaign: {
      readonly campaign: {
        readonly id: string;
      };
    };
  };
};
export type CampaignSubmissionReviewActionsBannerApproveMutation = {
  response: CampaignSubmissionReviewActionsBannerApproveMutation$data;
  variables: CampaignSubmissionReviewActionsBannerApproveMutation$variables;
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
        "concreteType": "ApproveCampaignResponse",
        "kind": "LinkedField",
        "name": "approveCampaign",
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
    "name": "CampaignSubmissionReviewActionsBannerApproveMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignSubmissionReviewActionsBannerApproveMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "be48331dd19861ee9fc1241f6462f161",
    "id": null,
    "metadata": {},
    "name": "CampaignSubmissionReviewActionsBannerApproveMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignSubmissionReviewActionsBannerApproveMutation(\n  $input: ApproveCampaignInput!\n) {\n  CampaignsNamespace {\n    approveCampaign(input: $input) {\n      campaign {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "dd636de8fff4b3dc1055ee5928b993b8";

export default node;
