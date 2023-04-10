/**
 * @generated SignedSource<<d3c2afd5df622de548e61b2857cb8805>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type useDeleteSeriesMutation$variables = {
  id: string;
};
export type useDeleteSeriesMutation$data = {
  readonly delete_Series_by_pk: {
    readonly id: string;
  } | null;
};
export type useDeleteSeriesMutation = {
  response: useDeleteSeriesMutation$data;
  variables: useDeleteSeriesMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "Series",
    "kind": "LinkedField",
    "name": "delete_Series_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
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
    "name": "useDeleteSeriesMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useDeleteSeriesMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "ead4e52c32e8413f85efd5ffd5d8ca75",
    "id": null,
    "metadata": {},
    "name": "useDeleteSeriesMutation",
    "operationKind": "mutation",
    "text": "mutation useDeleteSeriesMutation(\n  $id: String!\n) {\n  delete_Series_by_pk(id: $id) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "41efb13a94f1bbabb9ee1b77e0f82660";

export default node;
