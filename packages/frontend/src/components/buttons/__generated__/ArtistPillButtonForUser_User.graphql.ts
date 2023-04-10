/**
 * @generated SignedSource<<374133703b5200172b2ad1fcf466ce2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistPillButtonForUser_User$data = {
  readonly ProfilePhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "ArtistPillButtonForUser_User";
};
export type ArtistPillButtonForUser_User$key = {
  readonly " $data"?: ArtistPillButtonForUser_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUser_User">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ArtistPillButtonForUser_User",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "ProfilePhoto",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "f47379f1c361f57cf6f155fc856bba46";

export default node;
