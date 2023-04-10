/**
 * @generated SignedSource<<8a043ad29c396c8870bcf385e3a05b5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftActionButton_MetadataAccount$data = {
  readonly id: string;
  readonly nft: {
    readonly editionAllowlistEnabled: boolean;
    readonly editionAllowlistSaleStartTime: string | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly id: string;
    readonly isOffPlatform: boolean;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
  };
  readonly numberOfBidsForCurrentAuction: number | null;
  readonly " $fragmentSpreads": FragmentRefs<"BidModal_MetadataAccount" | "BuyEditionModal_MetadataAccount" | "BuyNowModal_MetadataAccount" | "CancelOfferModal_MetadataAccount" | "HowAuctionsWorkButton_MetadataAccount" | "ListNftButton_MetadataAccount" | "MakeAnOfferModal_MetadataAccount" | "NftTimeExtensionInfo_MetadataAccount" | "SettleModal_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "NftActionButton_MetadataAccount";
};
export type NftActionButton_MetadataAccount$key = {
  readonly " $data"?: NftActionButton_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftActionButton_MetadataAccount">;
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
  "name": "NftActionButton_MetadataAccount",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "kind": "ScalarField",
          "name": "isOffPlatform",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ownerId",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "numberOfBidsForCurrentAuction",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MakeAnOfferModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "HowAuctionsWorkButton_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BidModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuyEditionModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "BuyNowModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftButton_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftTimeExtensionInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettleModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CancelOfferModal_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "9ad2bd6147f4a7adbbb5062d7a84a1a7";

export default node;
