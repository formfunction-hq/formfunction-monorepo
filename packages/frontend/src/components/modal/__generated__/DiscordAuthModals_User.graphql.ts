/**
 * @generated SignedSource<<27b8d910a74d49bc7d006999f3162057>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscordAuthModals_User$data = {
  readonly " $fragmentSpreads": FragmentRefs<"DiscordAuthConnectModal_User" | "DiscordAuthDisconnectModal_User">;
  readonly " $fragmentType": "DiscordAuthModals_User";
};
export type DiscordAuthModals_User$key = {
  readonly " $data"?: DiscordAuthModals_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscordAuthModals_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DiscordAuthModals_User",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscordAuthConnectModal_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscordAuthDisconnectModal_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "a030b66a1a69bf0956821516e8e6a838";

export default node;
