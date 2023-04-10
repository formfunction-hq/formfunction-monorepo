/**
 * @generated SignedSource<<94c086b1ff6d8eba4f89b237fc6e3c24>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericNftSearchDndRow_MetadataAccount$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchRow_MetadataAccount">;
  readonly " $fragmentType": "GenericNftSearchDndRow_MetadataAccount";
};
export type GenericNftSearchDndRow_MetadataAccount$key = {
  readonly " $data"?: GenericNftSearchDndRow_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchDndRow_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenericNftSearchDndRow_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GenericNftSearchRow_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a92866c8d1a08f50caa2eb929b143a21";

export default node;
