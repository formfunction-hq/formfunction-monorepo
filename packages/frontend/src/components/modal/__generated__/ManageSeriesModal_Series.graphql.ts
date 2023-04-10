/**
 * @generated SignedSource<<97b7452c0690d4d112791a650914b80c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageSeriesModal_Series$data = ReadonlyArray<{
  readonly mint: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesDndRow_Series">;
  readonly " $fragmentType": "ManageSeriesModal_Series";
}>;
export type ManageSeriesModal_Series$key = ReadonlyArray<{
  readonly " $data"?: ManageSeriesModal_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSeriesModal_Series">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ManageSeriesModal_Series",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesDndRow_Series"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "d5eadc1f7f2eca9c1b4ef0680fd0f146";

export default node;
