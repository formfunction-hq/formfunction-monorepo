/**
 * @generated SignedSource<<133b792b57131173352edfb0bf1148b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscordAuthDisconnectModal_User$data = {
  readonly id: string;
  readonly " $fragmentType": "DiscordAuthDisconnectModal_User";
};
export type DiscordAuthDisconnectModal_User$key = {
  readonly " $data"?: DiscordAuthDisconnectModal_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscordAuthDisconnectModal_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscordAuthDisconnectModal_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "7b93140eb839f8593250065de4f5a447";

export default node;
