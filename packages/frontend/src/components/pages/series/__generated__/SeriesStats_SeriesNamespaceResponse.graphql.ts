/**
 * @generated SignedSource<<132945685902058b799f338adfab0896>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesStats_SeriesNamespaceResponse$data = {
  readonly seriesStats: {
    readonly floorPriceInLamports: number | null;
    readonly volumeInLamports: number;
  } | null;
  readonly " $fragmentType": "SeriesStats_SeriesNamespaceResponse";
};
export type SeriesStats_SeriesNamespaceResponse$key = {
  readonly " $data"?: SeriesStats_SeriesNamespaceResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesStats_SeriesNamespaceResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesStats_SeriesNamespaceResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "SeriesStatsResponse",
      "kind": "LinkedField",
      "name": "seriesStats",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "floorPriceInLamports",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "volumeInLamports",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SeriesNamespaceResponse",
  "abstractKey": null
};

(node as any).hash = "7327af2a2afe849163cda8a6610a9f5e";

export default node;
