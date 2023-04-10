/**
 * @generated SignedSource<<e9789650a02c14b7c6363a69acaec28c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useAuctionHouseSdkForPrice_Price$data = {
  readonly currencyInfo: {
    readonly name: CurrencyNameExpress_enum;
  };
  readonly " $fragmentType": "useAuctionHouseSdkForPrice_Price";
};
export type useAuctionHouseSdkForPrice_Price$key = {
  readonly " $data"?: useAuctionHouseSdkForPrice_Price$data;
  readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useAuctionHouseSdkForPrice_Price",
  "selections": [
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
    }
  ],
  "type": "Price",
  "abstractKey": null
};

(node as any).hash = "11284b6e97c2a315b354946e33ce3d2c";

export default node;
