/**
 * @generated SignedSource<<15fa930509e0b3659ed809b5095b0015>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount$data = {
  readonly nft: {
    readonly priceV2: {
      readonly amount: number;
      readonly currencyInfo: {
        readonly decimals: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForPrice_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useChangePriceForEditions_MetadataAccount">;
  readonly " $fragmentType": "ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount";
};
export type ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount$key = {
  readonly " $data"?: ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
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
                  "name": "decimals",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useGetCurrencyConfigForPrice_Price"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useChangePriceForEditions_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "02af5270b91f93161d4b2255ff0cf35c";

export default node;
