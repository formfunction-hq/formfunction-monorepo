/**
 * @generated SignedSource<<6a8eb8e1b202954c4e38b46c14bfae68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageSeriesPiecesModalMetadataAccounts_Query$data = {
  readonly metadataAccountsCreated: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly mint: string;
          readonly nft: {
            readonly isImported: boolean;
            readonly isMasterEdition: boolean;
          };
          readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
        };
      }>;
    };
  };
  readonly " $fragmentSpreads": FragmentRefs<"SeriesNftSearchMetadataAccounts_Query">;
  readonly " $fragmentType": "ManageSeriesPiecesModalMetadataAccounts_Query";
};
export type ManageSeriesPiecesModalMetadataAccounts_Query$key = {
  readonly " $data"?: ManageSeriesPiecesModalMetadataAccounts_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSeriesPiecesModalMetadataAccounts_Query">;
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
      "operation": require('./ManageSeriesPiecesModalMetadataAccountsPaginationQuery.graphql')
    }
  },
  "name": "ManageSeriesPiecesModalMetadataAccounts_Query",
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
              "variableName": "input"
            }
          ],
          "concreteType": "MetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ManageSeriesPiecesModal_MetadataAccounts_Query_metadataAccounts_connection",
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
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "mint",
                      "storageKey": null
                    },
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "NftExpress",
                      "kind": "LinkedField",
                      "name": "nft",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isMasterEdition",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isImported",
                          "storageKey": null
                        }
                      ],
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesNftSearchMetadataAccounts_Query"
    }
  ],
  "type": "query_root",
  "abstractKey": null
};
})();

(node as any).hash = "5ffe86d59eba3ac3c7f571a7cecb6296";

export default node;
