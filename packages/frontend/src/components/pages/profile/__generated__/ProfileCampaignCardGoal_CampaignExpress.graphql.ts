/**
 * @generated SignedSource<<ca7879231f42db7cb59cf26da0e64487>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignCardGoal_CampaignExpress$data = {
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
  readonly " $fragmentType": "ProfileCampaignCardGoal_CampaignExpress";
};
export type ProfileCampaignCardGoal_CampaignExpress$key = {
  readonly " $data"?: ProfileCampaignCardGoal_CampaignExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardGoal_CampaignExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignCardGoal_CampaignExpress",
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
  "type": "CampaignExpress",
  "abstractKey": null
};

(node as any).hash = "f27300f29cee642a9f22ed2225cd9eae";

export default node;
