/**
 * @generated SignedSource<<ac4b8ee68cd778daeb1fbb8c69b0bdc4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AuctionSettingsModal_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly auctionDurationInSeconds: number;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price" | "useGetCurrencyConfigForPrice_Price">;
    } | null;
    readonly scheduledAuctionTime: string | null;
    readonly tickSizeInfo: {
      readonly tickSizeConstantInLamports: number | null;
    };
    readonly timeExtensionDurationInSeconds: number;
  };
  readonly " $fragmentType": "AuctionSettingsModal_MetadataAccount";
};
export type AuctionSettingsModal_MetadataAccount$key = {
  readonly " $data"?: AuctionSettingsModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"AuctionSettingsModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AuctionSettingsModal_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
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
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useGetCurrencyConfigForPrice_Price"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useAuctionHouseSdkForPrice_Price"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionDurationInSeconds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "scheduledAuctionTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timeExtensionDurationInSeconds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "TickSizeInfo",
          "kind": "LinkedField",
          "name": "tickSizeInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "tickSizeConstantInLamports",
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

(node as any).hash = "046afba1183727f4894a6b8a70222891";

export default node;
