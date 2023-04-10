/**
 * @generated SignedSource<<f01bf1423545efe4450f2f992d47881a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UnseenActivityNotificationsCountForViewerInput = {
  viewerId?: string | null;
};
export type ActivityButtonIndicatorQuery$variables = {
  input: UnseenActivityNotificationsCountForViewerInput;
};
export type ActivityButtonIndicatorQuery$data = {
  readonly NotificationsNamespace: {
    readonly unseenActivityNotificationsCountForViewer: {
      readonly unseenActivityNotificationsCount: number;
    };
  };
};
export type ActivityButtonIndicatorQuery = {
  response: ActivityButtonIndicatorQuery$data;
  variables: ActivityButtonIndicatorQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
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
        "args": [
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "UnseenActivityNotificationsCountForViewerResponse",
        "kind": "LinkedField",
        "name": "unseenActivityNotificationsCountForViewer",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "unseenActivityNotificationsCount",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ActivityButtonIndicatorQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ActivityButtonIndicatorQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "44fd73f97324b1f071d38e3728e9f424",
    "id": null,
    "metadata": {},
    "name": "ActivityButtonIndicatorQuery",
    "operationKind": "query",
    "text": "query ActivityButtonIndicatorQuery(\n  $input: UnseenActivityNotificationsCountForViewerInput!\n) {\n  NotificationsNamespace {\n    unseenActivityNotificationsCountForViewer(input: $input) {\n      unseenActivityNotificationsCount\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5ab60b7bbb75d55738874bdfde8fe65e";

export default node;
