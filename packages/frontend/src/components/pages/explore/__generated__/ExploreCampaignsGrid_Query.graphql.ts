/**
 * @generated SignedSource<<4215e539cd71647cb57f1ef846c09dd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCampaignsGrid_Query$data = {
  readonly CampaignsNamespace: {
    readonly campaignsForExplore: {
      readonly campaigns: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2_CampaignV2">;
          };
        }>;
      } | null;
    };
  };
  readonly " $fragmentType": "ExploreCampaignsGrid_Query";
};
export type ExploreCampaignsGrid_Query$key = {
  readonly " $data"?: ExploreCampaignsGrid_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignsGrid_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "CampaignsNamespace",
  "campaignsForExplore",
  "campaigns"
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
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
      "operation": require('./ExploreCampaignsGridPaginationQuery.graphql')
    }
  },
  "name": "ExploreCampaignsGrid_Query",
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
          "args": (v1/*: any*/),
          "concreteType": "CampaignsForExploreResponse",
          "kind": "LinkedField",
          "name": "campaignsForExplore",
          "plural": false,
          "selections": [
            {
              "alias": "campaigns",
              "args": (v1/*: any*/),
              "concreteType": "CampaignsConnection",
              "kind": "LinkedField",
              "name": "__ExploreCampaignsGrid_Query_campaigns_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CampaignsEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CampaignV2",
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
                          "name": "ExploreCampaignCardForCampaignV2_CampaignV2"
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

(node as any).hash = "5da3ada4f3b0d1b8b9211aee03c14e85";

export default node;
