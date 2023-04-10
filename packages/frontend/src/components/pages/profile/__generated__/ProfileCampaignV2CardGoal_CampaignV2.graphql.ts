/**
 * @generated SignedSource<<1f9a73cb87be68b87f0b6e05e5fbf78f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignV2CardGoal_CampaignV2$data = {
  readonly goal: {
    readonly __typename: "CampaignMonetaryGoal";
    readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal">;
  } | {
    readonly __typename: "CampaignSaleCountGoal";
    readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal">;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly " $fragmentType": "ProfileCampaignV2CardGoal_CampaignV2";
};
export type ProfileCampaignV2CardGoal_CampaignV2$key = {
  readonly " $data"?: ProfileCampaignV2CardGoal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignV2CardGoal_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignV2CardGoal_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "goal",
      "plural": false,
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
              "name": "ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal"
            }
          ],
          "type": "CampaignMonetaryGoal",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal"
            }
          ],
          "type": "CampaignSaleCountGoal",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "5e2290a2e7b4db53f8c5ec6d882190ea";

export default node;
