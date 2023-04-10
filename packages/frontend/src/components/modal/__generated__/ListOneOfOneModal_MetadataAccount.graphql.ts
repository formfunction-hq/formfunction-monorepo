/**
 * @generated SignedSource<<40f3ac47a37ff4fb7e7e451b70b92c8d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListOneOfOneModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListOneOfOneModalContent_MetadataAccount">;
  readonly " $fragmentType": "ListOneOfOneModal_MetadataAccount";
};
export type ListOneOfOneModal_MetadataAccount$key = {
  readonly " $data"?: ListOneOfOneModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListOneOfOneModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListOneOfOneModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListOneOfOneModalContent_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "2b4b3e2b847ed7cd3188bfbe625345a2";

export default node;
