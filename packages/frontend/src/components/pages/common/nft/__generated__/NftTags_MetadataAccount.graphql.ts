/**
 * @generated SignedSource<<0de9491d967230c2c775b8b3c42b6720>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftTags_MetadataAccount$data = {
  readonly tags: ReadonlyArray<string>;
  readonly " $fragmentType": "NftTags_MetadataAccount";
};
export type NftTags_MetadataAccount$key = {
  readonly " $data"?: NftTags_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftTags_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftTags_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "6cdc60d17c5858d58621fb4ee88135f7";

export default node;
