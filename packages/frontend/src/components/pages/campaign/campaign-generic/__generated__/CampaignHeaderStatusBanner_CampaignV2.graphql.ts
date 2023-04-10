/**
 * @generated SignedSource<<67ef5be29ce1998ce4d1e67f1464ce17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignHeaderStatusBanner_CampaignV2$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly slug: string;
  readonly status: CampaignStatusExpress_enum;
  readonly " $fragmentType": "CampaignHeaderStatusBanner_CampaignV2";
};
export type CampaignHeaderStatusBanner_CampaignV2$key = {
  readonly " $data"?: CampaignHeaderStatusBanner_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeaderStatusBanner_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignHeaderStatusBanner_CampaignV2",
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
      "name": "status",
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

(node as any).hash = "4eeb7a7423d4fb09928a1938c668a2d8";

export default node;
