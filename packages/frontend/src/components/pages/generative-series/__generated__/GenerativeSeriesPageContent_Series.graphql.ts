/**
 * @generated SignedSource<<309511bebcba1ba444dca00abdc3299b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenerativeSeriesPageContent_Series$data = {
  readonly description: string;
  readonly id: string;
  readonly logoAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAsset_Asset">;
  } | null;
  readonly name: string;
  readonly " $fragmentType": "GenerativeSeriesPageContent_Series";
};
export type GenerativeSeriesPageContent_Series$key = {
  readonly " $data"?: GenerativeSeriesPageContent_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenerativeSeriesPageContent_Series">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenerativeSeriesPageContent_Series",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
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
      "concreteType": "Asset",
      "kind": "LinkedField",
      "name": "logoAsset",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForAsset_Asset"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "3913e70c9eb48ed5436ebea74c80e4ad";

export default node;
