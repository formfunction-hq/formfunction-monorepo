/**
 * @generated SignedSource<<8aba1967a2ddf9dcfcfb3b69ec6301cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AddAllowlistAddressesInput = {
  addresses: ReadonlyArray<string>;
  masterEditionMint: string;
};
export type AddToAllowlistModalMutation$variables = {
  input: AddAllowlistAddressesInput;
};
export type AddToAllowlistModalMutation$data = {
  readonly EditionsMutations: {
    readonly addAllowlistAddresses: {
      readonly addedAddresses: ReadonlyArray<string>;
    };
  };
};
export type AddToAllowlistModalMutation = {
  response: AddToAllowlistModalMutation$data;
  variables: AddToAllowlistModalMutation$variables;
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
    "concreteType": "EditionsMutationsResponse",
    "kind": "LinkedField",
    "name": "EditionsMutations",
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
        "concreteType": "AddAllowlistAddressesResponse",
        "kind": "LinkedField",
        "name": "addAllowlistAddresses",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "addedAddresses",
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
    "name": "AddToAllowlistModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AddToAllowlistModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "b6c1bd9fa8eb4092605e0e9978a69b30",
    "id": null,
    "metadata": {},
    "name": "AddToAllowlistModalMutation",
    "operationKind": "mutation",
    "text": "mutation AddToAllowlistModalMutation(\n  $input: AddAllowlistAddressesInput!\n) {\n  EditionsMutations {\n    addAllowlistAddresses(input: $input) {\n      addedAddresses\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "14d9e780297d17a59bcc7411fc25214c";

export default node;
