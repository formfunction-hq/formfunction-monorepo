/**
 * @generated SignedSource<<6e162b8a269a4809b9ff9208d3ce5f8a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignCategoryExpress_enum = "Art" | "Brand" | "Comics" | "Culture" | "DanceAndTheater" | "Design" | "Education" | "Fashion" | "FilmAndVideo" | "Food" | "Games" | "Music" | "Photography" | "Podcasts" | "Product" | "Writing" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignCategoryExpressEnum_CampaignV2$data = {
  readonly category: CampaignCategoryExpress_enum;
  readonly " $fragmentType": "CampaignCategoryExpressEnum_CampaignV2";
};
export type CampaignCategoryExpressEnum_CampaignV2$key = {
  readonly " $data"?: CampaignCategoryExpressEnum_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignCategoryExpressEnum_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignCategoryExpressEnum_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "category",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "9a68cba06c5381b4b9b987210fbb0b34";

export default node;
