/**
 * @generated SignedSource<<e7344a4dd103e932c7d0ca6b8611ef1b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type UnlockableCategory = "DigitalDownload" | "Merch" | "Other" | "PhysicalOriginal" | "PhysicalPrint" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftPageUnlockableSection_MetadataAccount$data = {
  readonly id: string;
  readonly nft: {
    readonly status: NftStatusExpress_enum;
  };
  readonly primarySaleHappened: boolean;
  readonly unlockable: {
    readonly activationPrice: {
      readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
    readonly asset: {
      readonly contentType: string;
      readonly path: string;
    };
    readonly category: UnlockableCategory;
    readonly description: string | null;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"UnlockableTinyLabel_UnlockableExpress">;
  } | null;
  readonly " $fragmentType": "NftPageUnlockableSection_MetadataAccount";
};
export type NftPageUnlockableSection_MetadataAccount$key = {
  readonly " $data"?: NftPageUnlockableSection_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageUnlockableSection_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftPageUnlockableSection_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "activationPrice",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useFormattedNftPrice_Price"
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
          "name": "category",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "asset",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "contentType",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "path",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UnlockableTinyLabel_UnlockableExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "3252711ce0c6f93854ed38918a0bf951";

export default node;
