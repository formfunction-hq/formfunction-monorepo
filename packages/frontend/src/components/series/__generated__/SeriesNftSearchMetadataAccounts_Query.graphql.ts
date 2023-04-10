/**
 * @generated SignedSource<<58145f577e767d5dfbe2968a5cb835a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesNftSearchMetadataAccounts_Query$data = {
  readonly metadataAccountsCreated: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly data: {
            readonly name: string;
          };
          readonly id: string;
          readonly mint: string;
          readonly nft: {
            readonly Series: {
              readonly id: string;
            } | null;
            readonly creatorId: string;
            readonly isOffPlatform: boolean;
          };
          readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchDndRow_MetadataAccount" | "GenericNftSearchRow_MetadataAccount">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "SeriesNftSearchMetadataAccounts_Query";
};
export type SeriesNftSearchMetadataAccounts_Query$key = {
  readonly " $data"?: SeriesNftSearchMetadataAccounts_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesNftSearchMetadataAccounts_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsCreated",
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
      "operation": require('./SeriesNftSearchMetadataAccountsPaginationQuery.graphql')
    }
  },
  "name": "SeriesNftSearchMetadataAccounts_Query",
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
          "name": "__SeriesNftSearch_MetadataAccounts_Query_metadataAccounts_connection",
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
                      "alias": null,
                      "args": null,
                      "concreteType": "MetadataAccountData",
                      "kind": "LinkedField",
                      "name": "data",
                      "plural": false,
                      "selections": [
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

(node as any).hash = "ecf444984de2bd9814e1687f9a11abe8";

export default node;
