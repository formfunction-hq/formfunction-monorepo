/**
 * @generated SignedSource<<0a619acf411c4ac0fc7781e97d79eccf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type User_set_input = {
  bio?: string | null;
  coverPhotoId?: string | null;
  discordHandle?: string | null;
  displayName?: string | null;
  email?: string | null;
  emailBlocklist?: any | null;
  hasCompletedSignup?: boolean | null;
  hasTakenCollectorSurvey2023?: boolean | null;
  hasTakenCreatorSurvey2023?: boolean | null;
  hasUnseenActivity?: boolean | null;
  id?: string | null;
  instagramName?: string | null;
  isCollector2?: boolean | null;
  isWhitelisted?: boolean | null;
  profilePhotoId?: string | null;
  seriesOrder?: any | null;
  shouldBlurNsfwContent?: boolean | null;
  shouldSeeDiscordOnboardingPrompt?: boolean | null;
  timeCreated?: string | null;
  twitterName?: string | null;
  username?: string | null;
  websiteUrl?: string | null;
};
export type useUpdateUserByPkMutation$variables = {
  set: User_set_input;
  userId: string;
};
export type useUpdateUserByPkMutation$data = {
  readonly update_User_by_pk: {
    readonly id: string;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditProfileForm_User" | "ManageSeriesModal_User" | "ProfileJoinDiscordCard_User">;
  } | null;
};
export type useUpdateUserByPkMutation = {
  response: useUpdateUserByPkMutation$data;
  variables: useUpdateUserByPkMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "set"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "_set",
    "variableName": "set"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "userId"
      }
    ],
    "kind": "ObjectValue",
    "name": "pk_columns"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v4 = [
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
    "name": "useUpdateUserByPkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "update_User_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ManageSeriesModal_User"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ProfileJoinDiscordCard_User"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditProfileForm_User"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useUpdateUserByPkMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "update_User_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "seriesOrder",
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
            "selections": (v4/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "ProfilePhoto",
            "plural": false,
            "selections": (v4/*: any*/),
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "33986c635618e32d81d562e41abceb04",
    "id": null,
    "metadata": {},
    "name": "useUpdateUserByPkMutation",
    "operationKind": "mutation",
    "text": "mutation useUpdateUserByPkMutation(\n  $set: User_set_input!\n  $userId: String!\n) {\n  update_User_by_pk(_set: $set, pk_columns: {id: $userId}) {\n    id\n    username\n    ...ManageSeriesModal_User\n    ...ProfileJoinDiscordCard_User\n    ...EditProfileForm_User\n  }\n}\n\nfragment ConnectDiscordButton_User on User {\n  id\n  DiscordAuth {\n    discordHandle\n  }\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectInstagramButton_User on User {\n  id\n  instagramName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectSocialNetworkButton_User on User {\n  id\n  DiscordAuth {\n    hasConnectedDiscordAccount\n  }\n}\n\nfragment ConnectTwitterButton_User on User {\n  id\n  twitterName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment DiscordAuthConnectModal_User on User {\n  id\n  isWhitelisted\n  DiscordAuth {\n    id\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n}\n\nfragment DiscordAuthDisconnectModal_User on User {\n  id\n}\n\nfragment DiscordAuthModals_User on User {\n  ...DiscordAuthConnectModal_User\n  ...DiscordAuthDisconnectModal_User\n}\n\nfragment EditProfileForm_User on User {\n  id\n  bio\n  displayName\n  instagramName\n  twitterName\n  username\n  websiteUrl\n  shouldBlurNsfwContent\n  CoverPhoto {\n    id\n    photoUrl\n  }\n  ProfilePhoto {\n    id\n    photoUrl\n  }\n  DiscordAuth {\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n  ...ConnectTwitterButton_User\n  ...ConnectInstagramButton_User\n  ...ConnectDiscordButton_User\n  ...DiscordAuthModals_User\n}\n\nfragment ManageSeriesModal_User on User {\n  seriesOrder\n}\n\nfragment ProfileJoinDiscordCard_User on User {\n  id\n  shouldSeeDiscordOnboardingPrompt\n}\n"
  }
};
})();

(node as any).hash = "c722fd5502b1dec5388e23f8596cd1bc";

export default node;
