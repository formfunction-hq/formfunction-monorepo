/**
 * @generated SignedSource<<ec4218d2f4bbc6120130952e7534f8c4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignAbout_CampaignExpress$data = {
  readonly about: string;
  readonly " $fragmentType": "CampaignAbout_CampaignExpress";
};
export type CampaignAbout_CampaignExpress$key = {
  readonly " $data"?: CampaignAbout_CampaignExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignAbout_CampaignExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignAbout_CampaignExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "about",
      "storageKey": null
    }
  ],
  "type": "CampaignExpress",
  "abstractKey": null
};

(node as any).hash = "283f5e72fe2b6098894bdce236921c28";

export default node;
