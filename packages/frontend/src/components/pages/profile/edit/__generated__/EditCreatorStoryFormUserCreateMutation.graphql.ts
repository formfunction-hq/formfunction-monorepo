/**
 * @generated SignedSource<<85c6e190a6f3954ce70dc0f0515436da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type EditCreatorStoryFormUserCreateMutation$variables = {
  colorScheme: number;
  goals: string;
  headline: string;
  inspiration: string;
  process: string;
  userId: string;
};
export type EditCreatorStoryFormUserCreateMutation$data = {
  readonly insert_CreatorStory_one: {
    readonly colorScheme: number;
    readonly goals: string | null;
    readonly headline: string | null;
    readonly id: string;
    readonly inspiration: string | null;
    readonly process: string | null;
  } | null;
};
export type EditCreatorStoryFormUserCreateMutation = {
  response: EditCreatorStoryFormUserCreateMutation$data;
  variables: EditCreatorStoryFormUserCreateMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "colorScheme"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "goals"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "headline"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "inspiration"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "process"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
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
          },
          {
            "kind": "Variable",
            "name": "userId",
            "variableName": "userId"
          }
        ],
        "kind": "ObjectValue",
        "name": "object"
      }
    ],
    "concreteType": "CreatorStory",
    "kind": "LinkedField",
    "name": "insert_CreatorStory_one",
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditCreatorStoryFormUserCreateMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditCreatorStoryFormUserCreateMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ca3f9e93ad6ddbff779100286cd32f63",
    "id": null,
    "metadata": {},
    "name": "EditCreatorStoryFormUserCreateMutation",
    "operationKind": "mutation",
    "text": "mutation EditCreatorStoryFormUserCreateMutation(\n  $colorScheme: Int!\n  $goals: String!\n  $headline: String!\n  $inspiration: String!\n  $process: String!\n  $userId: String!\n) {\n  insert_CreatorStory_one(object: {colorScheme: $colorScheme, goals: $goals, headline: $headline, inspiration: $inspiration, process: $process, userId: $userId}) {\n    id\n    colorScheme\n    goals\n    headline\n    inspiration\n    process\n  }\n}\n"
  }
};
})();

(node as any).hash = "62b82fedba8316dfbcea5dc68e9b4742";

export default node;
