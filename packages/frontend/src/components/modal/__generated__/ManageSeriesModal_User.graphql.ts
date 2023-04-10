/**
 * @generated SignedSource<<4be71a4049b6808808cbdd1e1fbb82c8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageSeriesModal_User$data = {
  readonly seriesOrder: any;
  readonly " $fragmentType": "ManageSeriesModal_User";
};
export type ManageSeriesModal_User$key = {
  readonly " $data"?: ManageSeriesModal_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSeriesModal_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageSeriesModal_User",
  "selections": [
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

(node as any).hash = "1bb15e43d200cc8800fd1b5c0ad019f5";

export default node;
