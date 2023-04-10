/**
 * @generated SignedSource<<42bf96937b272bbffe1e9aaf7f94ac17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaigns_Query$data = {
  readonly CampaignsNamespace: {
    readonly campaignsForUser: {
      readonly campaigns: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id: string;
            readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2">;
          };
        }>;
      } | null;
    };
  };
  readonly " $fragmentType": "ProfileCampaigns_Query";
};
export type ProfileCampaigns_Query$key = {
  readonly " $data"?: ProfileCampaigns_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaigns_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "CampaignsNamespace",
  "campaignsForUser",
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
      "operation": require('./ProfileCampaignsPaginationQuery.graphql')
    }
  },
  "name": "ProfileCampaigns_Query",
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
          "concreteType": "CampaignsForUserResponse",
          "kind": "LinkedField",
          "name": "campaignsForUser",
          "plural": false,
          "selections": [
            {
              "alias": "campaigns",
              "args": (v1/*: any*/),
              "concreteType": "CampaignsConnection",
              "kind": "LinkedField",
              "name": "__ProfileCampaigns_Query_campaigns_connection",
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
                          "name": "ExploreCampaignCardForCampaignV2WithNftAssets_CampaignV2"
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

(node as any).hash = "df20da8956785e32433ebcd16d524a67";

export default node;
