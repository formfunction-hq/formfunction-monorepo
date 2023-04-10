/**
 * @generated SignedSource<<678454c3a137ab4c7c17933380c07e7a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ManageFundingTiersModal_CampaignV2$data = {
  readonly fundingTiers: ReadonlyArray<{
    readonly __typename: "CampaignFundingTierStandard";
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ManageFundingTierRow_CampaignFundingTierStandard">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }> | null;
  readonly id: string;
  readonly status: CampaignStatusExpress_enum;
  readonly " $fragmentType": "ManageFundingTiersModal_CampaignV2";
};
export type ManageFundingTiersModal_CampaignV2$key = {
  readonly " $data"?: ManageFundingTiersModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageFundingTiersModal_CampaignV2">;
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
  "name": "ManageFundingTiersModal_CampaignV2",
  "selections": [
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
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ManageFundingTierRow_CampaignFundingTierStandard"
            },
            (v0/*: any*/)
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

(node as any).hash = "dbc33a78aa45cb4e7a23dda579a2d331";

export default node;
