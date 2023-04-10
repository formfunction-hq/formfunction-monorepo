/**
 * @generated SignedSource<<58aa8171db6f1393581ebf7a8a9a9686>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type DeleteNftInput = {
  mint: string;
};
export type DeleteModalMutation$variables = {
  input: DeleteNftInput;
};
export type DeleteModalMutation$data = {
  readonly deleteNft: {
    readonly id: string;
  };
};
export type DeleteModalMutation = {
  response: DeleteModalMutation$data;
  variables: DeleteModalMutation$variables;
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
    "args": [
      {
        "kind": "Variable",
        "name": "input",
        "variableName": "input"
      }
    ],
    "concreteType": "MetadataAccount",
    "kind": "LinkedField",
    "name": "deleteNft",
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
    "name": "DeleteModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "DeleteModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b3cc8cf26fd89601782eaadaa32f3b66",
    "id": null,
    "metadata": {},
    "name": "DeleteModalMutation",
    "operationKind": "mutation",
    "text": "mutation DeleteModalMutation(\n  $input: DeleteNftInput!\n) {\n  deleteNft(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "67536b81f587eb14284a8bd1024d78c4";

export default node;
