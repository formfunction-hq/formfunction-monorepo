/**
 * @generated SignedSource<<15fbee0954af1927bd421afa8e1aea30>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileLinkForUserExpress_UserExpress$data = {
  readonly ProfilePhoto: {
    readonly photoUrl: string;
  } | null;
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "ProfileLinkForUserExpress_UserExpress";
};
export type ProfileLinkForUserExpress_UserExpress$key = {
  readonly " $data"?: ProfileLinkForUserExpress_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileLinkForUserExpress_UserExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileLinkForUserExpress_UserExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "487625aeb8db0fa425b217a8abd5e178";

export default node;
