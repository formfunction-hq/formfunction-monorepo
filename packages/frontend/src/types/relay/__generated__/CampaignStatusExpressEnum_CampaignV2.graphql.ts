/**
 * @generated SignedSource<<64fb6283db2d404bc817b5ff9afe6655>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignStatusExpressEnum_CampaignV2$data = {
  readonly status: CampaignStatusExpress_enum;
  readonly " $fragmentType": "CampaignStatusExpressEnum_CampaignV2";
};
export type CampaignStatusExpressEnum_CampaignV2$key = {
  readonly " $data"?: CampaignStatusExpressEnum_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignStatusExpressEnum_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignStatusExpressEnum_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "525d41c15a01d635e8b0d936a09dd726";

export default node;
