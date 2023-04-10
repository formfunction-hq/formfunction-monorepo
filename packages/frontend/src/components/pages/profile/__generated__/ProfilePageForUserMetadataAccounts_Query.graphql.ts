/**
 * @generated SignedSource<<43da11c56913ab836a5d56e2ef10d5b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageForUserMetadataAccounts_Query$data = {
  readonly metadataAccountsCreated: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_MetadataAccount">;
        };
      }>;
      readonly totalCount: number;
    };
  };
  readonly " $fragmentType": "ProfilePageForUserMetadataAccounts_Query";
};
export type ProfilePageForUserMetadataAccounts_Query$key = {
  readonly " $data"?: ProfilePageForUserMetadataAccounts_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUserMetadataAccounts_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsCreated",
  "metadataAccounts"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCreatedAfter"
    },
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCreatedFirst"
    },
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCreatedInput"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "metadataAccountsCreatedFirst",
        "cursor": "metadataAccountsCreatedAfter",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "metadataAccountsCreatedFirst",
          "cursor": "metadataAccountsCreatedAfter"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ProfilePageForUserMetadataAccountsPaginationQuery.graphql')
    }
  },
  "name": "ProfilePageForUserMetadataAccounts_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountsCreatedResponse",
      "kind": "LinkedField",
      "name": "metadataAccountsCreated",
      "plural": false,
      "selections": [
        {
          "alias": "metadataAccounts",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "metadataAccountsCreatedInput"
            }
          ],
          "concreteType": "MetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ProfilePageForUser_MetadataAccounts_Query_metadataAccounts_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "MetadataAccountsEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "MetadataAccount",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "NftsForAddress_MetadataAccount"
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
              "kind": "ScalarField",
              "name": "totalCount",
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

(node as any).hash = "0a2661ac354e138062370eb173ae6de0";

export default node;
