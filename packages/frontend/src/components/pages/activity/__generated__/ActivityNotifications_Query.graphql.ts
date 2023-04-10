/**
 * @generated SignedSource<<b03318d4fe914ff2eb37e6213e95519e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment, RefetchableFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotifications_Query$data = {
  readonly NotificationsNamespace: {
    readonly activityNotificationsForViewer: {
      readonly activityNotifications: {
        readonly edges: ReadonlyArray<{
          readonly node: {
            readonly id?: string;
          };
          readonly " $fragmentSpreads": FragmentRefs<"ActivityNotification_ActivityNotificationsEdge">;
        }>;
      };
    };
  };
  readonly " $fragmentType": "ActivityNotifications_Query";
};
export type ActivityNotifications_Query$key = {
  readonly " $data"?: ActivityNotifications_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotifications_Query">;
};

const node: ReaderFragment = (function(){
var v0 = [
  "NotificationsNamespace",
  "activityNotificationsForViewer",
  "activityNotifications"
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
      "operation": require('./ActivityNotificationsPaginationQuery.graphql')
    }
  },
  "name": "ActivityNotifications_Query",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NotificationsNamespaceResponse",
      "kind": "LinkedField",
      "name": "NotificationsNamespace",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ActivityNotificationsForViewerResponse",
          "kind": "LinkedField",
          "name": "activityNotificationsForViewer",
          "plural": false,
          "selections": [
            {
              "alias": "activityNotifications",
              "args": null,
              "concreteType": "ActivityNotificationsConnection",
              "kind": "LinkedField",
              "name": "__ActivityNotifications_Query_activityNotifications_connection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ActivityNotificationsEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": null,
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "kind": "InlineFragment",
                          "selections": [
                            {
                              "alias": null,
                              "args": null,
                              "kind": "ScalarField",
                              "name": "id",
                              "storageKey": null
                            }
                          ],
                          "type": "IActivityNotification",
                          "abstractKey": "__isIActivityNotification"
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ActivityNotification_ActivityNotificationsEdge"
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

(node as any).hash = "e2ecd6d099baeb3a47d1b6bc79c2899f";

export default node;
