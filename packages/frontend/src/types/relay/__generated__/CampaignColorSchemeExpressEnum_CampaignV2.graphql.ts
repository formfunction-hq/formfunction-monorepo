/**
 * @generated SignedSource<<6ebd19d906f93da4bac844e5abc4f68d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignColorSchemeExpress_enum = "AliceBlueSinopia" | "AntiFlashWhiteDarkGunmetal" | "BrightGrayMediumBlue" | "CulturedCadmiumGreen" | "GreenishGrayMidnightBlue" | "SeashellMaximumRed" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignColorSchemeExpressEnum_CampaignV2$data = {
  readonly colorScheme: CampaignColorSchemeExpress_enum;
  readonly " $fragmentType": "CampaignColorSchemeExpressEnum_CampaignV2";
};
export type CampaignColorSchemeExpressEnum_CampaignV2$key = {
  readonly " $data"?: CampaignColorSchemeExpressEnum_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignColorSchemeExpressEnum_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignColorSchemeExpressEnum_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "colorScheme",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "ebc6073c3bc5fc1f1470585bec1bdeaa";

export default node;
