/**
 * @generated SignedSource<<a87a2da3b92edcaa8771a1b4066f77cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SeriesType_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SeriesTypeEnum_Series$data = {
  readonly type: SeriesType_enum;
  readonly " $fragmentType": "SeriesTypeEnum_Series";
};
export type SeriesTypeEnum_Series$key = {
  readonly " $data"?: SeriesTypeEnum_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesTypeEnum_Series">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesTypeEnum_Series",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "9290126141f2f64182e3efe26697c58d";

export default node;
