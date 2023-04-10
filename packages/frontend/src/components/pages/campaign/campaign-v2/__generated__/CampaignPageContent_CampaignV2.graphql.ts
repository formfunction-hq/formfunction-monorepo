/**
 * @generated SignedSource<<35434f5b29f865ca78c5f46a22eb7292>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignPageContent_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CampaignCommunityTabContent_CampaignV2" | "CampaignHeaderGoToDashboardBanner_CampaignV2" | "useCampaignTab_CampaignV2">;
  readonly " $fragmentType": "CampaignPageContent_CampaignV2";
};
export type CampaignPageContent_CampaignV2$key = {
  readonly " $data"?: CampaignPageContent_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignPageContent_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignPageContent_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCampaignTab_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignCommunityTabContent_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignHeaderGoToDashboardBanner_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "431f52ef9731eb7ee1d969d7aa751a5b";

export default node;
