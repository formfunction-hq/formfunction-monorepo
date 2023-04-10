/**
 * @generated SignedSource<<ad68f9cc9933af4221146dd17c00ea9a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftContextProvider_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListingContext_MetadataAccount">;
  readonly " $fragmentType": "ListNftContextProvider_MetadataAccount";
};
export type ListNftContextProvider_MetadataAccount$key = {
  readonly " $data"?: ListNftContextProvider_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftContextProvider_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftContextProvider_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListingContext_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "b30aacddb3de074aabd0a6b8aa4ce5ac";

export default node;
