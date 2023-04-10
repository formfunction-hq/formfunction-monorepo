/**
 * @generated SignedSource<<b2807ef583d47a8735139744d2232b2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditCreatorStoryFormUserUpdateMutation$variables = {
  colorScheme: number;
  goals: string;
  headline: string;
  id: string;
  inspiration: string;
  process: string;
};
export type EditCreatorStoryFormUserUpdateMutation$data = {
  readonly update_CreatorStory_by_pk: {
    readonly colorScheme: number;
    readonly goals: string | null;
    readonly headline: string | null;
    readonly id: string;
    readonly inspiration: string | null;
    readonly process: string | null;
  } | null;
};
export type EditCreatorStoryFormUserUpdateMutation = {
  response: EditCreatorStoryFormUserUpdateMutation$data;
  variables: EditCreatorStoryFormUserUpdateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "colorScheme"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "goals"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "headline"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "id"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "inspiration"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "process"
},
v6 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "colorScheme",
            "variableName": "colorScheme"
          },
          {
            "kind": "Variable",
            "name": "goals",
            "variableName": "goals"
          },
          {
            "kind": "Variable",
            "name": "headline",
            "variableName": "headline"
          },
          {
            "kind": "Variable",
            "name": "inspiration",
            "variableName": "inspiration"
          },
          {
            "kind": "Variable",
            "name": "process",
            "variableName": "process"
          }
        ],
        "kind": "ObjectValue",
        "name": "_set"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "kind": "ObjectValue",
        "name": "pk_columns"
      }
    ],
    "concreteType": "CreatorStory",
    "kind": "LinkedField",
    "name": "update_CreatorStory_by_pk",
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
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "colorScheme",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "goals",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "headline",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inspiration",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "process",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "EditCreatorStoryFormUserUpdateMutation",
    "selections": (v6/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/)
    ],
    "kind": "Operation",
    "name": "EditCreatorStoryFormUserUpdateMutation",
    "selections": (v6/*: any*/)
  },
  "params": {
    "cacheID": "3ff8893f65bbe0a112222c223f144fb6",
    "id": null,
    "metadata": {},
    "name": "EditCreatorStoryFormUserUpdateMutation",
    "operationKind": "mutation",
    "text": "mutation EditCreatorStoryFormUserUpdateMutation(\n  $id: uuid!\n  $colorScheme: Int!\n  $goals: String!\n  $headline: String!\n  $inspiration: String!\n  $process: String!\n) {\n  update_CreatorStory_by_pk(_set: {colorScheme: $colorScheme, goals: $goals, headline: $headline, inspiration: $inspiration, process: $process}, pk_columns: {id: $id}) {\n    id\n    colorScheme\n    goals\n    headline\n    inspiration\n    process\n  }\n}\n"
  }
};
})();

(node as any).hash = "13e10f05e9000b53b2f0a1dd7101571f";

export default node;
