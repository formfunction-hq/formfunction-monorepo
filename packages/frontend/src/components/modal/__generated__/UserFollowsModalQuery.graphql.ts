/**
 * @generated SignedSource<<154deeb0a2c1aa67fdc22220a2bf0bf3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserFollowsModalQuery$variables = {
  userId: string;
  viewerId: string;
};
export type UserFollowsModalQuery$data = {
  readonly User_by_pk: {
    readonly Followed: ReadonlyArray<{
      readonly Followed: {
        readonly Followers: ReadonlyArray<{
          readonly id: string;
        }>;
        readonly ProfilePhoto: {
          readonly photoUrl: string;
        } | null;
        readonly id: string;
        readonly username: string;
      };
      readonly id: string;
    }>;
    readonly Followers: ReadonlyArray<{
      readonly Follower: {
        readonly Followers: ReadonlyArray<{
          readonly id: string;
        }>;
        readonly ProfilePhoto: {
          readonly photoUrl: string;
        } | null;
        readonly id: string;
        readonly username: string;
      };
      readonly id: string;
    }>;
    readonly id: string;
  } | null;
};
export type UserFollowsModalQuery = {
  response: UserFollowsModalQuery$data;
  variables: UserFollowsModalQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "viewerId"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
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
    "concreteType": "Photo",
    "kind": "LinkedField",
    "name": "ProfilePhoto",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photoUrl",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_eq",
                "variableName": "viewerId"
              }
            ],
            "kind": "ObjectValue",
            "name": "followerId"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "UserFollows",
    "kind": "LinkedField",
    "name": "Followers",
    "plural": true,
    "selections": [
      (v1/*: any*/)
    ],
    "storageKey": null
  }
],
v3 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "userId"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "User_by_pk",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "UserFollows",
        "kind": "LinkedField",
        "name": "Followed",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "Followed",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "UserFollows",
        "kind": "LinkedField",
        "name": "Followers",
        "plural": true,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "Follower",
            "plural": false,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserFollowsModalQuery",
    "selections": (v3/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserFollowsModalQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "a9b4b3d1e7bbcd9ede5bc90ddad1371f",
    "id": null,
    "metadata": {},
    "name": "UserFollowsModalQuery",
    "operationKind": "query",
    "text": "query UserFollowsModalQuery(\n  $userId: String!\n  $viewerId: String!\n) {\n  User_by_pk(id: $userId) {\n    id\n    Followed {\n      id\n      Followed {\n        id\n        username\n        ProfilePhoto {\n          photoUrl\n        }\n        Followers(where: {followerId: {_eq: $viewerId}}) {\n          id\n        }\n      }\n    }\n    Followers {\n      id\n      Follower {\n        id\n        username\n        ProfilePhoto {\n          photoUrl\n        }\n        Followers(where: {followerId: {_eq: $viewerId}}) {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4880281d6065f24487c16e496d49a682";

export default node;
