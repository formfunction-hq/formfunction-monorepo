/**
 * @generated SignedSource<<9583511f12a499e190be061f84df2e1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignProgressTowardsGoalForCampaignV2_CampaignV2$data = {
  readonly goal: {
    readonly __typename: "CampaignMonetaryGoal";
    readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal">;
  } | {
    readonly __typename: "CampaignSaleCountGoal";
    readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly goalProgressSymbol: string;
  readonly " $fragmentType": "CampaignProgressTowardsGoalForCampaignV2_CampaignV2";
};
export type CampaignProgressTowardsGoalForCampaignV2_CampaignV2$key = {
  readonly " $data"?: CampaignProgressTowardsGoalForCampaignV2_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressTowardsGoalForCampaignV2_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignProgressTowardsGoalForCampaignV2_CampaignV2",
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
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal"
            }
          ],
          "type": "CampaignMonetaryGoal",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal"
            }
          ],
          "type": "CampaignSaleCountGoal",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "63ae1fb010efa5dd5ec9fa41ca907c1c";

export default node;
