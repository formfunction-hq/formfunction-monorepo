/**
 * @generated SignedSource<<1c810f3061c6c321c4b462dcc2c18f5b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignManageCampaignsCard_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
    readonly username: string;
  };
  readonly goalProgressSymbol: string;
  readonly slug: string;
  readonly status: CampaignStatusExpress_enum;
  readonly title: string;
  readonly " $fragmentType": "CampaignManageCampaignsCard_CampaignV2";
};
export type CampaignManageCampaignsCard_CampaignV2$key = {
  readonly " $data"?: CampaignManageCampaignsCard_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignManageCampaignsCard_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignManageCampaignsCard_CampaignV2",
  "selections": [
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
      "name": "title",
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
      "name": "goalProgressSymbol",
      "storageKey": null
    },
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
          "name": "id",
          "storageKey": null
        },
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
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "5180315916cb0b89be695c643eec50ae";

export default node;
