/**
 * @generated SignedSource<<35b8af6f2c5635c49e997e07c605faf1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SettleModal_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
    }> | null;
    readonly name: string;
  };
  readonly mint: string;
  readonly nft: {
    readonly AuctionWinner: {
      readonly " $fragmentSpreads": FragmentRefs<"SettleSaleModalContent_UserExpress">;
    } | null;
    readonly auctionWinnerId: string | null;
    readonly creatorId: string;
    readonly ownerId: string;
    readonly priceLastListedV2: {
      readonly amount: number;
      readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
    readonly priceV2: {
      readonly amount: number;
      readonly currencyInfo: {
        readonly name: CurrencyNameExpress_enum;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price" | "useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SettleSaleModalContent_MetadataAccount" | "useSettleSale_MetadataAccount">;
  readonly " $fragmentType": "SettleModal_MetadataAccount";
};
export type SettleModal_MetadataAccount$key = {
  readonly " $data"?: SettleModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettleModal_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v2 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "useFormattedNftPrice_Price"
},
v3 = {
  "args": null,
  "kind": "FragmentSpread",
  "name": "useNftPriceSymbol_Price"
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettleModal_MetadataAccount",
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
        {
          "alias": null,
          "args": null,
          "concreteType": "MetadataCreator",
          "kind": "LinkedField",
          "name": "creators",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "address",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
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
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "CurrencyExpress",
              "kind": "LinkedField",
              "name": "currencyInfo",
              "plural": false,
              "selections": [
                (v0/*: any*/)
              ],
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useAuctionHouseSdkForPrice_Price"
            },
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceLastListedV2",
          "plural": false,
          "selections": [
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/)
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "AuctionWinner",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "SettleSaleModalContent_UserExpress"
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
      "name": "useSettleSale_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SettleSaleModalContent_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "e16a8d8c73951232986681ee1728851c";

export default node;
