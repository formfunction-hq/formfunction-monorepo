/**
 * @generated SignedSource<<7980aa52ebd66aa5095359862c8e2fb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDashboardHoldersTab_CampaignV2$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly fundingTiers: ReadonlyArray<{
    readonly id?: string;
    readonly title?: string;
    readonly " $fragmentSpreads": FragmentRefs<"GenericFundingTiersInput_CampaignFundingTierStandard">;
  }> | null;
  readonly slug: string;
  readonly title: string;
  readonly " $fragmentType": "CampaignDashboardHoldersTab_CampaignV2";
};
export type CampaignDashboardHoldersTab_CampaignV2$key = {
  readonly " $data"?: CampaignDashboardHoldersTab_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardHoldersTab_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDashboardHoldersTab_CampaignV2",
  "selections": [
    (v0/*: any*/),
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
      "concreteType": null,
      "kind": "LinkedField",
      "name": "fundingTiers",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "type": "ICampaignFundingTier",
          "abstractKey": "__isICampaignFundingTier"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "GenericFundingTiersInput_CampaignFundingTierStandard"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "8ed1d4e19abe55ed53be7e36cddbb542";

export default node;
