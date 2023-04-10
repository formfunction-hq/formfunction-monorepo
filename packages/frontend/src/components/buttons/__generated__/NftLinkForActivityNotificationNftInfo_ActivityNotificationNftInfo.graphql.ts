/**
 * @generated SignedSource<<0f6ed5f0dca41553d2ff3a07ca46a3e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo$data = {
  readonly mint: string;
  readonly name: string;
  readonly nftAsset: {
    readonly dimensions: {
      readonly height: number;
      readonly width: number;
    } | null;
  };
  readonly " $fragmentType": "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo";
};
export type NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo$key = {
  readonly " $data"?: NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo",
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
      "kind": "ScalarField",
      "name": "name",
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
    }
  ],
  "type": "ActivityNotificationNftInfo",
  "abstractKey": null
};

(node as any).hash = "18d58b7decdc97474861680ca8e0009c";

export default node;
