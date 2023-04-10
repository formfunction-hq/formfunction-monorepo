/**
 * @generated SignedSource<<f4813429633fe61973592307feab05ae>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDashboardCommunityUpdatesTab_CampaignV2$data = {
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CreateAirdropsForCampaignModal_CampaignV2" | "CreatePollForCampaignModal_CampaignV2" | "CreatePostBaseForCampaignModal_CampaignV2">;
  readonly " $fragmentType": "CampaignDashboardCommunityUpdatesTab_CampaignV2";
};
export type CampaignDashboardCommunityUpdatesTab_CampaignV2$key = {
  readonly " $data"?: CampaignDashboardCommunityUpdatesTab_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardCommunityUpdatesTab_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDashboardCommunityUpdatesTab_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreateAirdropsForCampaignModal_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreatePostBaseForCampaignModal_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CreatePollForCampaignModal_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "931aa29b71b1f4dd06c4557e7b4163e0";

export default node;
