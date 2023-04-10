/**
 * @generated SignedSource<<f8319daaec12c8402169d4518fb5660b>>
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
export type EditProfileFormPhotosMutation$variables = {
  objects: ReadonlyArray<Photo_insert_input>;
};
export type EditProfileFormPhotosMutation$data = {
  readonly insert_Photo: {
    readonly returning: ReadonlyArray<{
      readonly id: string;
      readonly photoUrl: string;
    }>;
  } | null;
};
export type EditProfileFormPhotosMutation = {
  response: EditProfileFormPhotosMutation$data;
  variables: EditProfileFormPhotosMutation$variables;
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
    "name": "EditProfileFormPhotosMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditProfileFormPhotosMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "911aa3f4c95fb94b80f624cd3c0be8b6",
    "id": null,
    "metadata": {},
    "name": "EditProfileFormPhotosMutation",
    "operationKind": "mutation",
    "text": "mutation EditProfileFormPhotosMutation(\n  $objects: [Photo_insert_input!]!\n) {\n  insert_Photo(objects: $objects) {\n    returning {\n      id\n      photoUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "833090d3da7fa8705d396f4317cc93ef";

export default node;
