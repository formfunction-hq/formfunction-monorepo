/**
 * @generated SignedSource<<fe3afa2aab0d3a8d65cecaef4c2de02c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress$data = {
  readonly spotlightInfo: {
    readonly url: string | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightDetailsModal_SpotlightExpress">;
  readonly " $fragmentType": "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress";
};
export type SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress$key = {
  readonly " $data"?: SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress",
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
          "name": "url",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightDetailsModal_SpotlightExpress"
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "268e5748972ed78cfd4bec33aaccb2b5";

export default node;
