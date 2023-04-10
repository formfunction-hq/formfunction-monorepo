/**
 * @generated SignedSource<<37801171b86558e3eb1b09b1d5134664>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageFundingTierRow_CampaignFundingTierStandard$data = {
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "ManageFundingTierRow_CampaignFundingTierStandard";
};
export type ManageFundingTierRow_CampaignFundingTierStandard$key = {
  readonly " $data"?: ManageFundingTierRow_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageFundingTierRow_CampaignFundingTierStandard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManageFundingTierRow_CampaignFundingTierStandard",
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
      "name": "title",
      "storageKey": null
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};

(node as any).hash = "49efb2256a2eb5a0c6f9d6009d1a18cc";

export default node;
