/**
 * @generated SignedSource<<09aac75908ab28c75d2a5651a8067dca>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PriceFunctionTypeExpress_enum = "Constant" | "Linear" | "Minimum" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BuyEditionModal_MetadataAccount$data = {
  readonly assetHeight: number | null;
  readonly assetWidth: number | null;
  readonly nft: {
    readonly editionBuyLimitPerAddress: number | null;
    readonly editionPriceInfo: {
      readonly allowlistPriceInFullDecimals: number | null;
      readonly priceFunctionType: PriceFunctionTypeExpress_enum;
    } | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly priceV2: {
      readonly amount: number;
      readonly currencyInfo: {
        readonly decimals: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"BuyEditionModalPriceInput_Price" | "useFormattedNftPrice_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModalForMetadataAccount_MetadataAccount" | "useBuyEdition_MetadataAccount">;
  readonly " $fragmentType": "BuyEditionModal_MetadataAccount";
};
export type BuyEditionModal_MetadataAccount$key = {
  readonly " $data"?: BuyEditionModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyEditionModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyEditionModal_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetHeight",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetWidth",
      "storageKey": null
    },
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
          "name": "editionPublicSaleStartTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "editionBuyLimitPerAddress",
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
            }
          ],
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
              "name": "BuyEditionModalPriceInput_Price"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useFormattedNftPrice_Price"
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
      "name": "useBuyEdition_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuyNowGenericModalForMetadataAccount_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "33f455e9e4b58c24c412a6c6e2b961bb";

export default node;
