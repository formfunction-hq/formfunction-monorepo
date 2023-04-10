/**
 * @generated SignedSource<<6deabfb4078a59561f2e85c5e8a4cd8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AssetForAsset_Asset$data = {
  readonly contentType: string;
  readonly downloadUrl: string;
  readonly videoPlaybackId: string | null;
  readonly " $fragmentType": "AssetForAsset_Asset";
};
export type AssetForAsset_Asset$key = {
  readonly " $data"?: AssetForAsset_Asset$data;
  readonly " $fragmentSpreads": FragmentRefs<"AssetForAsset_Asset">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AssetForAsset_Asset",
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
      "kind": "ScalarField",
      "name": "downloadUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "videoPlaybackId",
      "storageKey": null
    }
  ],
  "type": "Asset",
  "abstractKey": null
};

(node as any).hash = "7705a0a9d5ac7e55825934964561937b";

export default node;
