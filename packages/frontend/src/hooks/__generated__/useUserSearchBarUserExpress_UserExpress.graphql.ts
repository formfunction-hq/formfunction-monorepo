/**
 * @generated SignedSource<<f63a4f47f5a94eb1ce31229183ccbc3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUserSearchBarUserExpress_UserExpress$data = ReadonlyArray<{
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"UserSearchBarSelectedItem_UserExpress" | "UserSearchPopoverResult_UserExpress">;
  readonly " $fragmentType": "useUserSearchBarUserExpress_UserExpress";
}>;
export type useUserSearchBarUserExpress_UserExpress$key = ReadonlyArray<{
  readonly " $data"?: useUserSearchBarUserExpress_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUserSearchBarUserExpress_UserExpress">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "useUserSearchBarUserExpress_UserExpress",
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
      "name": "UserSearchBarSelectedItem_UserExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserSearchPopoverResult_UserExpress"
    }
  ],
  "type": "UserExpress",
  "abstractKey": null
};

(node as any).hash = "230138b26bd0cf5b1b95325f2fb0e598";

export default node;
