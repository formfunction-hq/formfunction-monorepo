/**
 * @generated SignedSource<<952bfb4814a28fbbcb642b72bf2c1778>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ConnectSocialNetworkButton_User$data = {
  readonly DiscordAuth: {
    readonly hasConnectedDiscordAccount: boolean;
  } | null;
  readonly id: string;
  readonly " $fragmentType": "ConnectSocialNetworkButton_User";
};
export type ConnectSocialNetworkButton_User$key = {
  readonly " $data"?: ConnectSocialNetworkButton_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectSocialNetworkButton_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ConnectSocialNetworkButton_User",
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
          "name": "hasConnectedDiscordAccount",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "9b214f8bad131a745bd0ab7feea0950e";

export default node;
