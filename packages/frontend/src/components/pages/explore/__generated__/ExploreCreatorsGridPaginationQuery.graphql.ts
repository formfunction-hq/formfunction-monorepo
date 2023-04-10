/**
 * @generated SignedSource<<0bea6a55c4618367a63e79e7af06654f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCreatorsSortOrder = "Newest" | "Oldest" | "%future added value";
export type UsersForExploreInput = {
  orderBy?: ExploreCreatorsSortOrder | null;
};
export type ExploreCreatorsGridPaginationQuery$variables = {
  after?: string | null;
  first: number;
  input: UsersForExploreInput;
};
export type ExploreCreatorsGridPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCreatorsGrid_Query">;
};
export type ExploreCreatorsGridPaginationQuery = {
  response: ExploreCreatorsGridPaginationQuery$data;
  variables: ExploreCreatorsGridPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExploreCreatorsGridPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ExploreCreatorsGrid_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExploreCreatorsGridPaginationQuery",
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
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserAndMetadataAccountsConnection",
            "kind": "LinkedField",
            "name": "users",
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
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "bio",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "displayName",
                            "storageKey": null
                          },
                          (v3/*: any*/),
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "MetadataAccount",
                        "kind": "LinkedField",
                        "name": "metadataAccounts",
                        "plural": true,
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assetHeight",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "assetWidth",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "contentType",
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
                            "concreteType": "MetadataOffchain",
                            "kind": "LinkedField",
                            "name": "offchainData",
                            "plural": false,
                            "selections": [
                              {
                                "alias": "creatorCardImage",
                                "args": null,
                                "kind": "ScalarField",
                                "name": "image",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "videoPlaybackId",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "videoPreviewPlaybackId",
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
                                "concreteType": "NftDisclosureExpress",
                                "kind": "LinkedField",
                                "name": "disclosures",
                                "plural": true,
                                "selections": [
                                  {
                                    "alias": null,
                                    "args": null,
                                    "kind": "ScalarField",
                                    "name": "type",
                                    "storageKey": null
                                  }
                                ],
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "concreteType": "UserExpress",
                                "kind": "LinkedField",
                                "name": "Owner",
                                "plural": false,
                                "selections": [
                                  (v3/*: any*/),
                                  (v2/*: any*/)
                                ],
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          },
                          (v2/*: any*/)
                        ],
                        "storageKey": null
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
          },
          {
            "alias": null,
            "args": (v1/*: any*/),
            "filters": [
              "input"
            ],
            "handle": "connection",
            "key": "ExploreCreatorsGrid_Query_users",
            "kind": "LinkedHandle",
            "name": "users"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "40a39cec173260670857535fda69b8ed",
    "id": null,
    "metadata": {},
    "name": "ExploreCreatorsGridPaginationQuery",
    "operationKind": "query",
    "text": "query ExploreCreatorsGridPaginationQuery(\n  $after: String\n  $first: Int!\n  $input: UsersForExploreInput!\n) {\n  ...ExploreCreatorsGrid_Query\n}\n\nfragment ExploreCardNftAsset_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  mint\n  offchainData {\n    creatorCardImage: image\n  }\n  videoPlaybackId\n  videoPreviewPlaybackId\n  nft {\n    ...useDoesNftHaveDisclosure_NftExpress\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment ExploreCreatorCard_UserAndMetadataAccounts on UserAndMetadataAccounts {\n  user {\n    bio\n    displayName\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  metadataAccounts {\n    ...ExploreCardNftAsset_MetadataAccount\n    id\n  }\n}\n\nfragment ExploreCreatorsGrid_Query on query_root {\n  usersForExplore {\n    users(after: $after, first: $first, input: $input) {\n      edges {\n        node {\n          user {\n            id\n          }\n          ...ExploreCreatorCard_UserAndMetadataAccounts\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "07df1ba7cea1aa0812b273de2cb726ce";

export default node;
