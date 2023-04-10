/**
 * @generated SignedSource<<e9ee9e534e037e7a45d2f27bdfa265ad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenerativeSeriesFilters_AttributesForSeriesResponse$data = {
  readonly traits: ReadonlyArray<{
    readonly count: number;
    readonly traitName: string;
    readonly traitValue: string;
  }>;
  readonly " $fragmentType": "GenerativeSeriesFilters_AttributesForSeriesResponse";
};
export type GenerativeSeriesFilters_AttributesForSeriesResponse$key = {
  readonly " $data"?: GenerativeSeriesFilters_AttributesForSeriesResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenerativeSeriesFilters_AttributesForSeriesResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenerativeSeriesFilters_AttributesForSeriesResponse",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AttributesForSeriesTrait",
      "kind": "LinkedField",
      "name": "traits",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "count",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "traitName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "traitValue",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "AttributesForSeriesResponse",
  "abstractKey": null
};

(node as any).hash = "cdc78e3a1f244e2e9e686605755ea5cb";

export default node;
