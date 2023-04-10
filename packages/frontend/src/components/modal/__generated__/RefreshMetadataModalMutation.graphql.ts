/**
 * @generated SignedSource<<c8421c43a070954c8f9c06a155252719>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type RefreshMetadataInput = {
  mint: string;
};
export type RefreshMetadataModalMutation$variables = {
  input: RefreshMetadataInput;
};
export type RefreshMetadataModalMutation$data = {
  readonly refreshMetadata: {
    readonly id: string;
  };
};
export type RefreshMetadataModalMutation = {
  response: RefreshMetadataModalMutation$data;
  variables: RefreshMetadataModalMutation$variables;
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
    "name": "refreshMetadata",
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
    "name": "RefreshMetadataModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "RefreshMetadataModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "82155c27f3ffa502ab37fee5a06bd8dd",
    "id": null,
    "metadata": {},
    "name": "RefreshMetadataModalMutation",
    "operationKind": "mutation",
    "text": "mutation RefreshMetadataModalMutation(\n  $input: RefreshMetadataInput!\n) {\n  refreshMetadata(input: $input) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "941c0176d11db7f1ef8253e4744d4a41";

export default node;
