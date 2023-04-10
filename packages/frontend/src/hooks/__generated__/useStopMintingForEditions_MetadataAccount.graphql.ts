/**
 * @generated SignedSource<<2972bf18b4c7c8f15920067f7a3768a5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useStopMintingForEditions_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly creatorId: string;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"useAuctionHouseSdkForPrice_Price">;
    } | null;
  };
  readonly " $fragmentType": "useStopMintingForEditions_MetadataAccount";
};
export type useStopMintingForEditions_MetadataAccount$key = {
  readonly " $data"?: useStopMintingForEditions_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useStopMintingForEditions_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useStopMintingForEditions_MetadataAccount",
  "selections": [
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
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useAuctionHouseSdkForPrice_Price"
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

(node as any).hash = "2b2f8e489e156b8341b8e8bbbf3b96bd";

export default node;
