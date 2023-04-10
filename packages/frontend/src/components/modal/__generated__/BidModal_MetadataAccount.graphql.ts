/**
 * @generated SignedSource<<876120163745f22ac64f8dda5562eb56>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type BidModal_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly mint: string;
  readonly nft: {
    readonly CampaignFundingTier: {
      readonly " $fragmentSpreads": FragmentRefs<"CampaignBenefitsSection_CampaignFundingTierStandard">;
    } | null;
    readonly auctionEndTime: string | null;
    readonly auctionWinnerId: string | null;
    readonly creatorId: string;
    readonly ownerId: string;
    readonly priceV2: {
      readonly amount: number;
      readonly currencyInfo: {
        readonly decimals: number;
        readonly name: CurrencyNameExpress_enum;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price" | "useGetCurrencyConfigForPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
    readonly status: NftStatusExpress_enum;
    readonly tickSizeInfo: {
      readonly tickSizeConstantInLamports: number | null;
    };
  };
  readonly numberOfBidsForCurrentAuction: number | null;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount" | "useUnlockablePurchaseMessage_MetadataAccount">;
  readonly " $fragmentType": "BidModal_MetadataAccount";
};
export type BidModal_MetadataAccount$key = {
  readonly " $data"?: BidModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"BidModal_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BidModal_MetadataAccount",
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
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
          "concreteType": null,
          "kind": "LinkedField",
          "name": "CampaignFundingTier",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignBenefitsSection_CampaignFundingTierStandard"
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
                },
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useGetCurrencyConfigForPrice_Price"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useAuctionHouseSdkForPrice_Price"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useNftPriceSymbol_Price"
            }
          ],
          "storageKey": null
        },
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
          "name": "auctionWinnerId",
          "storageKey": null
        },
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
      "name": "ListingCardForMetadata_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUnlockablePurchaseMessage_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "bcb5a9cb5c26dbafbde6e0e03ae0989d";

export default node;
