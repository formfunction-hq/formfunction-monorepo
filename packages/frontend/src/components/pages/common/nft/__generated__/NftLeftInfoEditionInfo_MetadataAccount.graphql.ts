/**
 * @generated SignedSource<<05cdb8c579b5906f3191182d65d3268a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftLeftInfoEditionInfo_MetadataAccount$data = {
  readonly nft: {
    readonly antiBotProtectionEnabled: boolean | null;
    readonly editionAllowlistEnabled: boolean;
    readonly editionBuyLimitPerAddress: number | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"NftLeftInfoEditionPriceLine_MetadataAccount" | "useEditionSupply_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "NftLeftInfoEditionInfo_MetadataAccount";
};
export type NftLeftInfoEditionInfo_MetadataAccount$key = {
  readonly " $data"?: NftLeftInfoEditionInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftLeftInfoEditionInfo_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftLeftInfoEditionInfo_MetadataAccount",
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
          "name": "antiBotProtectionEnabled",
          "storageKey": null
        },
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
          "name": "editionPublicSaleStartTime",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftLeftInfoEditionPriceLine_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useEditionSupply_MetadataAccount"
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

(node as any).hash = "1ef9124fca791969fb95c16939d6a351";

export default node;
