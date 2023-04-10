/**
 * @generated SignedSource<<522a5643f9b122a25936c1498f2ae678>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreArtworkGrid_Query$data = {
  readonly metadataAccountsForExplore: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "ExploreArtworkGrid_Query";
};
export type ExploreArtworkGrid_Query$key = {
  readonly " $data"?: ExploreArtworkGrid_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreArtworkGrid_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsForExplore",
  "metadataAccounts"
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
      "operation": require('./ExploreArtworkGridPaginationQuery.graphql')
    }
  },
  "name": "ExploreArtworkGrid_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountsForExploreResponse",
      "kind": "LinkedField",
      "name": "metadataAccountsForExplore",
      "plural": false,
      "selections": [
        {
          "alias": "metadataAccounts",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "input"
            }
          ],
          "concreteType": "MetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ExploreArtworkGrid_Query_metadataAccounts_connection",
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ListingCardForMetadata_MetadataAccount"
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

(node as any).hash = "49845516b9132df951d39cce97211b61";

export default node;
