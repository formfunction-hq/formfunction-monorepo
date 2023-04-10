/**
 * @generated SignedSource<<20c10d46d4f6891a83e5fcfdad155f2a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BuyNowModal_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
    }> | null;
  };
  readonly mint: string;
  readonly nft: {
    readonly auctionWinnerId: string | null;
    readonly creatorId: string;
    readonly ownerId: string;
    readonly priceV2: {
      readonly amount: number;
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModalForMetadataAccount_MetadataAccount" | "useSettleSale_MetadataAccount" | "useUnlockablePurchaseMessage_MetadataAccount">;
  readonly " $fragmentType": "BuyNowModal_MetadataAccount";
};
export type BuyNowModal_MetadataAccount$key = {
  readonly " $data"?: BuyNowModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyNowModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyNowModal_MetadataAccount",
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
        }
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
          "name": "ownerId",
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
      "name": "BuyNowGenericModalForMetadataAccount_MetadataAccount"
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

(node as any).hash = "dab688dfbd265d46f975b2ccade8a8ec";

export default node;
