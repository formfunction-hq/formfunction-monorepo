/**
 * @generated SignedSource<<c1debf76aa35698a2fbc9303b6b9f2ca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetadataAccountsAvailableToAddToCampaignInput = {
  campaignFundingTierId: string;
  creatorAddress?: string | null;
  creatorUsername?: string | null;
};
export type CampaignFundingTierManageNftsModalMetadataAccountsQuery$variables = {
  after?: string | null;
  first: number;
  input: MetadataAccountsAvailableToAddToCampaignInput;
};
export type CampaignFundingTierManageNftsModalMetadataAccountsQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FundingTierNftSearchMetadataAccounts_Query">;
};
export type CampaignFundingTierManageNftsModalMetadataAccountsQuery = {
  response: CampaignFundingTierManageNftsModalMetadataAccountsQuery$data;
  variables: CampaignFundingTierManageNftsModalMetadataAccountsQuery$variables;
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
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignFundingTierManageNftsModalMetadataAccountsQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "FundingTierNftSearchMetadataAccounts_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CampaignFundingTierManageNftsModalMetadataAccountsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "MetadataAccountsAvailableToAddToCampaignResponse",
        "kind": "LinkedField",
        "name": "metadataAccountsAvailableToAddToCampaign",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "MetadataAccountsConnection",
            "kind": "LinkedField",
            "name": "metadataAccounts",
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
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "NftExpress",
                        "kind": "LinkedField",
                        "name": "nft",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "masterEditionMint",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "Creator",
                            "plural": false,
                            "selections": (v3/*: any*/),
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "UserExpress",
                            "kind": "LinkedField",
                            "name": "Owner",
                            "plural": false,
                            "selections": (v3/*: any*/),
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
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "mint",
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
                        "concreteType": "MetadataOffchain",
                        "kind": "LinkedField",
                        "name": "offchainData",
                        "plural": false,
                        "selections": [
                          {
                            "alias": null,
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
            "key": "FundingTierNftSearch_MetadataAccounts_Query_metadataAccounts",
            "kind": "LinkedHandle",
            "name": "metadataAccounts"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "74daed46c0764ff0644b6683fb69b3a9",
    "id": null,
    "metadata": {},
    "name": "CampaignFundingTierManageNftsModalMetadataAccountsQuery",
    "operationKind": "query",
    "text": "query CampaignFundingTierManageNftsModalMetadataAccountsQuery(\n  $after: String\n  $first: PaginationAmount!\n  $input: MetadataAccountsAvailableToAddToCampaignInput!\n) {\n  ...FundingTierNftSearchMetadataAccounts_Query\n}\n\nfragment FundingTierNftSearchMetadataAccounts_Query on query_root {\n  metadataAccountsAvailableToAddToCampaign {\n    metadataAccounts(after: $after, first: $first, input: $input) {\n      edges {\n        node {\n          id\n          nft {\n            id\n          }\n          data {\n            name\n          }\n          mint\n          ...GenericNftSearchRow_MetadataAccount\n          ...GenericNftSearchDndRow_MetadataAccount\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n\nfragment GenericNftSearchDndRow_MetadataAccount on MetadataAccount {\n  id\n  ...GenericNftSearchRow_MetadataAccount\n}\n\nfragment GenericNftSearchRow_MetadataAccount on MetadataAccount {\n  id\n  data {\n    name\n  }\n  ...NftAssetForMetadataAccount_MetadataAccount\n}\n\nfragment NftAssetForMetadataAccount_MetadataAccount on MetadataAccount {\n  contentType\n  videoPlaybackId\n  videoPreviewPlaybackId\n  offchainData {\n    image\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "b5c57d69e6e7b3de0b315ff774f5f8b4";

export default node;
