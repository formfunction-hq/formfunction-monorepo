/**
 * @generated SignedSource<<8d2f799f8be084be94bf528b0065cc82>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDashboardPageContent_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardCommunityUpdatesTab_CampaignV2" | "CampaignDashboardHoldersTab_CampaignV2" | "CampaignDashboardSettingsTab_CampaignV2" | "CampaignDashboardSidebar_CampaignV2">;
  readonly " $fragmentType": "CampaignDashboardPageContent_CampaignV2";
};
export type CampaignDashboardPageContent_CampaignV2$key = {
  readonly " $data"?: CampaignDashboardPageContent_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardPageContent_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDashboardPageContent_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDashboardSidebar_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDashboardSettingsTab_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDashboardHoldersTab_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDashboardCommunityUpdatesTab_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "17bbf9e2bed18483934cea9411358a99";

export default node;
