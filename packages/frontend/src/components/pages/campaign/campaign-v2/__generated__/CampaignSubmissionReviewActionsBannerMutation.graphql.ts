/**
 * @generated SignedSource<<0a4c04fcc143533856b0cdbadd31ff27>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RejectCampaignInput = {
  campaignId: string;
  feedback?: string | null;
  isPermaReject: boolean;
};
export type CampaignSubmissionReviewActionsBannerMutation$variables = {
  input: RejectCampaignInput;
};
export type CampaignSubmissionReviewActionsBannerMutation$data = {
  readonly CampaignsNamespace: {
    readonly rejectCampaign: {
      readonly campaign: {
        readonly id: string;
      };
    };
  };
};
export type CampaignSubmissionReviewActionsBannerMutation = {
  response: CampaignSubmissionReviewActionsBannerMutation$data;
  variables: CampaignSubmissionReviewActionsBannerMutation$variables;
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
        "concreteType": "RejectCampaignResponse",
        "kind": "LinkedField",
        "name": "rejectCampaign",
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
    "name": "CampaignSubmissionReviewActionsBannerMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignSubmissionReviewActionsBannerMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "cff62a858017eb272f6473d2a395ac95",
    "id": null,
    "metadata": {},
    "name": "CampaignSubmissionReviewActionsBannerMutation",
    "operationKind": "mutation",
    "text": "mutation CampaignSubmissionReviewActionsBannerMutation(\n  $input: RejectCampaignInput!\n) {\n  CampaignsNamespace {\n    rejectCampaign(input: $input) {\n      campaign {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4be86e7e5c96678b02646b219a02f8e5";

export default node;
