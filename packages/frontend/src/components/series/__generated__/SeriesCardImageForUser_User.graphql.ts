/**
 * @generated SignedSource<<3f8c9012d30938cffb74db0dc40a3aff>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesCardImageForUser_User$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUser_User">;
  readonly " $fragmentType": "SeriesCardImageForUser_User";
};
export type SeriesCardImageForUser_User$key = {
  readonly " $data"?: SeriesCardImageForUser_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesCardImageForUser_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesCardImageForUser_User",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistPillButtonForUser_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "4135b52d26c365c8a057db9296554a50";

export default node;
