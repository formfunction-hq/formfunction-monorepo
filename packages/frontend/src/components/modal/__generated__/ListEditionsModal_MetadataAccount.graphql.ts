/**
 * @generated SignedSource<<068b0042b9ad45d7e3e032be32537e01>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListEditionsModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsModalContent_MetadataAccount">;
  readonly " $fragmentType": "ListEditionsModal_MetadataAccount";
};
export type ListEditionsModal_MetadataAccount$key = {
  readonly " $data"?: ListEditionsModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListEditionsModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListEditionsModalContent_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "d59482fbb4dc99dd5b4f8c920909bbff";

export default node;
