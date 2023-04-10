/**
 * @generated SignedSource<<261b18dfb3b210ed786aa43b4801e9cc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type SeriesTypeExpress_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftsForAddress_MetadataAccount$data = ReadonlyArray<{
  readonly id: string;
  readonly nft: {
    readonly Series: {
      readonly id: string;
      readonly mint: string;
      readonly name: string;
      readonly nftOrder: ReadonlyArray<string> | null;
      readonly slug: string;
      readonly type: SeriesTypeExpress_enum;
    } | null;
    readonly auctionEndTime: string | null;
    readonly creatorId: string;
    readonly isAirdrop: boolean;
    readonly isMasterEdition: boolean;
    readonly isPnft: boolean;
    readonly mint: string;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "NftsForAddress_MetadataAccount";
}>;
export type NftsForAddress_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: NftsForAddress_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_MetadataAccount">;
}>;

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "NftsForAddress_MetadataAccount",
  "selections": [
    (v0/*: any*/),
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
          "name": "isMasterEdition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isAirdrop",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPnft",
          "storageKey": null
        },
        (v1/*: any*/),
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
          "concreteType": "SeriesExpress",
          "kind": "LinkedField",
          "name": "Series",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
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
              "kind": "ScalarField",
              "name": "nftOrder",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
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
      "name": "ListingCardForMetadata_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "81f756b25a1fb14b84a63997d4e4a5c2";

export default node;
