/**
 * @generated SignedSource<<305e055599f45c21ee84a79f392c24a3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftModal_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListEditionsModal_MetadataAccount" | "ListOneOfOneModal_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "ListNftModal_MetadataAccount";
};
export type ListNftModal_MetadataAccount$key = {
  readonly " $data"?: ListNftModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftModal_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListEditionsModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListOneOfOneModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "53339caa8a9b08485dd76eafdc449bb4";

export default node;
