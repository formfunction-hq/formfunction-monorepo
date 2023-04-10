/**
 * @generated SignedSource<<65bbcf8a07c5b37d63925f39fcef5f54>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ShareInfoAndSwapForTooniesInput = {
  email: string;
  name: string;
  shippingAddress: string;
  swapTxid: string;
  swappedNftMint: string;
};
export type TooniesSwapModalMutation$variables = {
  input: ShareInfoAndSwapForTooniesInput;
};
export type TooniesSwapModalMutation$data = {
  readonly shareInfoAndSwapForToonies: {
    readonly proofOfOwnershipTokenMetadataAccount: {
      readonly assetHeight: number | null;
      readonly assetWidth: number | null;
      readonly mint: string;
    };
  };
};
export type TooniesSwapModalMutation = {
  response: TooniesSwapModalMutation$data;
  variables: TooniesSwapModalMutation$variables;
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
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetHeight",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "TooniesSwapModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ShareInfoAndSwapForTooniesResponse",
        "kind": "LinkedField",
        "name": "shareInfoAndSwapForToonies",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "proofOfOwnershipTokenMetadataAccount",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "TooniesSwapModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ShareInfoAndSwapForTooniesResponse",
        "kind": "LinkedField",
        "name": "shareInfoAndSwapForToonies",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "proofOfOwnershipTokenMetadataAccount",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "4889d9c594f836730adb83a3d6ccbe09",
    "id": null,
    "metadata": {},
    "name": "TooniesSwapModalMutation",
    "operationKind": "mutation",
    "text": "mutation TooniesSwapModalMutation(\n  $input: ShareInfoAndSwapForTooniesInput!\n) {\n  shareInfoAndSwapForToonies(input: $input) {\n    proofOfOwnershipTokenMetadataAccount {\n      mint\n      assetHeight\n      assetWidth\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "2d7885f9b45adb14894a44524b679e66";

export default node;
