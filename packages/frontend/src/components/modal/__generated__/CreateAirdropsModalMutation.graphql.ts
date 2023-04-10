/**
 * @generated SignedSource<<702384477b8bff876735626639b76162>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AirdropTypeExpress_enum = "Claim" | "Gift" | "%future added value";
export type CreateAirdropsInput = {
  masterEditionMint: string;
  toAddresses: ReadonlyArray<string>;
  type: AirdropTypeExpress_enum;
};
export type CreateAirdropsModalMutation$variables = {
  input: CreateAirdropsInput;
};
export type CreateAirdropsModalMutation$data = {
  readonly AirdropMutations: {
    readonly createAirdrops: {
      readonly airdrops: ReadonlyArray<{
        readonly id: string;
      }>;
    };
  };
};
export type CreateAirdropsModalMutation = {
  response: CreateAirdropsModalMutation$data;
  variables: CreateAirdropsModalMutation$variables;
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
    "concreteType": "AirdropMutationsMutationResponse",
    "kind": "LinkedField",
    "name": "AirdropMutations",
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
        "concreteType": "CreateAirdropsResponse",
        "kind": "LinkedField",
        "name": "createAirdrops",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "AirdropExpress",
            "kind": "LinkedField",
            "name": "airdrops",
            "plural": true,
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
    "name": "CreateAirdropsModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAirdropsModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "eb427130213b567d91fa617398585753",
    "id": null,
    "metadata": {},
    "name": "CreateAirdropsModalMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAirdropsModalMutation(\n  $input: CreateAirdropsInput!\n) {\n  AirdropMutations {\n    createAirdrops(input: $input) {\n      airdrops {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "29d862cb12afb4356c872a870ca9cea7";

export default node;
