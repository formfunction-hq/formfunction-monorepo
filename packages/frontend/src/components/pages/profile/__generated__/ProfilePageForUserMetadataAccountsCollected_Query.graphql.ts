/**
 * @generated SignedSource<<40da71284e803c1dd6a8d6b06732cff7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageForUserMetadataAccountsCollected_Query$data = {
  readonly metadataAccountsCollected: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_MetadataAccount">;
        };
      }>;
      readonly totalCount: number;
    };
  };
  readonly " $fragmentType": "ProfilePageForUserMetadataAccountsCollected_Query";
};
export type ProfilePageForUserMetadataAccountsCollected_Query$key = {
  readonly " $data"?: ProfilePageForUserMetadataAccountsCollected_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUserMetadataAccountsCollected_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsCollected",
  "metadataAccounts"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCollectedAfter"
    },
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCollectedFirst"
    },
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCollectedInput"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "connection": [
      {
        "count": "metadataAccountsCollectedFirst",
        "cursor": "metadataAccountsCollectedAfter",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "metadataAccountsCollectedFirst",
          "cursor": "metadataAccountsCollectedAfter"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ProfilePageForUserMetadataAccountsCollectedPaginationQuery.graphql')
    }
  },
  "name": "ProfilePageForUserMetadataAccountsCollected_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountsCollectedResponse",
      "kind": "LinkedField",
      "name": "metadataAccountsCollected",
      "plural": false,
      "selections": [
        {
          "alias": "metadataAccounts",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "metadataAccountsCollectedInput"
            }
          ],
          "concreteType": "MetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ProfilePageForUser_MetadataAccountsCollected_Query_metadataAccounts_connection",
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

(node as any).hash = "c46c7dfcea6ad98a961fad2c69e1021c";

export default node;
