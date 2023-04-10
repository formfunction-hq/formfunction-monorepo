/**
 * @generated SignedSource<<8f019f90825468015ca822bcdc670dcd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHolders_Query$data = {
  readonly CampaignsNamespace: {
    readonly campaignHoldersForSlug: {
      readonly holders: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly user: {
              readonly id: string;
              readonly " $fragmentSpreads": FragmentRefs<"ProfileLinkForUserExpress_UserExpress">;
            };
          };
        }>;
      };
    };
  };
  readonly " $fragmentType": "CampaignHolders_Query";
};
export type CampaignHolders_Query$key = {
  readonly " $data"?: CampaignHolders_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHolders_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "CampaignsNamespace",
  "campaignHoldersForSlug",
  "holders"
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
      "operation": require('./CampaignHoldersPaginationQuery.graphql')
    }
  },
  "name": "CampaignHolders_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignsNamespaceQueryResponse",
      "kind": "LinkedField",
      "name": "CampaignsNamespace",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CampaignHoldersForSlugResponse",
          "kind": "LinkedField",
          "name": "campaignHoldersForSlug",
          "plural": false,
          "selections": [
            {
              "alias": "holders",
              "args": [
                {
                  "kind": "Variable",
                  "name": "input",
                  "variableName": "input"
                }
              ],
              "concreteType": "HolderConnection",
              "kind": "LinkedField",
              "name": "__CampaignHolders_holders_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "HolderEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Holder",
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
                            },
                            {
                              "args": null,
                              "kind": "FragmentSpread",
                              "name": "ProfileLinkForUserExpress_UserExpress"
                            }
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

(node as any).hash = "e1a16315a2d1687152bf7dec48aef7e9";

export default node;
