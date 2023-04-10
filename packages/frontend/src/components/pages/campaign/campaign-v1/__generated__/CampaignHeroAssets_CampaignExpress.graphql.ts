/**
 * @generated SignedSource<<7c8f383bcfbd723029c3315778ecc1aa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHeroAssets_CampaignExpress$data = {
  readonly heroAssets: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_AssetExpress">;
  }>;
  readonly " $fragmentType": "CampaignHeroAssets_CampaignExpress";
};
export type CampaignHeroAssets_CampaignExpress$key = {
  readonly " $data"?: CampaignHeroAssets_CampaignExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_CampaignExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignHeroAssets_CampaignExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "heroAssets",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CampaignHeroAssets_AssetExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignExpress",
  "abstractKey": null
};

(node as any).hash = "bc66027b734c4560b90e461747887d73";

export default node;
