/**
 * @generated SignedSource<<65aa6b316cc622133582d40602952d91>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditionBuyerInfoInput = {
  mint: string;
  viewerId?: string | null;
};
export type useNftPageEditionBuyerInfoQuery$variables = {
  input: EditionBuyerInfoInput;
};
export type useNftPageEditionBuyerInfoQuery$data = {
  readonly editionBuyerInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"BuyEditionModal_EditionBuyerInfoResponse" | "NftActionButton_EditionBuyerInfoResponse" | "NftAllowlistInfo_EditionBuyerInfoResponse">;
  };
};
export type useNftPageEditionBuyerInfoQuery = {
  response: useNftPageEditionBuyerInfoQuery$data;
  variables: useNftPageEditionBuyerInfoQuery$variables;
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNftPageEditionBuyerInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EditionBuyerInfoResponse",
        "kind": "LinkedField",
        "name": "editionBuyerInfo",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "BuyEditionModal_EditionBuyerInfoResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NftActionButton_EditionBuyerInfoResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "NftAllowlistInfo_EditionBuyerInfoResponse"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useNftPageEditionBuyerInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "EditionBuyerInfoResponse",
        "kind": "LinkedField",
        "name": "editionBuyerInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "EditionsMerkleAllowlistInfoExpress",
            "kind": "LinkedField",
            "name": "merkleAllowlistInfo",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amountMinted",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "amountAllowed",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "proof",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "rootIndex",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "numberBought",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "aee82ba55850b0b8e6e63eae3111db83",
    "id": null,
    "metadata": {},
    "name": "useNftPageEditionBuyerInfoQuery",
    "operationKind": "query",
    "text": "query useNftPageEditionBuyerInfoQuery(\n  $input: EditionBuyerInfoInput!\n) {\n  editionBuyerInfo(input: $input) {\n    ...BuyEditionModal_EditionBuyerInfoResponse\n    ...NftActionButton_EditionBuyerInfoResponse\n    ...NftAllowlistInfo_EditionBuyerInfoResponse\n  }\n}\n\nfragment BuyEditionModal_EditionBuyerInfoResponse on EditionBuyerInfoResponse {\n  merkleAllowlistInfo {\n    amountMinted\n    ...useBuyEdition_EditionsMerkleAllowlistInfoExpress\n    id\n  }\n  numberBought\n}\n\nfragment NftActionButton_EditionBuyerInfoResponse on EditionBuyerInfoResponse {\n  merkleAllowlistInfo {\n    amountAllowed\n    amountMinted\n    id\n  }\n}\n\nfragment NftAllowlistInfo_EditionBuyerInfoResponse on EditionBuyerInfoResponse {\n  merkleAllowlistInfo {\n    amountAllowed\n    amountMinted\n    id\n  }\n}\n\nfragment useBuyEdition_EditionsMerkleAllowlistInfoExpress on EditionsMerkleAllowlistInfoExpress {\n  amountAllowed\n  proof\n  rootIndex\n}\n"
  }
};
})();

(node as any).hash = "6eccbf122e24c373009c76ab080866de";

export default node;
