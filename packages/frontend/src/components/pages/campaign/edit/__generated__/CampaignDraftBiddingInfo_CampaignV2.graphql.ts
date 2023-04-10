/**
 * @generated SignedSource<<d827c2fdfdd49597a3c273e42291839e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDraftBiddingInfo_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDraftCampaignProgressTowardsGoal_CampaignV2">;
  readonly " $fragmentType": "CampaignDraftBiddingInfo_CampaignV2";
};
export type CampaignDraftBiddingInfo_CampaignV2$key = {
  readonly " $data"?: CampaignDraftBiddingInfo_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDraftBiddingInfo_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDraftBiddingInfo_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDraftCampaignProgressTowardsGoal_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "c78284eb9365a6ee690707fac77db1b5";

export default node;
