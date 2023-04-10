/**
 * @generated SignedSource<<2020efe12fed49a86cedfb07ad7f44af>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftOtherInfo_MetadataAccount$data = {
  readonly nft: {
    readonly auctionEndTime: string | null;
    readonly isOffPlatform: boolean;
    readonly maxSupply: number | null;
    readonly numberOfStandardEditionsMinted: number | null;
    readonly priceLastSoldV2: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
    } | null;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
    } | null;
    readonly scheduledAuctionTime: string | null;
    readonly status: NftStatusExpress_enum;
  };
  readonly numberOfBidsForCurrentAuction: number | null;
  readonly " $fragmentType": "NftOtherInfo_MetadataAccount";
};
export type NftOtherInfo_MetadataAccount$key = {
  readonly " $data"?: NftOtherInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOtherInfo_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "PriceWithSymbol_Price"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOtherInfo_MetadataAccount",
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
          "name": "auctionEndTime",
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
          "name": "maxSupply",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "numberOfStandardEditionsMinted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceLastSoldV2",
          "plural": false,
          "selections": (v0/*: any*/),
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "1be867c58a6df5fa19d5c535c24f8e46";

export default node;
