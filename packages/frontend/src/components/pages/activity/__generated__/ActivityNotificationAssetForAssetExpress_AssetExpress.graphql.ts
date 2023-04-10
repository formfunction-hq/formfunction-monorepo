/**
 * @generated SignedSource<<39bad7ec2daf1f6d7b0ca1f82171afec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationAssetForAssetExpress_AssetExpress$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  readonly " $fragmentType": "ActivityNotificationAssetForAssetExpress_AssetExpress";
};
export type ActivityNotificationAssetForAssetExpress_AssetExpress$key = {
  readonly " $data"?: ActivityNotificationAssetForAssetExpress_AssetExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAssetForAssetExpress_AssetExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationAssetForAssetExpress_AssetExpress",
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

(node as any).hash = "c65030cb6369e914425dfc61b97f1e6f";

export default node;
