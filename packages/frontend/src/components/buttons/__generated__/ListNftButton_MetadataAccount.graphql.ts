/**
 * @generated SignedSource<<72de378ee6d6391d1dfa18427ca7e95c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftButton_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListNftContextProvider_MetadataAccount" | "ListNftModal_MetadataAccount">;
  readonly " $fragmentType": "ListNftButton_MetadataAccount";
};
export type ListNftButton_MetadataAccount$key = {
  readonly " $data"?: ListNftButton_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftButton_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftButton_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftContextProvider_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "24bba187d9dd2825956c52f47711aa62";

export default node;
