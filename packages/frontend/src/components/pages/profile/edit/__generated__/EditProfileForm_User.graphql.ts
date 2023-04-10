/**
 * @generated SignedSource<<edb1b70b192138826e981f26238666ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditProfileForm_User$data = {
  readonly CoverPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly DiscordAuth: {
    readonly hasConnectedDiscordAccount: boolean;
    readonly hasJoinedDiscordServer: boolean | null;
  } | null;
  readonly ProfilePhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly bio: string | null;
  readonly displayName: string | null;
  readonly id: string;
  readonly instagramName: string | null;
  readonly shouldBlurNsfwContent: boolean;
  readonly twitterName: string | null;
  readonly username: string;
  readonly websiteUrl: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ConnectDiscordButton_User" | "ConnectInstagramButton_User" | "ConnectTwitterButton_User" | "DiscordAuthModals_User">;
  readonly " $fragmentType": "EditProfileForm_User";
};
export type EditProfileForm_User$key = {
  readonly " $data"?: EditProfileForm_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditProfileForm_User">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "photoUrl",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditProfileForm_User",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "bio",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayName",
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
      "name": "username",
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
      "kind": "ScalarField",
      "name": "shouldBlurNsfwContent",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "CoverPhoto",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "ProfilePhoto",
      "plural": false,
      "selections": (v1/*: any*/),
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
})();

(node as any).hash = "8254c03954a04ebf82bfe94150a2ba83";

export default node;
