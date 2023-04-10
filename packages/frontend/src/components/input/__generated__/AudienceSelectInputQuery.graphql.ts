/**
 * @generated SignedSource<<daff85facba2ead86fc0d500d2c90813>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HoldersForUserInput = {
  userId: string;
};
export type SeriesHoldersForUserInput = {
  userId: string;
};
export type AudienceSelectInputQuery$variables = {
  holdersForUserInput: HoldersForUserInput;
  seriesHoldersForUserInput: SeriesHoldersForUserInput;
};
export type AudienceSelectInputQuery$data = {
  readonly HolderQueries: {
    readonly holdersForUser: {
      readonly holders: ReadonlyArray<{
        readonly user: {
          readonly " $fragmentSpreads": FragmentRefs<"useUserSearchBarUserExpress_UserExpress">;
        };
      }> | null;
    };
    readonly seriesHoldersForUser: {
      readonly seriesHolders: ReadonlyArray<{
        readonly holders: ReadonlyArray<{
          readonly user: {
            readonly " $fragmentSpreads": FragmentRefs<"useUserSearchBarUserExpress_UserExpress">;
          };
        }>;
        readonly series: {
          readonly id: string;
          readonly name: string;
        };
      }> | null;
    };
  };
};
export type AudienceSelectInputQuery = {
  response: AudienceSelectInputQuery$data;
  variables: AudienceSelectInputQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "holdersForUserInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "seriesHoldersForUserInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "holdersForUserInput"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "Holder",
  "kind": "LinkedField",
  "name": "holders",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
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
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "seriesHoldersForUserInput"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "SeriesExpress",
  "kind": "LinkedField",
  "name": "series",
  "plural": false,
  "selections": [
    (v4/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Holder",
  "kind": "LinkedField",
  "name": "holders",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        (v4/*: any*/),
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
            (v4/*: any*/)
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AudienceSelectInputQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HolderQueriesResponse",
        "kind": "LinkedField",
        "name": "HolderQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "HoldersForUserResponse",
            "kind": "LinkedField",
            "name": "holdersForUser",
            "plural": false,
            "selections": [
              (v2/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "SeriesHoldersForUserResponse",
            "kind": "LinkedField",
            "name": "seriesHoldersForUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SeriesHolders",
                "kind": "LinkedField",
                "name": "seriesHolders",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
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
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AudienceSelectInputQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "HolderQueriesResponse",
        "kind": "LinkedField",
        "name": "HolderQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "HoldersForUserResponse",
            "kind": "LinkedField",
            "name": "holdersForUser",
            "plural": false,
            "selections": [
              (v6/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "SeriesHoldersForUserResponse",
            "kind": "LinkedField",
            "name": "seriesHoldersForUser",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "SeriesHolders",
                "kind": "LinkedField",
                "name": "seriesHolders",
                "plural": true,
                "selections": [
                  (v5/*: any*/),
                  (v6/*: any*/)
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
    "cacheID": "06c82d482f9e5c7a99ab45d4057e3256",
    "id": null,
    "metadata": {},
    "name": "AudienceSelectInputQuery",
    "operationKind": "query",
    "text": "query AudienceSelectInputQuery(\n  $holdersForUserInput: HoldersForUserInput!\n  $seriesHoldersForUserInput: SeriesHoldersForUserInput!\n) {\n  HolderQueries {\n    holdersForUser(input: $holdersForUserInput) {\n      holders {\n        user {\n          ...useUserSearchBarUserExpress_UserExpress\n          id\n        }\n      }\n    }\n    seriesHoldersForUser(input: $seriesHoldersForUserInput) {\n      seriesHolders {\n        series {\n          id\n          name\n        }\n        holders {\n          user {\n            ...useUserSearchBarUserExpress_UserExpress\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment UserSearchBarSelectedItem_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment UserSearchPopoverResult_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment useUserSearchBarUserExpress_UserExpress on UserExpress {\n  id\n  ...UserSearchBarSelectedItem_UserExpress\n  ...UserSearchPopoverResult_UserExpress\n}\n"
  }
};
})();

(node as any).hash = "a3a5bb3483861d40bc11aa465940604f";

export default node;
