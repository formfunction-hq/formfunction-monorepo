/**
 * @generated SignedSource<<019032c6f71377decc617a03ed75a459>>
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
export type EditSeriesModalPhotosMutation$variables = {
  objects: ReadonlyArray<Photo_insert_input>;
};
export type EditSeriesModalPhotosMutation$data = {
  readonly insert_Photo: {
    readonly returning: ReadonlyArray<{
      readonly id: string;
      readonly photoUrl: string;
    }>;
  } | null;
};
export type EditSeriesModalPhotosMutation = {
  response: EditSeriesModalPhotosMutation$data;
  variables: EditSeriesModalPhotosMutation$variables;
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
    "name": "EditSeriesModalPhotosMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "EditSeriesModalPhotosMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "2f60ebeb2de400ef8dcf9935783fa980",
    "id": null,
    "metadata": {},
    "name": "EditSeriesModalPhotosMutation",
    "operationKind": "mutation",
    "text": "mutation EditSeriesModalPhotosMutation(\n  $objects: [Photo_insert_input!]!\n) {\n  insert_Photo(objects: $objects) {\n    returning {\n      id\n      photoUrl\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "5adb46ca67eddc110ef0003dacfbb670";

export default node;
