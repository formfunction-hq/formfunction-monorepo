/**
 * @generated SignedSource<<fddb75b45ac893a6f91a86bca82f0531>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOffer_NftTransactionExpress$data = {
  readonly From: {
    readonly id: string;
  } | null;
  readonly To: {
    readonly id: string;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"AcceptOfferModal_NftTransactionExpress" | "CancelOfferModal_NftTransactionExpress" | "NftOfferGeneric_NftTransactionExpress">;
  readonly " $fragmentType": "NftOffer_NftTransactionExpress";
};
export type NftOffer_NftTransactionExpress$key = {
  readonly " $data"?: NftOffer_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOffer_NftTransactionExpress">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOffer_NftTransactionExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "To",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "From",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AcceptOfferModal_NftTransactionExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CancelOfferModal_NftTransactionExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOfferGeneric_NftTransactionExpress"
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};
})();

(node as any).hash = "96320016d2930b869bccb5cdceb26bef";

export default node;
