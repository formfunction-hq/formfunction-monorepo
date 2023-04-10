/**
 * @generated SignedSource<<e113ad32b7d9c4865e6ad21042743187>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignDashboardSettingsTab_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
  };
  readonly id: string;
  readonly status: CampaignStatusExpress_enum;
  readonly title: string;
  readonly " $fragmentType": "CampaignDashboardSettingsTab_CampaignV2";
};
export type CampaignDashboardSettingsTab_CampaignV2$key = {
  readonly " $data"?: CampaignDashboardSettingsTab_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardSettingsTab_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDashboardSettingsTab_CampaignV2",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
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
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "1df0f53a646f330aafe828f062f82533";

export default node;
