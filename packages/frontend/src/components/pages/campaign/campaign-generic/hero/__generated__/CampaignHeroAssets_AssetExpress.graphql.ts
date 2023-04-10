/**
 * @generated SignedSource<<d0b715af6cdb905d092eb3a533f858e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHeroAssets_AssetExpress$data = ReadonlyArray<{
  readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  readonly " $fragmentType": "CampaignHeroAssets_AssetExpress";
}>;
export type CampaignHeroAssets_AssetExpress$key = ReadonlyArray<{
  readonly " $data"?: CampaignHeroAssets_AssetExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_AssetExpress">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CampaignHeroAssets_AssetExpress",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AssetForAssetExpress_AssetExpress"
    }
  ],
  "type": "AssetExpress",
  "abstractKey": null
};

(node as any).hash = "016fa3add5252fbeb29acfa97066800b";

export default node;
