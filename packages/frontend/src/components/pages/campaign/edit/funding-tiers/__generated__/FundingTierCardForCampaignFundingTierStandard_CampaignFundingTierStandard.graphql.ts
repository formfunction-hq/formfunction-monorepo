/**
 * @generated SignedSource<<e3ff3aeddd8bf942d4687c0f6001e7d8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard$data = {
  readonly description: string;
  readonly metadataAccountsForPreview: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"FundingTierNftPreviewAssets_MetadataAccount">;
      };
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierManageNftsModal_CampaignFundingTierStandard" | "EditFundingTierModal_CampaignFundingTierStandard" | "FundingTierNftsContext_CampaignFundingTierStandard">;
  readonly " $fragmentType": "FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard";
};
export type FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard$key = {
  readonly " $data"?: FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FundingTierCardForCampaignFundingTierStandard_CampaignFundingTierStandard",
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
      "alias": "metadataAccountsForPreview",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 3
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
                  "name": "FundingTierNftPreviewAssets_MetadataAccount"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "metadataAccounts(first:3)"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditFundingTierModal_CampaignFundingTierStandard"
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

(node as any).hash = "29841b878351131d0c9609e534f61562";

export default node;
