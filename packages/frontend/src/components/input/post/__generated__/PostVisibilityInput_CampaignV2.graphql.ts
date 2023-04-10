/**
 * @generated SignedSource<<9a4920bf532ceb81616faf07c1d5379a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostVisibilityInput_CampaignV2$data = {
  readonly fundingTiers: ReadonlyArray<{
    readonly __typename: string;
    readonly id?: string;
    readonly title?: string;
    readonly " $fragmentSpreads": FragmentRefs<"GenericFundingTiersInput_CampaignFundingTierStandard">;
  }> | null;
  readonly " $fragmentType": "PostVisibilityInput_CampaignV2";
};
export type PostVisibilityInput_CampaignV2$key = {
  readonly " $data"?: PostVisibilityInput_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilityInput_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVisibilityInput_CampaignV2",
  "selections": [
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            }
          ],
          "type": "ICampaignFundingTier",
          "abstractKey": "__isICampaignFundingTier"
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "GenericFundingTiersInput_CampaignFundingTierStandard"
            }
          ],
          "type": "CampaignFundingTierStandard",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "c6f182c2808c86cbd4789dfce11da94f";

export default node;
