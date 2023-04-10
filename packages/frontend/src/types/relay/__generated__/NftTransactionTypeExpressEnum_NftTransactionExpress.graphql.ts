/**
 * @generated SignedSource<<21b2c18331c14546fd06f65a6c7ba55a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftTransactionTypeExpressEnum_NftTransactionExpress$data = {
  readonly type: NftTransactionTypeExpress_enum;
  readonly " $fragmentType": "NftTransactionTypeExpressEnum_NftTransactionExpress";
};
export type NftTransactionTypeExpressEnum_NftTransactionExpress$key = {
  readonly " $data"?: NftTransactionTypeExpressEnum_NftTransactionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftTransactionTypeExpressEnum_NftTransactionExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftTransactionTypeExpressEnum_NftTransactionExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "NftTransactionExpress",
  "abstractKey": null
};

(node as any).hash = "371a93de10cb91e6f8e68f9610cdcfaa";

export default node;
