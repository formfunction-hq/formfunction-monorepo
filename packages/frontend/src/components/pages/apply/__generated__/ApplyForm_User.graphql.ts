/**
 * @generated SignedSource<<7fa482ce018088d3d311ca4fd0d69639>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ApplyForm_User$data = {
  readonly DiscordAuth: {
    readonly discordHandle: string | null;
    readonly hasConnectedDiscordAccount: boolean;
    readonly hasJoinedDiscordServer: boolean | null;
  } | null;
  readonly id: string;
  readonly instagramName: string | null;
  readonly twitterName: string | null;
  readonly websiteUrl: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectDiscordButton_User" | "ConnectInstagramButton_User" | "ConnectTwitterButton_User" | "DiscordAuthModals_User">;
  readonly " $fragmentType": "ApplyForm_User";
};
export type ApplyForm_User$key = {
  readonly " $data"?: ApplyForm_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ApplyForm_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ApplyForm_User",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twitterName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "websiteUrl",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasConnectedDiscordAccount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasJoinedDiscordServer",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectTwitterButton_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectInstagramButton_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ConnectDiscordButton_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscordAuthModals_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "d4dc198c4b9fe0b76f5a08185a9d289b";

export default node;
