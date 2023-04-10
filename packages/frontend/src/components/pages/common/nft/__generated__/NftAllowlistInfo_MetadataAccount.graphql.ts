/**
 * @generated SignedSource<<e1547126eb2333bcaa9ae26c9bc3c3d1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftAllowlistInfo_MetadataAccount$data = {
  readonly nft: {
    readonly editionAllowlistEnabled: boolean;
    readonly editionAllowlistSaleStartTime: string | null;
    readonly editionPublicSaleStartTime: string | null;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentType": "NftAllowlistInfo_MetadataAccount";
};
export type NftAllowlistInfo_MetadataAccount$key = {
  readonly " $data"?: NftAllowlistInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftAllowlistInfo_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftAllowlistInfo_MetadataAccount",
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "4fb3f07360aadeb8e236464f3986104c";

export default node;
