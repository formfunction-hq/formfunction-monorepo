/**
 * @generated SignedSource<<67d4db5c5213b247a0479ecf6d7c5e06>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type AcceptOfferModal_NftTransactionExpress$data = {
  readonly From: {
    readonly id: string;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"SettleSaleModalContent_UserExpress">;
  } | null;
  readonly id: string;
  readonly price: {
    readonly amount: number;
    readonly currencyInfo: {
      readonly name: CurrencyNameExpress_enum;
    };
    readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price" | "useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
  } | null;
  readonly " $fragmentType": "AcceptOfferModal_NftTransactionExpress";
};
export type AcceptOfferModal_NftTransactionExpress$key = {
  readonly " $data"?: AcceptOfferModal_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"AcceptOfferModal_NftTransactionExpress">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AcceptOfferModal_NftTransactionExpress",
  "selections": [
    (v0/*: any*/),
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
          "alias": null,
          "args": null,
          "concreteType": "CurrencyExpress",
          "kind": "LinkedField",
          "name": "currencyInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "name",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useAuctionHouseSdkForPrice_Price"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useFormattedNftPrice_Price"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useNftPriceSymbol_Price"
        }
      ],
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SettleSaleModalContent_UserExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};
})();

(node as any).hash = "243127a76561162c6c454493242f3542";

export default node;
