/**
 * @generated SignedSource<<57a7ff58b19e6de3eadd294aedd6c562>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditProfilePageQuery$variables = {
  id: string;
};
export type EditProfilePageQuery$data = {
  readonly User_by_pk: {
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditCreatorStoryForm_User" | "EditProfileForm_User">;
  } | null;
};
export type EditProfilePageQuery = {
  response: EditProfilePageQuery$data;
  variables: EditProfilePageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "photoUrl",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditProfilePageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditProfileForm_User"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditCreatorStoryForm_User"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditProfilePageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
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
            "selections": (v3/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "ProfilePhoto",
            "plural": false,
            "selections": (v3/*: any*/),
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "discordHandle",
                "storageKey": null
              },
              (v2/*: any*/)
            ],
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
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "colorScheme",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "goals",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "headline",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "inspiration",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "process",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "130cb0b694b32ac52fdccc61a6462ecc",
    "id": null,
    "metadata": {},
    "name": "EditProfilePageQuery",
    "operationKind": "query",
    "text": "query EditProfilePageQuery(\n  $id: String!\n) {\n  User_by_pk(id: $id) {\n    id\n    ...EditProfileForm_User\n    ...EditCreatorStoryForm_User\n  }\n}\n\nfragment ConnectDiscordButton_User on User {\n  id\n  DiscordAuth {\n    discordHandle\n  }\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectInstagramButton_User on User {\n  id\n  instagramName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectSocialNetworkButton_User on User {\n  id\n  DiscordAuth {\n    hasConnectedDiscordAccount\n  }\n}\n\nfragment ConnectTwitterButton_User on User {\n  id\n  twitterName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment DiscordAuthConnectModal_User on User {\n  id\n  isWhitelisted\n  DiscordAuth {\n    id\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n}\n\nfragment DiscordAuthDisconnectModal_User on User {\n  id\n}\n\nfragment DiscordAuthModals_User on User {\n  ...DiscordAuthConnectModal_User\n  ...DiscordAuthDisconnectModal_User\n}\n\nfragment EditCreatorStoryForm_User on User {\n  id\n  displayName\n  username\n  CreatorStory {\n    id\n    colorScheme\n    goals\n    headline\n    inspiration\n    process\n  }\n  ProfilePhoto {\n    id\n    photoUrl\n  }\n}\n\nfragment EditProfileForm_User on User {\n  id\n  bio\n  displayName\n  instagramName\n  twitterName\n  username\n  websiteUrl\n  shouldBlurNsfwContent\n  CoverPhoto {\n    id\n    photoUrl\n  }\n  ProfilePhoto {\n    id\n    photoUrl\n  }\n  DiscordAuth {\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n  ...ConnectTwitterButton_User\n  ...ConnectInstagramButton_User\n  ...ConnectDiscordButton_User\n  ...DiscordAuthModals_User\n}\n"
  }
};
})();

(node as any).hash = "e6ae647ee66d832dc6b9c1c797944b7d";

export default node;
