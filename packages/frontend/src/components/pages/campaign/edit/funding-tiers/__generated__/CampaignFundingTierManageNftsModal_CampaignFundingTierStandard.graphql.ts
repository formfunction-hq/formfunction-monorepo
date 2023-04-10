/**
 * @generated SignedSource<<779b671c2bdadd4541a1afe6f1a8c768>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$data = {
  readonly id: string;
  readonly " $fragmentType": "CampaignFundingTierManageNftsModal_CampaignFundingTierStandard";
};
export type CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$key = {
  readonly " $data"?: CampaignFundingTierManageNftsModal_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierManageNftsModal_CampaignFundingTierStandard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignFundingTierManageNftsModal_CampaignFundingTierStandard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};

(node as any).hash = "6eec96b334cae07702a95a0ba15a692f";

export default node;
