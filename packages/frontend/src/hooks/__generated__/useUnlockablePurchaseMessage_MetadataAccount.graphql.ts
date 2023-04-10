/**
 * @generated SignedSource<<dbe8a1724955ce65284577ea54b5c4da>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUnlockablePurchaseMessage_MetadataAccount$data = {
  readonly primarySaleHappened: boolean;
  readonly unlockable: {
    readonly activationPrice: {
      readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
    } | null;
  } | null;
  readonly " $fragmentType": "useUnlockablePurchaseMessage_MetadataAccount";
};
export type useUnlockablePurchaseMessage_MetadataAccount$key = {
  readonly " $data"?: useUnlockablePurchaseMessage_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUnlockablePurchaseMessage_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUnlockablePurchaseMessage_MetadataAccount",
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
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "activationPrice",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useFormattedNftPrice_Price"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useNftPriceSymbol_Price"
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

(node as any).hash = "d812e36caa55bfba7c553d8e8c065745";

export default node;
