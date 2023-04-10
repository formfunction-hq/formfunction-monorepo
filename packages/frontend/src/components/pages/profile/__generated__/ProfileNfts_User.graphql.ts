/**
 * @generated SignedSource<<103745fccf2ef585f921dee862f0b726>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileNfts_User$data = {
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_User">;
  readonly " $fragmentType": "ProfileNfts_User";
};
export type ProfileNfts_User$key = {
  readonly " $data"?: ProfileNfts_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileNfts_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileNfts_User",
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
      "name": "NftsForAddress_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "c782a33bd19aafb7f62eba6897a02648";

export default node;
