/**
 * @generated SignedSource<<c9f6522fdc7301416b111cb630c7b11c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSearchBarSelectedItem_UserExpress$data = {
  readonly ProfilePhoto: {
    readonly photoUrl: string;
  } | null;
  readonly username: string;
  readonly " $fragmentType": "UserSearchBarSelectedItem_UserExpress";
};
export type UserSearchBarSelectedItem_UserExpress$key = {
  readonly " $data"?: UserSearchBarSelectedItem_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserSearchBarSelectedItem_UserExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserSearchBarSelectedItem_UserExpress",
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

(node as any).hash = "72a97a125b018470241a5facec0a736b";

export default node;
