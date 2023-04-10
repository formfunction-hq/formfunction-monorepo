/**
 * @generated SignedSource<<c5d4fd35037f584066f81d8de51259a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useSettleSale_MetadataAccount$data = {
  readonly id: string;
  readonly nft: {
    readonly creatorId: string;
    readonly ownerId: string;
    readonly pnftIdForAuction: string | null;
  };
  readonly primarySaleHappened: boolean;
  readonly unlockable: {
    readonly activationPriceInLamports: number | null;
    readonly id: string;
  } | null;
  readonly " $fragmentType": "useSettleSale_MetadataAccount";
};
export type useSettleSale_MetadataAccount$key = {
  readonly " $data"?: useSettleSale_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useSettleSale_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useSettleSale_MetadataAccount",
  "selections": [
    (v0/*: any*/),
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
          "name": "creatorId",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ownerId",
          "storageKey": null
        },
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
      "alias": null,
      "args": null,
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "activationPriceInLamports",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "20191ba2c6b5316e9014af05aec978f7";

export default node;
