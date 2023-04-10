/**
 * @generated SignedSource<<290d946c328cd9e24c7fd9ceaafa4bce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignBenefitsSection_CampaignFundingTierStandard$data = {
  readonly benefits: ReadonlyArray<{
    readonly description: string;
  }> | null;
  readonly " $fragmentType": "CampaignBenefitsSection_CampaignFundingTierStandard";
};
export type CampaignBenefitsSection_CampaignFundingTierStandard$key = {
  readonly " $data"?: CampaignBenefitsSection_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignBenefitsSection_CampaignFundingTierStandard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignBenefitsSection_CampaignFundingTierStandard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignBenefitExpress",
      "kind": "LinkedField",
      "name": "benefits",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};

(node as any).hash = "4b1f97b9d811c45ba2593dcd79e7b9f4";

export default node;
