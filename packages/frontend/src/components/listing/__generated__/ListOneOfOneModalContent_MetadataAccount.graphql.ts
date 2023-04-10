/**
 * @generated SignedSource<<13d513ef5cbc06c0e4506d2ca2e1aa66>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListOneOfOneModalContent_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForAuctionSteps_MetadataAccount" | "ListNftForInstantSaleSteps_MetadataAccount">;
  readonly " $fragmentType": "ListOneOfOneModalContent_MetadataAccount";
};
export type ListOneOfOneModalContent_MetadataAccount$key = {
  readonly " $data"?: ListOneOfOneModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListOneOfOneModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListOneOfOneModalContent_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForAuctionSteps_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForInstantSaleSteps_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "0001d10d2315915e019d4591b3b1ace4";

export default node;
