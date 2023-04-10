/**
 * @generated SignedSource<<b50c930685948cfc925c7da19c9a2787>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftEllipsisShadowButton_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NftOptionsModals_MetadataAccount" | "NftOptions_MetadataAccount" | "OtherNftBottomDrawer_MetadataAccount">;
  readonly " $fragmentType": "NftEllipsisShadowButton_MetadataAccount";
};
export type NftEllipsisShadowButton_MetadataAccount$key = {
  readonly " $data"?: NftEllipsisShadowButton_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftEllipsisShadowButton_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftEllipsisShadowButton_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOptions_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOptionsModals_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OtherNftBottomDrawer_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "93a5dc8b26b06a234f2565c397f05ad9";

export default node;
