/**
 * @generated SignedSource<<d7c196e69232e07079a257ea55ed5b69>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignProgressTowardsGoal_CampaignExpress$data = {
  readonly emojiMarker: string | null;
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
  readonly " $fragmentType": "CampaignProgressTowardsGoal_CampaignExpress";
};
export type CampaignProgressTowardsGoal_CampaignExpress$key = {
  readonly " $data"?: CampaignProgressTowardsGoal_CampaignExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressTowardsGoal_CampaignExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignProgressTowardsGoal_CampaignExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "emojiMarker",
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
  "type": "CampaignExpress",
  "abstractKey": null
};

(node as any).hash = "2c5b3066433891f1fc0a3ca71684b2ba";

export default node;
