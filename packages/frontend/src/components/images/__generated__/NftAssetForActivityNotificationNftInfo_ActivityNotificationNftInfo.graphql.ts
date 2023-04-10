/**
 * @generated SignedSource<<c65c07563297675e4fc9bf63525d7ae8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo$data = {
  readonly mint: string;
  readonly nftAsset: {
    readonly contentType: string;
    readonly dimensions: {
      readonly height: number;
      readonly width: number;
    } | null;
    readonly downloadUrl: string;
  };
  readonly " $fragmentType": "NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo";
};
export type NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo$key = {
  readonly " $data"?: NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "nftAsset",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "contentType",
          "storageKey": null
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "downloadUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationNftInfo",
  "abstractKey": null
};

(node as any).hash = "8e57415dc11e4ecc3bde7ee3e50f464f";

export default node;
