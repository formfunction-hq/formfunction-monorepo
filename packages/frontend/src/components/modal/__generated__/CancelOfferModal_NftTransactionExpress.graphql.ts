/**
 * @generated SignedSource<<6630f84c55d1fc3a395e5fc7db5f12fa>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancelOfferModal_NftTransactionExpress$data = {
  readonly id: string;
  readonly price: {
    readonly amount: number;
    readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
  } | null;
  readonly txid: string | null;
  readonly " $fragmentType": "CancelOfferModal_NftTransactionExpress";
};
export type CancelOfferModal_NftTransactionExpress$key = {
  readonly " $data"?: CancelOfferModal_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelOfferModal_NftTransactionExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelOfferModal_NftTransactionExpress",
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
      "name": "txid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "price",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "amount",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useAuctionHouseSdkForPrice_Price"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};

(node as any).hash = "e3774494f1031b9014823229576c6c53";

export default node;
