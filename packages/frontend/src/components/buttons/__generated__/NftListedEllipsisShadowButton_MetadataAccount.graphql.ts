/**
 * @generated SignedSource<<7a0f2e1a50b834c81b0a170f84f918b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftListedEllipsisShadowButton_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"NftListedOptionsModals_MetadataAccount" | "NftListedOptions_MetadataAccount">;
  readonly " $fragmentType": "NftListedEllipsisShadowButton_MetadataAccount";
};
export type NftListedEllipsisShadowButton_MetadataAccount$key = {
  readonly " $data"?: NftListedEllipsisShadowButton_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftListedEllipsisShadowButton_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftListedEllipsisShadowButton_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftListedOptions_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftListedOptionsModals_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a390ec25b1665a47dd78400a7d9427b3";

export default node;
