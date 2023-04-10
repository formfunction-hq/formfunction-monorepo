/**
 * @generated SignedSource<<c4be5650e406d414ee77d4b28bef79ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type Offer_set_input = {
  expirationDate?: string | null;
  id?: string | null;
  mint?: string | null;
  nftTransactionId?: string | null;
  refundTxid?: string | null;
  saleTransactionId?: string | null;
  timeCreated?: string | null;
  userId?: string | null;
};
export type CancelOfferModalUpdateOfferMutation$variables = {
  offerTxid: string;
  set: Offer_set_input;
};
export type CancelOfferModalUpdateOfferMutation$data = {
  readonly update_Offer_by_pk: {
    readonly nftTransactionId: string;
  } | null;
};
export type CancelOfferModalUpdateOfferMutation = {
  response: CancelOfferModalUpdateOfferMutation$data;
  variables: CancelOfferModalUpdateOfferMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "offerTxid"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "set"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "_set",
        "variableName": "set"
      },
      {
        "fields": [
          {
            "kind": "Variable",
            "name": "nftTransactionId",
            "variableName": "offerTxid"
          }
        ],
        "kind": "ObjectValue",
        "name": "pk_columns"
      }
    ],
    "concreteType": "Offer",
    "kind": "LinkedField",
    "name": "update_Offer_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nftTransactionId",
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
    "name": "CancelOfferModalUpdateOfferMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CancelOfferModalUpdateOfferMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "4882f77fd25a0125c83abdc3ea0cd28c",
    "id": null,
    "metadata": {},
    "name": "CancelOfferModalUpdateOfferMutation",
    "operationKind": "mutation",
    "text": "mutation CancelOfferModalUpdateOfferMutation(\n  $offerTxid: uuid!\n  $set: Offer_set_input!\n) {\n  update_Offer_by_pk(pk_columns: {nftTransactionId: $offerTxid}, _set: $set) {\n    nftTransactionId\n  }\n}\n"
  }
};
})();

(node as any).hash = "43b20eed7b9f356f1442e318c388728f";

export default node;
