/**
 * @generated SignedSource<<e6e1dd44ba8f70b027f7b02c01faba1d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PnftInfo_PnftInfoResponse$data = {
  readonly data: {
    readonly name: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_MetadataAccount" | "NftAssetForMetadataAccount_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "PnftInfo_PnftInfoResponse";
};
export type PnftInfo_PnftInfoResponse$key = {
  readonly " $data"?: PnftInfo_PnftInfoResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"PnftInfo_PnftInfoResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PnftInfo_PnftInfoResponse",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
      "name": "ClaimPnftModal_MetadataAccount"
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

(node as any).hash = "c06b0ef3f24ef05631fa057b7e1a7c25";

export default node;
