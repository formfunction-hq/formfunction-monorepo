/**
 * @generated SignedSource<<65a98fd0429b44927a7e3d86ae8c554f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SpotlightExpressStatus_enum = "Available" | "Ended" | "Override" | "Sold" | "SoldOut" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SpotlightCard_SpotlightExpress$data = {
  readonly spotlightInfo: {
    readonly label: string;
    readonly status: SpotlightExpressStatus_enum;
    readonly statusOverride: string | null;
    readonly title: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightArtistPills_SpotlightExpress" | "SpotlightAssetWithOverlay_SpotlightExpress" | "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress">;
  readonly " $fragmentType": "SpotlightCard_SpotlightExpress";
};
export type SpotlightCard_SpotlightExpress$key = {
  readonly " $data"?: SpotlightCard_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightCard_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightCard_SpotlightExpress",
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
          "name": "status",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "statusOverride",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress"
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

(node as any).hash = "5db0bb0ddf24447f3f3d2ae38816991d";

export default node;
