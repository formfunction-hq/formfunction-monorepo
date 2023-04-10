/**
 * @generated SignedSource<<591007fac4f8325a6e742790a7e6b068>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AssetForAssetExpress_AssetExpress$data = {
  readonly contentType: string;
  readonly darkModeInfo: {
    readonly downloadUrl: string;
  } | null;
  readonly downloadUrl: string;
  readonly videoPlaybackId: string | null;
  readonly " $fragmentType": "AssetForAssetExpress_AssetExpress";
};
export type AssetForAssetExpress_AssetExpress$key = {
  readonly " $data"?: AssetForAssetExpress_AssetExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AssetForAssetExpress_AssetExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contentType",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetDarkModeInfo",
      "kind": "LinkedField",
      "name": "darkModeInfo",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
  "type": "AssetExpress",
  "abstractKey": null
};
})();

(node as any).hash = "7dce6fc8bd4e619919f24a91aacec3c4";

export default node;
