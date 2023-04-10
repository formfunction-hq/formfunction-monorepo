/**
 * @generated SignedSource<<c92e0050bbcf8421abae94c0e432fa7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpotlightsGridForSpotlights_SpotlightExpress$data = ReadonlyArray<{
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightCard_SpotlightExpress">;
  readonly " $fragmentType": "SpotlightsGridForSpotlights_SpotlightExpress";
}>;
export type SpotlightsGridForSpotlights_SpotlightExpress$key = ReadonlyArray<{
  readonly " $data"?: SpotlightsGridForSpotlights_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightsGridForSpotlights_SpotlightExpress">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "SpotlightsGridForSpotlights_SpotlightExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightCard_SpotlightExpress"
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "50ce3a42dc3e7f86247af69bbb8bda7c";

export default node;
