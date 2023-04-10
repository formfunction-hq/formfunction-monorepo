/**
 * @generated SignedSource<<07d2343cc5585944df408f2554b2cb0b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal$data = {
  readonly currentAmount: number;
  readonly goalAmount: number;
  readonly " $fragmentType": "CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal";
};
export type CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal$key = {
  readonly " $data"?: CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "goalAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentAmount",
      "storageKey": null
    }
  ],
  "type": "CampaignSaleCountGoal",
  "abstractKey": null
};

(node as any).hash = "6355be6486784f06b67e9aa337a0ac11";

export default node;
