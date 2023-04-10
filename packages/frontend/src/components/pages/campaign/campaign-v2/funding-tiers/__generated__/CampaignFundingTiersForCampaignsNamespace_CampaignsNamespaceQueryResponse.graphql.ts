/**
 * @generated SignedSource<<75fefb0b83ccf42f1201120d36c51320>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse$data = {
  readonly campaignFundingTiersForSlug: {
    readonly campaignFundingTiers: ReadonlyArray<{
      readonly __typename: "CampaignFundingTierStandard";
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
  readonly " $fragmentType": "CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse";
};
export type CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignFundingTiersForCampaignsNamespace_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "CampaignFundingTiersForSlugResponse",
      "kind": "LinkedField",
      "name": "campaignFundingTiersForSlug",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "campaignFundingTiers",
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
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard"
                }
              ],
              "type": "CampaignFundingTierStandard",
              "abstractKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};

(node as any).hash = "f893b2e456c2e8022fef66b3a80e6d52";

export default node;
