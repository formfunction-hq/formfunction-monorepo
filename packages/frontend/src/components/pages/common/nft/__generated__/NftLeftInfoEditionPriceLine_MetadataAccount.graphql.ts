/**
 * @generated SignedSource<<9d6e75ffa4b00041b7d2bb7faeaf413d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PriceFunctionTypeExpress_enum = "Constant" | "Linear" | "Minimum" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftLeftInfoEditionPriceLine_MetadataAccount$data = {
  readonly nft: {
    readonly editionAllowlistEnabled: boolean;
    readonly editionPriceInfo: {
      readonly allowlistPriceInFullDecimals: number | null;
      readonly priceFunctionType: PriceFunctionTypeExpress_enum;
      readonly priceParams: ReadonlyArray<number>;
      readonly startingPriceInLamports: number;
    } | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly priceV2: {
      readonly currencyInfo: {
        readonly decimals: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useNftPriceSymbol_Price">;
    } | null;
  };
  readonly " $fragmentType": "NftLeftInfoEditionPriceLine_MetadataAccount";
};
export type NftLeftInfoEditionPriceLine_MetadataAccount$key = {
  readonly " $data"?: NftLeftInfoEditionPriceLine_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftLeftInfoEditionPriceLine_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftLeftInfoEditionPriceLine_MetadataAccount",
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
          "kind": "ScalarField",
          "name": "editionAllowlistEnabled",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "editionPublicSaleStartTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useNftPriceSymbol_Price"
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
              "name": "allowlistPriceInFullDecimals",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "priceFunctionType",
              "storageKey": null
            },
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "3766542c03a624ece152fb4be3c9c4f2";

export default node;
