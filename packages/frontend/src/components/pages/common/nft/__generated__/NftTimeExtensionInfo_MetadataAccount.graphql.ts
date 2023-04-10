/**
 * @generated SignedSource<<7b8c8c90748aa3b4340856d976d7eeb9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftTimeExtensionInfo_MetadataAccount$data = {
  readonly nft: {
    readonly auctionEndTime: string | null;
    readonly timeExtensionDurationInSeconds: number;
  };
  readonly " $fragmentType": "NftTimeExtensionInfo_MetadataAccount";
};
export type NftTimeExtensionInfo_MetadataAccount$key = {
  readonly " $data"?: NftTimeExtensionInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftTimeExtensionInfo_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftTimeExtensionInfo_MetadataAccount",
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
          "name": "timeExtensionDurationInSeconds",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "f798d63ee4abfe0533201ccda27e73cd";

export default node;
