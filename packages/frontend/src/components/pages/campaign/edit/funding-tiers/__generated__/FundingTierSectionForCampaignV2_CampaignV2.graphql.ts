/**
 * @generated SignedSource<<7fb07df295c166d4bc31dc091b3ad1a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type FundingTierSectionForCampaignV2_CampaignV2$data = {
  readonly fundingTiers: ReadonlyArray<{
    readonly __typename: "CampaignFundingTierStandard";
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }> | null;
  readonly id: string;
  readonly status: CampaignStatusExpress_enum;
  readonly " $fragmentSpreads": FragmentRefs<"ManageFundingTiersModal_CampaignV2">;
  readonly " $fragmentType": "FundingTierSectionForCampaignV2_CampaignV2";
};
export type FundingTierSectionForCampaignV2_CampaignV2$key = {
  readonly " $data"?: FundingTierSectionForCampaignV2_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"FundingTierSectionForCampaignV2_CampaignV2">;
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
  "name": "FundingTierSectionForCampaignV2_CampaignV2",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageFundingTiersModal_CampaignV2"
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "fundingTiers",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard"
            }
          ],
          "type": "CampaignFundingTierStandard",
          "abstractKey": null
        }
      ],
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
})();

(node as any).hash = "74811e3509403d48512bf2af2aff79b0";

export default node;
