/**
 * @generated SignedSource<<7ddf331972a3b27ecdf3545c5aac76fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftAssetForMetadataAccount_MetadataAccount$data = {
  readonly contentType: string;
  readonly offchainData: {
    readonly image: string;
  };
  readonly videoPlaybackId: string | null;
  readonly videoPreviewPlaybackId: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "NftAssetForMetadataAccount_MetadataAccount";
};
export type NftAssetForMetadataAccount_MetadataAccount$key = {
  readonly " $data"?: NftAssetForMetadataAccount_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftAssetForMetadataAccount_MetadataAccount",
  "selections": [
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
      "kind": "ScalarField",
      "name": "videoPreviewPlaybackId",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftLinkForMetadataAccount_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "ec74e5361afe7a993ce6023c618055f0";

export default node;
