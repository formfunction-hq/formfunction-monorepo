/**
 * @generated SignedSource<<61de2b845b67864e8c051395115e4e40>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableTinyLabel_UnlockableExpress$data = {
  readonly activationPrice: {
    readonly " $fragmentSpreads": FragmentRefs<"useFormattedNftPrice_Price" | "useNftPriceSymbol_Price">;
  } | null;
  readonly " $fragmentType": "UnlockableTinyLabel_UnlockableExpress";
};
export type UnlockableTinyLabel_UnlockableExpress$key = {
  readonly " $data"?: UnlockableTinyLabel_UnlockableExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableTinyLabel_UnlockableExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableTinyLabel_UnlockableExpress",
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
  "type": "UnlockableExpress",
  "abstractKey": null
};

(node as any).hash = "f7f058f18f6d40285490f7c8874755e1";

export default node;
