/**
 * @generated SignedSource<<3953ddf37aecde01a71550f1696ad5e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftInfo_NftPageExtrasResponse$data = {
  readonly viewerHasOpenOffersPlaced: boolean;
  readonly " $fragmentType": "NftInfo_NftPageExtrasResponse";
};
export type NftInfo_NftPageExtrasResponse$key = {
  readonly " $data"?: NftInfo_NftPageExtrasResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftInfo_NftPageExtrasResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftInfo_NftPageExtrasResponse",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerHasOpenOffersPlaced",
      "storageKey": null
    }
  ],
  "type": "NftPageExtrasResponse",
  "abstractKey": null
};

(node as any).hash = "1e72a2d32cb80b10549cff33c3edf0f2";

export default node;
