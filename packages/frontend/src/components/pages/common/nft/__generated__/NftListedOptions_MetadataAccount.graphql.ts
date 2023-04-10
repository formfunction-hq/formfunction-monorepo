/**
 * @generated SignedSource<<6cc8a851dd8f2c355043d9e2f6cad962>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftListedOptions_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly CampaignFundingTier: {
      readonly __typename: string;
    } | null;
    readonly creatorId: string;
    readonly editionAllowlistEnabled: boolean;
    readonly isOffPlatform: boolean;
    readonly maxSupply: number | null;
    readonly numberOfStandardEditionsMinted: number | null;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
  };
  readonly " $fragmentType": "NftListedOptions_MetadataAccount";
};
export type NftListedOptions_MetadataAccount$key = {
  readonly " $data"?: NftListedOptions_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftListedOptions_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftListedOptions_MetadataAccount",
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
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "CampaignFundingTier",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
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
          "name": "ownerId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isOffPlatform",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupply",
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
          "name": "numberOfStandardEditionsMinted",
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

(node as any).hash = "87c08f2e77b233612b335061b2ccc0e7";

export default node;
