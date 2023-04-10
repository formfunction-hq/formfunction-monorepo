/**
 * @generated SignedSource<<52fc4f4c72c80c2122d3bfbb6b3349a7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpotlightDetailsModal_SpotlightExpress$data = {
  readonly spotlightInfo: {
    readonly description: string;
    readonly label: string;
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightArtistPills_SpotlightExpress" | "SpotlightAssetWithOverlay_SpotlightExpress">;
  readonly " $fragmentType": "SpotlightDetailsModal_SpotlightExpress";
};
export type SpotlightDetailsModal_SpotlightExpress$key = {
  readonly " $data"?: SpotlightDetailsModal_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightDetailsModal_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightDetailsModal_SpotlightExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SpotlightInfo",
      "kind": "LinkedField",
      "name": "spotlightInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightAssetWithOverlay_SpotlightExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightArtistPills_SpotlightExpress"
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "465069264c0dd7b9114afc565f101064";

export default node;
