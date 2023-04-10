/**
 * @generated SignedSource<<b812e8b1555ea96c76c8904f70304ae1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftEditionsTableRow_MetadataAccount$data = {
  readonly nft: {
    readonly Owner: {
      readonly ProfilePhoto: {
        readonly photoUrl: string;
      } | null;
      readonly id: string;
      readonly username: string;
    } | null;
    readonly edition: number | null;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount" | "useEditionSupply_MetadataAccount" | "useNftKind_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "NftEditionsTableRow_MetadataAccount";
};
export type NftEditionsTableRow_MetadataAccount$key = {
  readonly " $data"?: NftEditionsTableRow_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftEditionsTableRow_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftEditionsTableRow_MetadataAccount",
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Owner",
          "plural": false,
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
              "name": "username",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "PhotoExpress",
              "kind": "LinkedField",
              "name": "ProfilePhoto",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "photoUrl",
                  "storageKey": null
                }
              ],
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
      "name": "useNftLinkForMetadataAccount_MetadataAccount"
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftAssetForMetadataAccount_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "ec01ad1261158025e10773fd315abd27";

export default node;
