/**
 * @generated SignedSource<<787907b70434547df9b64f9677458fca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileJoinDiscordCard_User$data = {
  readonly id: string;
  readonly shouldSeeDiscordOnboardingPrompt: boolean;
  readonly " $fragmentType": "ProfileJoinDiscordCard_User";
};
export type ProfileJoinDiscordCard_User$key = {
  readonly " $data"?: ProfileJoinDiscordCard_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileJoinDiscordCard_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileJoinDiscordCard_User",
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
      "name": "shouldSeeDiscordOnboardingPrompt",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "8569babb4f7dba9ef3760cba101c37a7";

export default node;
