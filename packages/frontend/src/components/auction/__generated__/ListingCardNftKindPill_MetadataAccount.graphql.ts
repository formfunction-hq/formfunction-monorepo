/**
 * @generated SignedSource<<457586446e99239c6b756f3b635607a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ListingCardNftKindPill_MetadataAccount$data = {
  readonly nft: {
    readonly edition: number | null;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "ListingCardNftKindPill_MetadataAccount";
};
export type ListingCardNftKindPill_MetadataAccount$key = {
  readonly " $data"?: ListingCardNftKindPill_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardNftKindPill_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListingCardNftKindPill_MetadataAccount",
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
          "name": "edition",
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

(node as any).hash = "45fef6d2dd900a7d0da93873f1b512b9";

export default node;
