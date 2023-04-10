/**
 * @generated SignedSource<<a20d5ecf70ca97d2206aeb7655611e2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserSearchBarQuery$variables = {
  searchText: string;
};
export type UserSearchBarQuery$data = {
  readonly UserQueries: {
    readonly userSearch: {
      readonly users: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"useUserSearchBarUserExpress_UserExpress">;
      }>;
    };
  };
};
export type UserSearchBarQuery = {
  response: UserSearchBarQuery$data;
  variables: UserSearchBarQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "searchText"
  }
],
v1 = [
  {
    "fields": [
      {
        "kind": "Literal",
        "name": "first",
        "value": 5
      },
      {
        "kind": "Variable",
        "name": "usernameOrUserId",
        "variableName": "searchText"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UserSearchBarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserQueriesQueryResponse",
        "kind": "LinkedField",
        "name": "UserQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserSearchResponse",
            "kind": "LinkedField",
            "name": "userSearch",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "users",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "useUserSearchBarUserExpress_UserExpress"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "UserSearchBarQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserQueriesQueryResponse",
        "kind": "LinkedField",
        "name": "UserQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserSearchResponse",
            "kind": "LinkedField",
            "name": "userSearch",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "users",
                "plural": true,
                "selections": [
                  (v2/*: any*/),
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
                    "concreteType": "PhotoExpress",
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
                      },
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  }
                ],
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
    "cacheID": "309ba40509991da4d0b0a2cf2d2f0633",
    "id": null,
    "metadata": {},
    "name": "UserSearchBarQuery",
    "operationKind": "query",
    "text": "query UserSearchBarQuery(\n  $searchText: String!\n) {\n  UserQueries {\n    userSearch(input: {usernameOrUserId: $searchText, first: 5}) {\n      users {\n        id\n        ...useUserSearchBarUserExpress_UserExpress\n      }\n    }\n  }\n}\n\nfragment UserSearchBarSelectedItem_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment UserSearchPopoverResult_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment useUserSearchBarUserExpress_UserExpress on UserExpress {\n  id\n  ...UserSearchBarSelectedItem_UserExpress\n  ...UserSearchPopoverResult_UserExpress\n}\n"
  }
};
})();

(node as any).hash = "577cc4f13fcd108a9888120ae2960e87";

export default node;
