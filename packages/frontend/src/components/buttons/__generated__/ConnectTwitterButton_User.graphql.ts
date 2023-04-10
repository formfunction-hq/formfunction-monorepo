/**
 * @generated SignedSource<<4ae943a9b0b6b31ce8417cd6c40c38a0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectTwitterButton_User$data = {
  readonly id: string;
  readonly twitterName: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectSocialNetworkButton_User">;
  readonly " $fragmentType": "ConnectTwitterButton_User";
};
export type ConnectTwitterButton_User$key = {
  readonly " $data"?: ConnectTwitterButton_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectTwitterButton_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectTwitterButton_User",
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
      "name": "twitterName",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectSocialNetworkButton_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "0221e1c53c5aee7edbb1f2f62ca71109";

export default node;
