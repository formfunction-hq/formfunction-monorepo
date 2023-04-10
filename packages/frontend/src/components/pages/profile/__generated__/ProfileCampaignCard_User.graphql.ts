/**
 * @generated SignedSource<<45d017dc53d19a83722c1ce51f1a7eda>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignCard_User$data = {
  readonly id: string;
  readonly " $fragmentType": "ProfileCampaignCard_User";
};
export type ProfileCampaignCard_User$key = {
  readonly " $data"?: ProfileCampaignCard_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCard_User">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignCard_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node as any).hash = "5236025789d3661d09d9033ef335ec1e";

export default node;
