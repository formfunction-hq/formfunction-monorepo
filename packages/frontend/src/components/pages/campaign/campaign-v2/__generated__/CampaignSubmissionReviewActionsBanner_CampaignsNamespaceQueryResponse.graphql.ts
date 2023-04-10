/**
 * @generated SignedSource<<9bef88ca8a941ad53ef0184fd0b370bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ForSlug: {
    readonly campaign: {
      readonly id: string;
      readonly status: CampaignStatusExpress_enum;
    } | null;
  };
  readonly " $fragmentType": "CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse";
};
export type CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse",
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
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};

(node as any).hash = "bf4d540a4600e2b983303e6f97d7170b";

export default node;
