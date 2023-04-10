/**
 * @generated SignedSource<<ec72cdf754d4b9533ed19397c8469853>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useCampaignLinkForCampaignV2_CampaignV2$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly slug: string;
  readonly status: CampaignStatusExpress_enum;
  readonly " $fragmentType": "useCampaignLinkForCampaignV2_CampaignV2";
};
export type useCampaignLinkForCampaignV2_CampaignV2$key = {
  readonly " $data"?: useCampaignLinkForCampaignV2_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCampaignLinkForCampaignV2_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCampaignLinkForCampaignV2_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
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
    },
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
      "name": "status",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "f3109d9e865046275f3c510a8a8e8be2";

export default node;
