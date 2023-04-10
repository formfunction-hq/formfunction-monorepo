/**
 * @generated SignedSource<<663519728a1659ce92122f9efe94322d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignActivityItemForNftTransaction_NftTransactionExpress$data = {
  readonly From: {
    readonly username: string;
  } | null;
  readonly To: {
    readonly username: string;
  } | null;
  readonly fromAddress: string;
  readonly nftInfo: {
    readonly assetHeight: number | null;
    readonly assetWidth: number | null;
    readonly edition: number | null;
    readonly maxSupplyOfMasterEdition: number | null;
    readonly mint: string;
    readonly name: string;
  };
  readonly timeCreated: string;
  readonly toAddress: string;
  readonly type: NftTransactionTypeExpress_enum;
  readonly " $fragmentType": "CampaignActivityItemForNftTransaction_NftTransactionExpress";
};
export type CampaignActivityItemForNftTransaction_NftTransactionExpress$key = {
  readonly " $data"?: CampaignActivityItemForNftTransaction_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignActivityItemForNftTransaction_NftTransactionExpress">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignActivityItemForNftTransaction_NftTransactionExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "fromAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "toAddress",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NftTransactionNftInfo",
      "kind": "LinkedField",
      "name": "nftInfo",
      "plural": false,
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
          "kind": "ScalarField",
          "name": "edition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupplyOfMasterEdition",
          "storageKey": null
        },
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
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeCreated",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "From",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "To",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};
})();

(node as any).hash = "2efdde069fb90dd38e5b53022425cede";

export default node;
