/**
 * @generated SignedSource<<c6f2da56067bb5e6a0d63df2e936216f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericFundingTiersInput_CampaignFundingTierStandard$data = ReadonlyArray<{
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "GenericFundingTiersInput_CampaignFundingTierStandard";
}>;
export type GenericFundingTiersInput_CampaignFundingTierStandard$key = ReadonlyArray<{
  readonly " $data"?: GenericFundingTiersInput_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericFundingTiersInput_CampaignFundingTierStandard">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "GenericFundingTiersInput_CampaignFundingTierStandard",
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

(node as any).hash = "fa5fd95b37978042ec09aea34e2eb454";

export default node;
