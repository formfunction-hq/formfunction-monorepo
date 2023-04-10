/**
 * @generated SignedSource<<07ae2b4eea2706cb627f167dfef3a380>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistPillButtonForUserExpress_UserExpress$data = {
  readonly ProfilePhoto: {
    readonly photoUrl: string;
  } | null;
  readonly username: string;
  readonly " $fragmentType": "ArtistPillButtonForUserExpress_UserExpress";
};
export type ArtistPillButtonForUserExpress_UserExpress$key = {
  readonly " $data"?: ArtistPillButtonForUserExpress_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistPillButtonForUserExpress_UserExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PhotoExpress",
      "kind": "LinkedField",
      "name": "ProfilePhoto",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "photoUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserExpress",
  "abstractKey": null
};

(node as any).hash = "440edc74da693ab9e495cdbb7df57a0a";

export default node;
