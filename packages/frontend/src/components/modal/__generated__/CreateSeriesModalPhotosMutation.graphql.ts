/**
 * @generated SignedSource<<f41759292e6d33936aefa71cb2a48a64>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Photo_insert_input = {
  description?: string | null;
  id?: string | null;
  photoUrl?: string | null;
  storagePath?: string | null;
  timeCreated?: string | null;
  title?: string | null;
  userId?: string | null;
};
export type CreateSeriesModalPhotosMutation$variables = {
  objects: ReadonlyArray<Photo_insert_input>;
};
export type CreateSeriesModalPhotosMutation$data = {
  readonly insert_Photo: {
    readonly returning: ReadonlyArray<{
      readonly id: string;
      readonly photoUrl: string;
    }>;
  } | null;
};
export type CreateSeriesModalPhotosMutation = {
  response: CreateSeriesModalPhotosMutation$data;
  variables: CreateSeriesModalPhotosMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "objects"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "objects",
        "variableName": "objects"
      }
    ],
    "concreteType": "Photo_mutation_response",
    "kind": "LinkedField",
    "name": "insert_Photo",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Photo",
        "kind": "LinkedField",
        "name": "returning",
        "plural": true,
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
            "name": "photoUrl",
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
    "name": "CreateSeriesModalPhotosMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateSeriesModalPhotosMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "91420257cbf7ddbb466ca1beff6b200c",
    "id": null,
    "metadata": {},
    "name": "CreateSeriesModalPhotosMutation",
    "operationKind": "mutation",
    "text": "mutation CreateSeriesModalPhotosMutation(\n  $objects: [Photo_insert_input!]!\n) {\n  insert_Photo(objects: $objects) {\n    returning {\n      id\n      photoUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e1fcd124fbb438c1ebea5ea33aeb1eee";

export default node;
