/**
 * @generated SignedSource<<addd58149a5b4adae8e6caa4b51ba3b9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse$data = {
  readonly campaignFundingTiersForSlug: {
    readonly campaignFundingTiers: ReadonlyArray<{
      readonly __typename: "CampaignFundingTierStandard";
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard">;
    } | {
      // This will never be '%other', but we need some
      // value in case none of the concrete values match.
      readonly __typename: "%other";
    }> | null;
  };
  readonly " $fragmentType": "CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse";
};
export type CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse">;
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
  "name": "CampaignFundingTierPreviewsForCampaignsNamespaceFundingTiers_CampaignsNamespaceQueryResponse",
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
                  "name": "CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard"
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

(node as any).hash = "a608f28ff34edd49e984d971d1f27d8c";

export default node;
