/**
 * @generated SignedSource<<9af5c3c8a90d05d56a46742be6df102c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type RespondToPollInput = {
  pollOptionId: string;
  responseValue: boolean;
};
export type PollOptionForPollOptionExpressMutation$variables = {
  input: RespondToPollInput;
};
export type PollOptionForPollOptionExpressMutation$data = {
  readonly PostNamespace: {
    readonly respondToPoll: {
      readonly poll: {
        readonly id: string;
        readonly options: ReadonlyArray<{
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"PollOptionForPollOptionExpress_PollOptionExpress">;
        }>;
        readonly totalResponses: number;
        readonly viewerRespondedToPoll: boolean;
      };
    } | null;
  };
};
export type PollOptionForPollOptionExpressMutation = {
  response: PollOptionForPollOptionExpressMutation$data;
  variables: PollOptionForPollOptionExpressMutation$variables;
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
  "name": "totalResponses",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "viewerRespondedToPoll",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PollOptionForPollOptionExpressMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "RespondToPollResponse",
            "kind": "LinkedField",
            "name": "respondToPoll",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PollExpress",
                "kind": "LinkedField",
                "name": "poll",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PollOptionExpress",
                    "kind": "LinkedField",
                    "name": "options",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "PollOptionForPollOptionExpress_PollOptionExpress"
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v4/*: any*/)
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
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PollOptionForPollOptionExpressMutation",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "RespondToPollResponse",
            "kind": "LinkedField",
            "name": "respondToPoll",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "PollExpress",
                "kind": "LinkedField",
                "name": "poll",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PollOptionExpress",
                    "kind": "LinkedField",
                    "name": "options",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "text",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "responseCount",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "viewerRespondedToPollOption",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/),
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d0bbf4c170e81de53f2ecb3e84e2c236",
    "id": null,
    "metadata": {},
    "name": "PollOptionForPollOptionExpressMutation",
    "operationKind": "mutation",
    "text": "mutation PollOptionForPollOptionExpressMutation(\n  $input: RespondToPollInput!\n) {\n  PostNamespace {\n    respondToPoll(input: $input) {\n      poll {\n        id\n        options {\n          id\n          ...PollOptionForPollOptionExpress_PollOptionExpress\n        }\n        totalResponses\n        viewerRespondedToPoll\n      }\n    }\n  }\n}\n\nfragment PollOptionForPollOptionExpress_PollOptionExpress on PollOptionExpress {\n  id\n  text\n  responseCount\n  viewerRespondedToPollOption\n}\n"
  }
};
})();

(node as any).hash = "bbd0fee67ee28f90a5c47d8f895e2d4d";

export default node;
