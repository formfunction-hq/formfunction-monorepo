/**
 * @generated SignedSource<<0a6d26630ea1c5b4d5f63fd1c16c97fc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftPageContext_MetadataAccount$data = {
  readonly nft: {
    readonly auctionEndTime: string | null;
    readonly auctionHoldingPeriodEndTime: string | null;
  };
  readonly " $fragmentType": "NftPageContext_MetadataAccount";
};
export type NftPageContext_MetadataAccount$key = {
  readonly " $data"?: NftPageContext_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageContext_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftPageContext_MetadataAccount",
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
          "name": "auctionEndTime",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "auctionHoldingPeriodEndTime",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "bac23d9c66cfd6c0cbb742dc0004d227";

export default node;
