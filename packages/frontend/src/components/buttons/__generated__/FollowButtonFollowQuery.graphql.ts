/**
 * @generated SignedSource<<9fe7fd3f5da211cdb373b8f507738097>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type FollowButtonFollowQuery$variables = {
  followedId: string;
  followerId: string;
};
export type FollowButtonFollowQuery$data = {
  readonly UserFollows: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type FollowButtonFollowQuery = {
  response: FollowButtonFollowQuery$data;
  variables: FollowButtonFollowQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "followedId"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "followerId"
},
v2 = [
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
                "variableName": "followedId"
              }
            ],
            "kind": "ObjectValue",
            "name": "followedId"
          },
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "_eq",
                "variableName": "followerId"
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
    "name": "UserFollows",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FollowButtonFollowQuery",
    "selections": (v2/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FollowButtonFollowQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "71e1201e6ab37fc04cd0dfc269855242",
    "id": null,
    "metadata": {},
    "name": "FollowButtonFollowQuery",
    "operationKind": "query",
    "text": "query FollowButtonFollowQuery(\n  $followerId: String!\n  $followedId: String!\n) {\n  UserFollows(where: {followedId: {_eq: $followedId}, followerId: {_eq: $followerId}}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "eb8af7dc03bbf9ff8766599ad882ebcd";

export default node;
