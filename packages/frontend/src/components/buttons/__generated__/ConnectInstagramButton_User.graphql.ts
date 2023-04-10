/**
 * @generated SignedSource<<156172048e6a93529c06608fe81cb3fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectInstagramButton_User$data = {
  readonly id: string;
  readonly instagramName: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectSocialNetworkButton_User">;
  readonly " $fragmentType": "ConnectInstagramButton_User";
};
export type ConnectInstagramButton_User$key = {
  readonly " $data"?: ConnectInstagramButton_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectInstagramButton_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectInstagramButton_User",
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
      "name": "instagramName",
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

(node as any).hash = "40bab0066934f684147f0fe30a7e1884";

export default node;
