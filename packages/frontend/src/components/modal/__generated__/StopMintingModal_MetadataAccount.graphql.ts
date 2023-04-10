/**
 * @generated SignedSource<<30281e4625ab4551d6b5e06915b19e36>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StopMintingModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useStopMintingForEditions_MetadataAccount">;
  readonly " $fragmentType": "StopMintingModal_MetadataAccount";
};
export type StopMintingModal_MetadataAccount$key = {
  readonly " $data"?: StopMintingModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"StopMintingModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StopMintingModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useStopMintingForEditions_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a414dd61d5f00bcc89591401f43e18fe";

export default node;
