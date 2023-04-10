/**
 * @generated SignedSource<<9511ca4905984468f176338ee9e608c6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSubmissionStatus_enum = "Approved" | "ApprovedWithoutVoting" | "Pending" | "Rejected" | "VoteActive" | "%future added value";
export type ApplyPageQuery$variables = {
  id: string;
};
export type ApplyPageQuery$data = {
  readonly User_by_pk: {
    readonly ArtistSubmissions: ReadonlyArray<{
      readonly Votes: ReadonlyArray<{
        readonly id: string;
        readonly timeCreated: string;
      }>;
      readonly id: string;
      readonly status: ArtistSubmissionStatus_enum | null;
    }>;
    readonly id: string;
    readonly isWhitelisted: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"ApplyForm_User">;
  } | null;
};
export type ApplyPageQuery = {
  response: ApplyPageQuery$data;
  variables: ApplyPageQuery$variables;
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
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWhitelisted",
  "storageKey": null
},
v4 = {
  "kind": "Literal",
  "name": "order_by",
  "value": {
    "timeCreated": "desc"
  }
},
v5 = {
  "alias": null,
  "args": [
    (v4/*: any*/)
  ],
  "concreteType": "ArtistSubmission",
  "kind": "LinkedField",
  "name": "ArtistSubmissions",
  "plural": true,
  "selections": [
    (v2/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "status",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "limit",
          "value": 1
        },
        (v4/*: any*/),
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "voteType": {
              "_in": [
                "PrescreenReject",
                "Reject"
              ]
            }
          }
        }
      ],
      "concreteType": "Vote",
      "kind": "LinkedField",
      "name": "Votes",
      "plural": true,
      "selections": [
        (v2/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timeCreated",
          "storageKey": null
        }
      ],
      "storageKey": "Votes(limit:1,order_by:{\"timeCreated\":\"desc\"},where:{\"voteType\":{\"_in\":[\"PrescreenReject\",\"Reject\"]}})"
    }
  ],
  "storageKey": "ArtistSubmissions(order_by:{\"timeCreated\":\"desc\"})"
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ApplyPageQuery",
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
          (v3/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ApplyForm_User"
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
    "name": "ApplyPageQuery",
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
          (v3/*: any*/),
          (v5/*: any*/),
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
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "45efbd2177627a4dc21477e83f7ecafb",
    "id": null,
    "metadata": {},
    "name": "ApplyPageQuery",
    "operationKind": "query",
    "text": "query ApplyPageQuery(\n  $id: String!\n) {\n  User_by_pk(id: $id) {\n    id\n    isWhitelisted\n    ArtistSubmissions(order_by: {timeCreated: desc}) {\n      id\n      status\n      Votes(where: {voteType: {_in: [PrescreenReject, Reject]}}, order_by: {timeCreated: desc}, limit: 1) {\n        id\n        timeCreated\n      }\n    }\n    ...ApplyForm_User\n  }\n}\n\nfragment ApplyForm_User on User {\n  id\n  instagramName\n  twitterName\n  websiteUrl\n  DiscordAuth {\n    discordHandle\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n  ...ConnectTwitterButton_User\n  ...ConnectInstagramButton_User\n  ...ConnectDiscordButton_User\n  ...DiscordAuthModals_User\n}\n\nfragment ConnectDiscordButton_User on User {\n  id\n  DiscordAuth {\n    discordHandle\n  }\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectInstagramButton_User on User {\n  id\n  instagramName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment ConnectSocialNetworkButton_User on User {\n  id\n  DiscordAuth {\n    hasConnectedDiscordAccount\n  }\n}\n\nfragment ConnectTwitterButton_User on User {\n  id\n  twitterName\n  ...ConnectSocialNetworkButton_User\n}\n\nfragment DiscordAuthConnectModal_User on User {\n  id\n  isWhitelisted\n  DiscordAuth {\n    id\n    hasConnectedDiscordAccount\n    hasJoinedDiscordServer\n  }\n}\n\nfragment DiscordAuthDisconnectModal_User on User {\n  id\n}\n\nfragment DiscordAuthModals_User on User {\n  ...DiscordAuthConnectModal_User\n  ...DiscordAuthDisconnectModal_User\n}\n"
  }
};
})();

(node as any).hash = "506eda030e9414b2fe6666e999e8935e";

export default node;
