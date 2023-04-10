/**
 * @generated SignedSource<<c7786180ad0706d15fd52ad3467215e7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useSeriesPageMetadataAccounts_Query$data = {
  readonly metadataAccountsForSeries: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly mint: string;
          readonly nft: {
            readonly Series: {
              readonly id: string;
            } | null;
            readonly creatorId: string;
            readonly id: string;
            readonly isOffPlatform: boolean;
            readonly ownerId: string;
          };
          readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchDndRow_MetadataAccount" | "GenericNftSearchRow_MetadataAccount" | "ListingCardForMetadata_MetadataAccount">;
        };
      }>;
    };
  } | null;
  readonly " $fragmentType": "useSeriesPageMetadataAccounts_Query";
};
export type useSeriesPageMetadataAccounts_Query$key = {
  readonly " $data"?: useSeriesPageMetadataAccounts_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"useSeriesPageMetadataAccounts_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsForSeries",
  "metadataAccounts"
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
      "operation": require('./SeriesPageMetadataAccountsPaginationQuery.graphql')
    }
  },
  "name": "useSeriesPageMetadataAccounts_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountsForSeriesResponse",
      "kind": "LinkedField",
      "name": "metadataAccountsForSeries",
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
          "name": "__SeriesPage_MetadataAccounts_Query_metadataAccounts_connection",
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
                    (v1/*: any*/),
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
                        (v1/*: any*/),
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "creatorId",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "isOffPlatform",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "kind": "ScalarField",
                          "name": "ownerId",
                          "storageKey": null
                        },
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "SeriesExpress",
                          "kind": "LinkedField",
                          "name": "Series",
                          "plural": false,
                          "selections": [
                            (v1/*: any*/)
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "GenericNftSearchRow_MetadataAccount"
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "GenericNftSearchDndRow_MetadataAccount"
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

(node as any).hash = "c16a98f9aaf9271ae8480650ee151167";

export default node;
