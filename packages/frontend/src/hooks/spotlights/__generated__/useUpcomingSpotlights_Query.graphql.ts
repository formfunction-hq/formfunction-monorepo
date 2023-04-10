/**
 * @generated SignedSource<<190c21b97ffc5c8bb3f9fb95293536e6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUpcomingSpotlights_Query$data = {
  readonly SpotlightNamespace: {
    readonly upcomingSpotlights: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"SpotlightsGridForSpotlights_SpotlightExpress">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "useUpcomingSpotlights_Query";
};
export type useUpcomingSpotlights_Query$key = {
  readonly " $data"?: useUpcomingSpotlights_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUpcomingSpotlights_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "SpotlightNamespace",
  "upcomingSpotlights"
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
      "operation": require('./UpcomingSpotlightsPaginationQuery.graphql')
    }
  },
  "name": "useUpcomingSpotlights_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SpotlightResponse",
      "kind": "LinkedField",
      "name": "SpotlightNamespace",
      "plural": false,
      "selections": [
        {
          "alias": "upcomingSpotlights",
          "args": null,
          "concreteType": "SpotlightsConnection",
          "kind": "LinkedField",
          "name": "__UpcomingSpotlights_Query_upcomingSpotlights_connection",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "SpotlightsEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "SpotlightExpress",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "SpotlightsGridForSpotlights_SpotlightExpress"
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

(node as any).hash = "6fa4982351ca7e2d40b86957a4db31ab";

export default node;
