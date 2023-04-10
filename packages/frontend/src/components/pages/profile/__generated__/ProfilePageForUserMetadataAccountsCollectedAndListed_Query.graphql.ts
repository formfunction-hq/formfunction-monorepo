/**
 * @generated SignedSource<<915840f1007495422f577de4dbefdbd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageForUserMetadataAccountsCollectedAndListed_Query$data = {
  readonly metadataAccountsCollected: {
    readonly metadataAccountsListedByUser: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_MetadataAccount">;
        };
      }>;
      readonly totalCount: number;
    };
  };
  readonly " $fragmentType": "ProfilePageForUserMetadataAccountsCollectedAndListed_Query";
};
export type ProfilePageForUserMetadataAccountsCollectedAndListed_Query$key = {
  readonly " $data"?: ProfilePageForUserMetadataAccountsCollectedAndListed_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUserMetadataAccountsCollectedAndListed_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "metadataAccountsCollected",
  "metadataAccountsListedByUser"
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCollectedAndListedAfter"
    },
    {
      "kind": "RootArgument",
      "name": "metadataAccountsCollectedAndListedFirst"
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
        "count": "metadataAccountsCollectedAndListedFirst",
        "cursor": "metadataAccountsCollectedAndListedAfter",
        "direction": "forward",
        "path": (v0/*: any*/)
      }
    ],
    "refetch": {
      "connection": {
        "forward": {
          "count": "metadataAccountsCollectedAndListedFirst",
          "cursor": "metadataAccountsCollectedAndListedAfter"
        },
        "backward": null,
        "path": (v0/*: any*/)
      },
      "fragmentPathInResult": [],
      "operation": require('./ProfilePageForUserMetadataAccountsCollectedAndListedPaginationQuery.graphql')
    }
  },
  "name": "ProfilePageForUserMetadataAccountsCollectedAndListed_Query",
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
          "alias": "metadataAccountsListedByUser",
          "args": [
            {
              "kind": "Variable",
              "name": "input",
              "variableName": "metadataAccountsCollectedInput"
            }
          ],
          "concreteType": "MetadataAccountsConnection",
          "kind": "LinkedField",
          "name": "__ProfilePageForUser_MetadataAccountsCollectedAndListed_Query_metadataAccountsListedByUser_connection",
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

(node as any).hash = "08b277d99cc58f2a41b24e763fbb526c";

export default node;
