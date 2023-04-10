/**
 * @generated SignedSource<<cf443a67ba25408951264cc95c031eda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useActiveSpotlights_Query$data = {
  readonly SpotlightNamespace: {
    readonly activeSpotlights: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly " $fragmentSpreads": FragmentRefs<"ActiveSpotlightHero_SpotlightExpress">;
        };
      }>;
    };
  };
  readonly " $fragmentType": "useActiveSpotlights_Query";
};
export type useActiveSpotlights_Query$key = {
  readonly " $data"?: useActiveSpotlights_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"useActiveSpotlights_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "SpotlightNamespace",
  "activeSpotlights"
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
      "operation": require('./ActiveSpotlightsPaginationQuery.graphql')
    }
  },
  "name": "useActiveSpotlights_Query",
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
          "alias": "activeSpotlights",
          "args": null,
          "concreteType": "SpotlightsConnection",
          "kind": "LinkedField",
          "name": "__ActiveSpotlights_Query_activeSpotlights_connection",
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
                      "name": "ActiveSpotlightHero_SpotlightExpress"
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

(node as any).hash = "a68774a82fa9f831f2ddf0e6476cbe4a";

export default node;
