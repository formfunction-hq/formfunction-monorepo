/**
 * @generated SignedSource<<0e2b28e8d35ccd9f5e866bfef4edf0ea>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectDiscordButton_User$data = {
  readonly DiscordAuth: {
    readonly discordHandle: string | null;
  } | null;
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectSocialNetworkButton_User">;
  readonly " $fragmentType": "ConnectDiscordButton_User";
};
export type ConnectDiscordButton_User$key = {
  readonly " $data"?: ConnectDiscordButton_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectDiscordButton_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectDiscordButton_User",
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
      "concreteType": "DiscordAuth",
      "kind": "LinkedField",
      "name": "DiscordAuth",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "discordHandle",
          "storageKey": null
        }
      ],
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

(node as any).hash = "d364beb3f801c8f11690a48a2068a1a5";

export default node;
