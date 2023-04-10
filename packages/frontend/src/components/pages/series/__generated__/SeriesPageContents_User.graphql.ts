/**
 * @generated SignedSource<<50fd3f36630f3b1e208d41ce01f53fc0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesPageContents_User$data = {
  readonly ProfilePhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "SeriesPageContents_User";
};
export type SeriesPageContents_User$key = {
  readonly " $data"?: SeriesPageContents_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesPageContents_User">;
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
  "name": "SeriesPageContents_User",
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

(node as any).hash = "6023059ad160f040cd1416c0cef5e3ca";

export default node;
