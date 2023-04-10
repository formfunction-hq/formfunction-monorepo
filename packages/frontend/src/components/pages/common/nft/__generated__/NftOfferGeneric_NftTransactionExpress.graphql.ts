/**
 * @generated SignedSource<<c68ba67979b281ffffa2166f2b578580>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOfferGeneric_NftTransactionExpress$data = {
  readonly From: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly comment: string | null;
  readonly fromAddress: string;
  readonly price: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
  } | null;
  readonly timeCreated: string;
  readonly txid: string | null;
  readonly " $fragmentType": "NftOfferGeneric_NftTransactionExpress";
};
export type NftOfferGeneric_NftTransactionExpress$key = {
  readonly " $data"?: NftOfferGeneric_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOfferGeneric_NftTransactionExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOfferGeneric_NftTransactionExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "comment",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fromAddress",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "PriceWithSymbol_Price"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeCreated",
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
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "From",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PhotoExpress",
          "kind": "LinkedField",
          "name": "ProfilePhoto",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "photoUrl",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};

(node as any).hash = "4a5a2275bd3934cf72a499be658b37a0";

export default node;
