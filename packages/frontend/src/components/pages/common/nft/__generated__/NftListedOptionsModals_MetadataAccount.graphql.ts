/**
 * @generated SignedSource<<62e6d47fd192597d3eae07167b0e1626>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftListedOptionsModals_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AddToAllowlistModal_MetadataAccount" | "AuctionSettingsModal_MetadataAccount" | "CancelListingModal_MetadataAccount" | "ChangePriceForEditionsModal_MetadataAccount" | "ChangePriceModal_MetadataAccount" | "DeleteModal_MetadataAccount" | "EditTagsModal_MetadataAccount" | "RefreshMetadataModal_MetadataAccount" | "StopMintingModal_MetadataAccount">;
  readonly " $fragmentType": "NftListedOptionsModals_MetadataAccount";
};
export type NftListedOptionsModals_MetadataAccount$key = {
  readonly " $data"?: NftListedOptionsModals_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftListedOptionsModals_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftListedOptionsModals_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AddToAllowlistModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AuctionSettingsModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditTagsModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CancelListingModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangePriceModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangePriceForEditionsModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "RefreshMetadataModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StopMintingModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DeleteModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "9bc651de7df71314285946dbfd4f95b2";

export default node;
