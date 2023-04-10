/**
 * @generated SignedSource<<661b85c83ac01cca425427a93768bcda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SeriesTypeExpress_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useSeriesLinkRelativeForSeriesExpress_SeriesExpress$data = {
  readonly Creator: {
    readonly username: string;
  };
  readonly slug: string;
  readonly type: SeriesTypeExpress_enum;
  readonly " $fragmentType": "useSeriesLinkRelativeForSeriesExpress_SeriesExpress";
};
export type useSeriesLinkRelativeForSeriesExpress_SeriesExpress$key = {
  readonly " $data"?: useSeriesLinkRelativeForSeriesExpress_SeriesExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useSeriesLinkRelativeForSeriesExpress_SeriesExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useSeriesLinkRelativeForSeriesExpress_SeriesExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "Creator",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SeriesExpress",
  "abstractKey": null
};

(node as any).hash = "32d0663e748039203867ec70c1224774";

export default node;
