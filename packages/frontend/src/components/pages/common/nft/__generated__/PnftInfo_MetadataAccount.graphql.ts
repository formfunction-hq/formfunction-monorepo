/**
 * @generated SignedSource<<f7770e71a2e7be86171b8947be41d7a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PnftInfo_MetadataAccount$data = {
  readonly nft: {
    readonly pnftIdForAuction: string | null;
  };
  readonly primarySaleHappened: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_AuctionNft_MetadataAccount">;
  readonly " $fragmentType": "PnftInfo_MetadataAccount";
};
export type PnftInfo_MetadataAccount$key = {
  readonly " $data"?: PnftInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"PnftInfo_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PnftInfo_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
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
          "name": "pnftIdForAuction",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ClaimPnftModal_AuctionNft_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "0dfe7eb3c3d811152cae875ad144a5a1";

export default node;
