/**
 * @generated SignedSource<<1bde81632b153c5be74c7a8a64c148e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageForUser_User$data = {
  readonly CoverPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly CreatorStory: {
    readonly id: string;
  } | null;
  readonly DiscordAuth: {
    readonly discordUserId: string | null;
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
  readonly isWhitelisted: boolean;
  readonly shouldSeeDiscordOnboardingPrompt: boolean;
  readonly twitterName: string | null;
  readonly username: string;
  readonly websiteUrl: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"DiscordAuthModals_User" | "EditCreatorStoryForm_User" | "EditProfileForm_User" | "ManageSeriesModal_User" | "ProfileCampaignCard_User" | "ProfileCreatorStory_User" | "ProfileJoinDiscordCard_User" | "ProfileNfts_User" | "UserFollowsInfo_User">;
  readonly " $fragmentType": "ProfilePageForUser_User";
};
export type ProfilePageForUser_User$key = {
  readonly " $data"?: ProfilePageForUser_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUser_User">;
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
  "name": "ProfilePageForUser_User",
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
      "name": "shouldSeeDiscordOnboardingPrompt",
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
      "kind": "ScalarField",
      "name": "isWhitelisted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CreatorStory",
      "kind": "LinkedField",
      "name": "CreatorStory",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
          "name": "discordUserId",
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
      "name": "ProfileCreatorStory_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileNfts_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageSeriesModal_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditProfileForm_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditCreatorStoryForm_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UserFollowsInfo_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileJoinDiscordCard_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "DiscordAuthModals_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileCampaignCard_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "0a1a5ae06b9971070bb40e012399a866";

export default node;
