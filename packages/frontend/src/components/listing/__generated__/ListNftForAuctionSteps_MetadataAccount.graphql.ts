/**
 * @generated SignedSource<<e1d9512e83cb51e7e19eb0965a89c0f6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForAuctionSteps_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuctionWithPnft_MetadataAccount" | "ListNftForAuctionWithUnlockable_MetadataAccount" | "ListNftForAuction_MetadataAccount">;
  readonly " $fragmentType": "ListNftForAuctionSteps_MetadataAccount";
};
export type ListNftForAuctionSteps_MetadataAccount$key = {
  readonly " $data"?: ListNftForAuctionSteps_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuctionSteps_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForAuctionSteps_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForAuction_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForAuctionWithPnft_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForAuctionWithUnlockable_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "4712f791c4449c3b45394ade19555f79";

export default node;
