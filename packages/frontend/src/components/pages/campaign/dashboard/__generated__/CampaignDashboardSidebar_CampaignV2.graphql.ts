/**
 * @generated SignedSource<<825bb449dea725f29c17cc749b01bb5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDashboardSidebar_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useCanViewerEditCampaign_CampaignV2">;
  readonly " $fragmentType": "CampaignDashboardSidebar_CampaignV2";
};
export type CampaignDashboardSidebar_CampaignV2$key = {
  readonly " $data"?: CampaignDashboardSidebar_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardSidebar_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDashboardSidebar_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCanViewerEditCampaign_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "e0ed6dfe008d12aa287cca63e3159ec5";

export default node;
