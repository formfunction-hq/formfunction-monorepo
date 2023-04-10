/**
 * @generated SignedSource<<498f713a292676e6be644301d391400c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2$data = {
  readonly nftAssets: ReadonlyArray<{
    readonly nftInfo: {
      readonly mint: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNftAsset_NftAsset">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2_CampaignV2">;
  readonly " $fragmentType": "ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2";
};
export type ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2$key = {
  readonly " $data"?: ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ExploreCampaignCardForCampaignV2_CampaignV2"
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "input",
          "value": {
            "first": 3
          }
        }
      ],
      "concreteType": "NftAsset",
      "kind": "LinkedField",
      "name": "nftAssets",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForNftAsset_NftAsset"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "NftAssetNftInfo",
          "kind": "LinkedField",
          "name": "nftInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "mint",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "nftAssets(input:{\"first\":3})"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "c0c8b5d595a681147d225248ca20d074";

export default node;
