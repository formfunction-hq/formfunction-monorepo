/**
 * @generated SignedSource<<2bf3e45519b058548497a4282f6cd990>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOffer_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"AcceptOfferModal_MetadataAccount" | "CancelOfferModal_MetadataAccount">;
  readonly " $fragmentType": "NftOffer_MetadataAccount";
};
export type NftOffer_MetadataAccount$key = {
  readonly " $data"?: NftOffer_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOffer_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOffer_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AcceptOfferModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CancelOfferModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "99eb7ab167b0939deb9af84c5806f0f8";

export default node;
