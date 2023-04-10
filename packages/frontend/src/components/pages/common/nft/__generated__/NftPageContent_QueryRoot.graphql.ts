/**
 * @generated SignedSource<<4745b7c12e548513c692e20697326362>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftPageContent_QueryRoot$data = {
  readonly nftPageExtras: {
    readonly " $fragmentSpreads": FragmentRefs<"NftInfo_NftPageExtrasResponse">;
  };
  readonly pnftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftInfo_PnftInfoResponse">;
  };
  readonly " $fragmentType": "NftPageContent_QueryRoot";
};
export type NftPageContent_QueryRoot$key = {
  readonly " $data"?: NftPageContent_QueryRoot$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageContent_QueryRoot">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "mint"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftPageContent_QueryRoot",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "mint",
              "variableName": "mint"
            }
          ],
          "kind": "ObjectValue",
          "name": "input"
        }
      ],
      "concreteType": "NftPageExtrasResponse",
      "kind": "LinkedField",
      "name": "nftPageExtras",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftInfo_NftPageExtrasResponse"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "fields": [
            {
              "kind": "Variable",
              "name": "auctionNftMint",
              "variableName": "mint"
            }
          ],
          "kind": "ObjectValue",
          "name": "input"
        }
      ],
      "concreteType": "PnftInfoResponse",
      "kind": "LinkedField",
      "name": "pnftInfo",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftInfo_PnftInfoResponse"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "query_root",
  "abstractKey": null
};

(node as any).hash = "ea3ec58c2f3d9807805d3fd69ee44142";

export default node;
