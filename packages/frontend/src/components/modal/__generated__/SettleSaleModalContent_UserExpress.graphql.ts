/**
 * @generated SignedSource<<37f30eb092c1012760cfd0c7e4ac4f95>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettleSaleModalContent_UserExpress$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
  readonly " $fragmentType": "SettleSaleModalContent_UserExpress";
};
export type SettleSaleModalContent_UserExpress$key = {
  readonly " $data"?: SettleSaleModalContent_UserExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettleSaleModalContent_UserExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettleSaleModalContent_UserExpress",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArtistPillButtonForUserExpress_UserExpress"
    }
  ],
  "type": "UserExpress",
  "abstractKey": null
};

(node as any).hash = "e557a265e61103970fc5c6cdee2869d3";

export default node;
