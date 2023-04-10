/**
 * @generated SignedSource<<73ef8f3608a642522173068a3b443798>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreatePollForCampaignModal_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilityInput_CampaignV2">;
  readonly " $fragmentType": "CreatePollForCampaignModal_CampaignV2";
};
export type CreatePollForCampaignModal_CampaignV2$key = {
  readonly " $data"?: CreatePollForCampaignModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreatePollForCampaignModal_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreatePollForCampaignModal_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostVisibilityInput_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "7810ac511833f2d15b4594406b90f69a";

export default node;
