/**
 * @generated SignedSource<<94c44604d89946aa011872dabb951f46>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftInfo_PnftInfoResponse$data = {
  readonly metadataAccount: {
    readonly " $fragmentSpreads": FragmentRefs<"PnftInfo_PnftInfoResponse">;
  } | null;
  readonly " $fragmentType": "NftInfo_PnftInfoResponse";
};
export type NftInfo_PnftInfoResponse$key = {
  readonly " $data"?: NftInfo_PnftInfoResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftInfo_PnftInfoResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftInfo_PnftInfoResponse",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccount",
      "kind": "LinkedField",
      "name": "metadataAccount",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PnftInfo_PnftInfoResponse"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PnftInfoResponse",
  "abstractKey": null
};

(node as any).hash = "5d541a6d7837ca5ffde93b6285c6540f";

export default node;
