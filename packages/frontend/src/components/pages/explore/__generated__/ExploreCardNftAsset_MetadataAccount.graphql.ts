/**
 * @generated SignedSource<<3e4a7ee9777e0c17ae3a9fb4c4439411>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCardNftAsset_MetadataAccount$data = {
  readonly assetHeight: number | null;
  readonly assetWidth: number | null;
  readonly contentType: string;
  readonly mint: string;
  readonly nft: {
    readonly Owner: {
      readonly username: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"useDoesNftHaveDisclosure_NftExpress">;
  };
  readonly offchainData: {
    readonly creatorCardImage: string;
  };
  readonly videoPlaybackId: string | null;
  readonly videoPreviewPlaybackId: string | null;
  readonly " $fragmentType": "ExploreCardNftAsset_MetadataAccount";
};
export type ExploreCardNftAsset_MetadataAccount$key = {
  readonly " $data"?: ExploreCardNftAsset_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCardNftAsset_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExploreCardNftAsset_MetadataAccount",
  "selections": [
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
      "name": "mint",
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
          "alias": "creatorCardImage",
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
      "kind": "ScalarField",
      "name": "videoPlaybackId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "videoPreviewPlaybackId",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "useDoesNftHaveDisclosure_NftExpress"
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
              "name": "username",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "6d695e3368a14d5f8fde8433118b6e22";

export default node;
