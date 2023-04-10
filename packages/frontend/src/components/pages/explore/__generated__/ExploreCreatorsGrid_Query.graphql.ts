/**
 * @generated SignedSource<<2019c82eb0c1eab587569577893c2775>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCreatorsGrid_Query$data = {
  readonly usersForExplore: {
    readonly users: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly user: {
            readonly id: string;
          };
          readonly " $fragmentSpreads": FragmentRefs<"ExploreCreatorCard_UserAndMetadataAccounts">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "ExploreCreatorsGrid_Query";
};
export type ExploreCreatorsGrid_Query$key = {
  readonly " $data"?: ExploreCreatorsGrid_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCreatorsGrid_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "usersForExplore",
  "users"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "first",
        "cursor": "after",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "first",
          "cursor": "after"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ExploreCreatorsGridPaginationQuery.graphql')
    }
  },
  "name": "ExploreCreatorsGrid_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UsersForExploreResponse",
      "kind": "LinkedField",
      "name": "usersForExplore",
      "plural": false,
      "selections": [
        {
          "alias": "users",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "input"
            }
          ],
          "concreteType": "UserAndMetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ExploreCreatorsGrid_Query_users_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "UserAndMetadataAccountsEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "UserAndMetadataAccounts",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
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
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "id",
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ExploreCreatorCard_UserAndMetadataAccounts"
                    },
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "__typename",
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "cursor",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PageInfo",
              "kind": "LinkedField",
              "name": "pageInfo",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "endCursor",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "hasNextPage",
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
  ],
  "type": "query_root",
  "abstractKey": null
};
})();

(node as any).hash = "07df1ba7cea1aa0812b273de2cb726ce";

export default node;
