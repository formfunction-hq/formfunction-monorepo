/**
 * @generated SignedSource<<d64e344e54d7f894b350e10045d77227>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount$data = {
  readonly nft: {
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount">;
  readonly " $fragmentType": "MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount";
};
export type MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount$key = {
  readonly " $data"?: MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useEditionSupply_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "0eaaffe18edb24b868e5bc90a2df5a79";

export default node;
