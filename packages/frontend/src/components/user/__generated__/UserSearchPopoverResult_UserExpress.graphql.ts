/**
 * @generated SignedSource<<3947588590d23add155f84a114522d31>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSearchPopoverResult_UserExpress$data = {
  readonly ProfilePhoto: {
    readonly photoUrl: string;
  } | null;
  readonly username: string;
  readonly " $fragmentType": "UserSearchPopoverResult_UserExpress";
};
export type UserSearchPopoverResult_UserExpress$key = {
  readonly " $data"?: UserSearchPopoverResult_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserSearchPopoverResult_UserExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserSearchPopoverResult_UserExpress",
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

(node as any).hash = "2a466c309b499b89b04c30bb1d8995e6";

export default node;
