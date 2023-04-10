/**
 * @generated SignedSource<<fa6f59b9d5067383e6cf88b887109e3a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SpotlightExpressStatus_enum = "Available" | "Ended" | "Override" | "Sold" | "SoldOut" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SpotlightExpressStatusEnum_SpotlightExpress$data = {
  readonly spotlightInfo: {
    readonly status: SpotlightExpressStatus_enum;
  };
  readonly " $fragmentType": "SpotlightExpressStatusEnum_SpotlightExpress";
};
export type SpotlightExpressStatusEnum_SpotlightExpress$key = {
  readonly " $data"?: SpotlightExpressStatusEnum_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightExpressStatusEnum_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightExpressStatusEnum_SpotlightExpress",
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
          "name": "status",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "3c34e06b7b2ab106abecaa8caff45433";

export default node;
