/**
 * @generated SignedSource<<3f2c9ec1be1525f9d41dd408488cac74>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal$data = {
  readonly currentAmount: number;
  readonly goalAmount: number;
  readonly " $fragmentType": "ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal";
};
export type ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal$key = {
  readonly " $data"?: ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal",
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

(node as any).hash = "044f07523969dda64ff89248767732fc";

export default node;
