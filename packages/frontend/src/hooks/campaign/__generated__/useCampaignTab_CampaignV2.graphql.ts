/**
 * @generated SignedSource<<e69a612acf9224759e38ce22a2afe393>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCampaignTab_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useCanViewerViewCommunityTab_CampaignV2">;
  readonly " $fragmentType": "useCampaignTab_CampaignV2";
};
export type useCampaignTab_CampaignV2$key = {
  readonly " $data"?: useCampaignTab_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCampaignTab_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCampaignTab_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCanViewerViewCommunityTab_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "0f813693b745e4151287325061506ba2";

export default node;
