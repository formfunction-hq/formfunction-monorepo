/**
 * @generated SignedSource<<ae2f9eeb326bc0ad11d5dcfbd789156f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type HowAuctionsWorkModal_MetadataAccount$data = {
  readonly nft: {
    readonly auctionDurationInSeconds: number;
    readonly priceV2: {
      readonly currencyInfo: {
        readonly decimals: number;
        readonly shortSymbol: string | null;
        readonly symbol: string;
      };
    } | null;
    readonly tickSizeInfo: {
      readonly tickSizeConstantInLamports: number | null;
    };
    readonly timeExtensionDurationInSeconds: number;
  };
  readonly " $fragmentType": "HowAuctionsWorkModal_MetadataAccount";
};
export type HowAuctionsWorkModal_MetadataAccount$key = {
  readonly " $data"?: HowAuctionsWorkModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"HowAuctionsWorkModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "HowAuctionsWorkModal_MetadataAccount",
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
          "name": "auctionDurationInSeconds",
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
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "shortSymbol",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "symbol",
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

(node as any).hash = "08373e2139603fc9412858642d675815";

export default node;
