/**
 * @generated SignedSource<<33e8695cba64cbf16acf40196c303350>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileSeries_User$data = {
  readonly id: string;
  readonly seriesOrder: any;
  readonly " $fragmentType": "ProfileSeries_User";
};
export type ProfileSeries_User$key = {
  readonly " $data"?: ProfileSeries_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileSeries_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileSeries_User",
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
      "name": "seriesOrder",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "b136dd3ce91d9d686f68e59314356831";

export default node;
