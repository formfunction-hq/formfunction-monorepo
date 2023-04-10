/**
 * @generated SignedSource<<05aae2e0078c284615e2eced8c2f968f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AssetForNftAsset_NftAsset$data = {
  readonly asset: {
    readonly dimensions: {
      readonly height: number;
      readonly width: number;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  };
  readonly nftInfo: {
    readonly mint: string;
  };
  readonly " $fragmentType": "AssetForNftAsset_NftAsset";
};
export type AssetForNftAsset_NftAsset$key = {
  readonly " $data"?: AssetForNftAsset_NftAsset$data;
  readonly " $fragmentSpreads": FragmentRefs<"AssetForNftAsset_NftAsset">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AssetForNftAsset_NftAsset",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "asset",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForAssetExpress_AssetExpress"
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetDimensions",
          "kind": "LinkedField",
          "name": "dimensions",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
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
  "type": "NftAsset",
  "abstractKey": null
};

(node as any).hash = "09e6e43b3167f39d76b9f710534f64c3";

export default node;
