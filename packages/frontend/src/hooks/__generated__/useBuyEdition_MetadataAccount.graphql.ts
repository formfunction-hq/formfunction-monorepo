/**
 * @generated SignedSource<<4a2b2a7dd3942e8ab95f16e854c2ebb0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useBuyEdition_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
    }> | null;
  };
  readonly mint: string;
  readonly nft: {
    readonly antiBotProtectionEnabled: boolean | null;
    readonly creatorId: string;
    readonly editionBuyLimitPerAddress: number | null;
    readonly ownerId: string;
    readonly priceV2: {
      readonly amount: number;
      readonly currencyInfo: {
        readonly name: CurrencyNameExpress_enum;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
    } | null;
  };
  readonly " $fragmentType": "useBuyEdition_MetadataAccount";
};
export type useBuyEdition_MetadataAccount$key = {
  readonly " $data"?: useBuyEdition_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useBuyEdition_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useBuyEdition_MetadataAccount",
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
          "name": "antiBotProtectionEnabled",
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
          "name": "editionBuyLimitPerAddress",
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
                  "name": "name",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
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

(node as any).hash = "414f575ae4da3f7c24637f49b60903a2";

export default node;
