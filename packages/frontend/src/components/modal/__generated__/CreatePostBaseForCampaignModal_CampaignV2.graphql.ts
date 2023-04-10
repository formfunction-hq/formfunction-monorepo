/**
 * @generated SignedSource<<83ba3d00d10f49ab12031de59cffb164>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreatePostBaseForCampaignModal_CampaignV2$data = {
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilityInput_CampaignV2">;
  readonly " $fragmentType": "CreatePostBaseForCampaignModal_CampaignV2";
};
export type CreatePostBaseForCampaignModal_CampaignV2$key = {
  readonly " $data"?: CreatePostBaseForCampaignModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreatePostBaseForCampaignModal_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreatePostBaseForCampaignModal_CampaignV2",
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

(node as any).hash = "d8f2c7419a8f4eba78c07567d804ba8d";

export default node;
