/**
 * @generated SignedSource<<65f0386e9aa4ad31b6e6d3ec932a6115>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard$data = {
  readonly description: string;
  readonly id: string;
  readonly metadataAccountsForPreview: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount">;
      };
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierManageNftsModal_CampaignFundingTierStandard" | "FundingTierNftsContext_CampaignFundingTierStandard">;
  readonly " $fragmentType": "CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard";
};
export type CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard$key = {
  readonly " $data"?: CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "firstForPreviewNfts"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignFundingTierPreviewForCampaignFundingTierStandard_CampaignFundingTierStandard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": "metadataAccountsForPreview",
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "firstForPreviewNfts"
        }
      ],
      "concreteType": "MetadataAccountsConnection",
      "kind": "LinkedField",
      "name": "metadataAccounts",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "MetadataAccountsEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "MetadataAccount",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignFundingTierManageNftsModal_CampaignFundingTierStandard"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FundingTierNftsContext_CampaignFundingTierStandard"
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};

(node as any).hash = "54252ce5c0ded0a63135433787ab676a";

export default node;
