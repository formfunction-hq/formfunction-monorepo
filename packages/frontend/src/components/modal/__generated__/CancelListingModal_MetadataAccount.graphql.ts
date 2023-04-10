/**
 * @generated SignedSource<<f1bb7a994d45c5cc9353a78f45ba9df1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CancelListingModal_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly creatorId: string;
    readonly priceV2: {
      readonly amount: number;
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
    } | null;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentType": "CancelListingModal_MetadataAccount";
};
export type CancelListingModal_MetadataAccount$key = {
  readonly " $data"?: CancelListingModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelListingModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelListingModal_MetadataAccount",
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
          "name": "creatorId",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "bc5c229ecf11ea2d3a78880343702c62";

export default node;
