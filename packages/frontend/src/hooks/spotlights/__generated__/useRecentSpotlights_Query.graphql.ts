/**
 * @generated SignedSource<<5e01e58927992e7b17239e0abb59a414>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useRecentSpotlights_Query$data = {
  readonly SpotlightNamespace: {
    readonly recentSpotlights: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"SpotlightsGridForSpotlights_SpotlightExpress">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "useRecentSpotlights_Query";
};
export type useRecentSpotlights_Query$key = {
  readonly " $data"?: useRecentSpotlights_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"useRecentSpotlights_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "SpotlightNamespace",
  "recentSpotlights"
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
      "operation": require('./RecentSpotlightsPaginationQuery.graphql')
    }
  },
  "name": "useRecentSpotlights_Query",
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
          "alias": "recentSpotlights",
          "args": null,
          "concreteType": "SpotlightsConnection",
          "kind": "LinkedField",
          "name": "__RecentSpotlights_Query_recentSpotlights_connection",
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

(node as any).hash = "9279afd5954140f31f4b2a31e391fd15";

export default node;
