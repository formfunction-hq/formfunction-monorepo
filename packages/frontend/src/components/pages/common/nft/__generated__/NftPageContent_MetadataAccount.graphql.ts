/**
 * @generated SignedSource<<f21f2c7ecc6a82de0ff977beae51b615>>
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
export type NftPageContent_MetadataAccount$data = {
  readonly assetHeight: number | null;
  readonly assetWidth: number | null;
  readonly contentType: string;
  readonly id: string;
  readonly nft: {
    readonly Creator: {
      readonly id: string;
      readonly username: string;
    } | null;
    readonly Series: {
      readonly id: string;
      readonly type: SeriesTypeExpress_enum;
      readonly " $fragmentSpreads": FragmentRefs<"NftPageNextInThisSeriesSection_SeriesExpress">;
    } | null;
    readonly creatorId: string;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
    readonly " $fragmentSpreads": FragmentRefs<"useDoesNftHaveDisclosure_NftExpress">;
  };
  readonly nonstandardAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  } | null;
  readonly offchainData: {
    readonly image: string;
  };
  readonly videoPlaybackId: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"NftCollaboratorCard_MetadataAccount" | "NftInfo_MetadataAccount" | "NftLeftInfo_MetadataAccount" | "NftPageContext_MetadataAccount" | "NftPageUnlockableSection_MetadataAccount" | "OtherNftBottomDrawer_MetadataAccount" | "OwnedNftBottomDrawer_MetadataAccount">;
  readonly " $fragmentType": "NftPageContent_MetadataAccount";
};
export type NftPageContent_MetadataAccount$key = {
  readonly " $data"?: NftPageContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageContent_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftPageContent_MetadataAccount",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetHeight",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "assetWidth",
      "storageKey": null
    },
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
      "name": "videoPlaybackId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataOffchain",
      "kind": "LinkedField",
      "name": "offchainData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "image",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "nonstandardAsset",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForAssetExpress_AssetExpress"
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "NftPageNextInThisSeriesSection_SeriesExpress"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "username",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useDoesNftHaveDisclosure_NftExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftCollaboratorCard_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftLeftInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftPageContext_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OtherNftBottomDrawer_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OwnedNftBottomDrawer_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftPageUnlockableSection_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "823902953783773a7f32fa26919503b3";

export default node;
