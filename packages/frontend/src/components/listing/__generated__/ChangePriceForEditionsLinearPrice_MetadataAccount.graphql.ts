/**
 * @generated SignedSource<<04068c5b95d639a95b22815cf3b95092>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangePriceForEditionsLinearPrice_MetadataAccount$data = {
  readonly nft: {
    readonly editionPriceInfo: {
      readonly priceParams: ReadonlyArray<number>;
      readonly startingPriceInLamports: number;
    } | null;
    readonly priceV2: {
      readonly currencyInfo: {
        readonly decimals: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForPrice_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useChangePriceForEditions_MetadataAccount">;
  readonly " $fragmentType": "ChangePriceForEditionsLinearPrice_MetadataAccount";
};
export type ChangePriceForEditionsLinearPrice_MetadataAccount$key = {
  readonly " $data"?: ChangePriceForEditionsLinearPrice_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangePriceForEditionsLinearPrice_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangePriceForEditionsLinearPrice_MetadataAccount",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "EditionPriceInfo",
          "kind": "LinkedField",
          "name": "editionPriceInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "priceParams",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "startingPriceInLamports",
              "storageKey": null
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

(node as any).hash = "b5e4780a7f8362a0977550b66027b5b6";

export default node;
