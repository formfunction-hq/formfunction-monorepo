/**
 * @generated SignedSource<<d1ab8fc25a8f263adb8f8b5baa7ac726>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type HeaderDesktopSearchQuery$variables = {
  searchText: string;
};
export type HeaderDesktopSearchQuery$data = {
  readonly Series: ReadonlyArray<{
    readonly AvatarPhoto: {
      readonly id: string;
      readonly photoUrl: string;
    };
    readonly Creator: {
      readonly username: string;
    };
    readonly id: string;
    readonly name: string;
    readonly slug: string;
  }>;
  readonly Tag: ReadonlyArray<{
    readonly id: string;
    readonly value: string;
  }>;
  readonly User: ReadonlyArray<{
    readonly ProfilePhoto: {
      readonly id: string;
      readonly photoUrl: string;
    } | null;
    readonly id: string;
    readonly username: string;
  }>;
};
export type HeaderDesktopSearchQuery = {
  response: HeaderDesktopSearchQuery$data;
  variables: HeaderDesktopSearchQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  }
],
v1 = {
  "kind": "Literal",
  "name": "limit",
  "value": 4
},
v2 = [
  {
    "kind": "Variable",
    "name": "_ilike",
    "variableName": "searchText"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v5 = [
  (v3/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "photoUrl",
    "storageKey": null
  }
],
v6 = [
  {
    "alias": null,
    "args": [
      (v1/*: any*/),
      {
        "kind": "Literal",
        "name": "order_by",
        "value": {
          "usernameLength": "asc"
        }
      },
      {
        "fields": [
          {
            "fields": (v2/*: any*/),
            "kind": "ObjectValue",
            "name": "username"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "User",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      (v4/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "ProfilePhoto",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      (v1/*: any*/),
      {
        "kind": "Literal",
        "name": "order_by",
        "value": {
          "valueLength": "asc"
        }
      },
      {
        "fields": [
          {
            "fields": (v2/*: any*/),
            "kind": "ObjectValue",
            "name": "value"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Tag",
    "kind": "LinkedField",
    "name": "Tag",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "value",
        "storageKey": null
      }
    ],
    "storageKey": null
  },
  {
    "alias": null,
    "args": [
      (v1/*: any*/),
      {
        "kind": "Literal",
        "name": "order_by",
        "value": {
          "nameLength": "asc"
        }
      },
      {
        "fields": [
          {
            "fields": (v2/*: any*/),
            "kind": "ObjectValue",
            "name": "name"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Series",
    "kind": "LinkedField",
    "name": "Series",
    "plural": true,
    "selections": [
      (v3/*: any*/),
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "slug",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "AvatarPhoto",
        "plural": false,
        "selections": (v5/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "Creator",
        "plural": false,
        "selections": [
          (v4/*: any*/)
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
    "name": "HeaderDesktopSearchQuery",
    "selections": (v6/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HeaderDesktopSearchQuery",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "be5868930f8da997e2ef33638effbb2a",
    "id": null,
    "metadata": {},
    "name": "HeaderDesktopSearchQuery",
    "operationKind": "query",
    "text": "query HeaderDesktopSearchQuery(\n  $searchText: String!\n) {\n  User(where: {username: {_ilike: $searchText}}, limit: 4, order_by: {usernameLength: asc}) {\n    id\n    username\n    ProfilePhoto {\n      id\n      photoUrl\n    }\n  }\n  Tag(where: {value: {_ilike: $searchText}}, limit: 4, order_by: {valueLength: asc}) {\n    id\n    value\n  }\n  Series(where: {name: {_ilike: $searchText}}, limit: 4, order_by: {nameLength: asc}) {\n    id\n    slug\n    name\n    AvatarPhoto {\n      id\n      photoUrl\n    }\n    Creator {\n      username\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "1ab0674df2d9cf25cf0a3ebbb8326a65";

export default node;
