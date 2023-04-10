/**
 * @generated SignedSource<<99558d38fdd0929bb7bdb58aa894c295>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityAuctionsYourAuctions_MetadataAccount$data = ReadonlyArray<{
  readonly id: string;
  readonly nft: {
    readonly auctionEndTime: string | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "ActivityAuctionsYourAuctions_MetadataAccount";
}>;
export type ActivityAuctionsYourAuctions_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: ActivityAuctionsYourAuctions_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityAuctionsYourAuctions_MetadataAccount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ActivityAuctionsYourAuctions_MetadataAccount",
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
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionEndTime",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListingCardForMetadata_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "67b4600c5034ee28cf855a2df9c26e8d";

export default node;
