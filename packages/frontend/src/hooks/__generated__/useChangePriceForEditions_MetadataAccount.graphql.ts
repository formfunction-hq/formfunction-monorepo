/**
 * @generated SignedSource<<d3c2906a8cc26a520b2e26f30a1d0557>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useChangePriceForEditions_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly editionAllowlistEnabled: boolean;
    readonly editionAllowlistSaleStartTime: string | null;
    readonly editionPriceInfo: {
      readonly allowlistPriceInFullDecimals: number | null;
    } | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
    } | null;
  };
  readonly " $fragmentType": "useChangePriceForEditions_MetadataAccount";
};
export type useChangePriceForEditions_MetadataAccount$key = {
  readonly " $data"?: useChangePriceForEditions_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useChangePriceForEditions_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useChangePriceForEditions_MetadataAccount",
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
          "kind": "ScalarField",
          "name": "editionAllowlistEnabled",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "editionAllowlistSaleStartTime",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "useAuctionHouseSdkForPrice_Price"
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

(node as any).hash = "320946f20075a539693e439c5dca8dcc";

export default node;
