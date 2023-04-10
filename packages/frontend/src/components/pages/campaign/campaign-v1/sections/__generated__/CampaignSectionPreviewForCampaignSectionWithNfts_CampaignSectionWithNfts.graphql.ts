/**
 * @generated SignedSource<<2ad09c75c398d75ba6419f9cd776474f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts$data = {
  readonly description: string;
  readonly id: string;
  readonly metadataAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"GenericCampaignSectionPreview_MetadataAccount">;
      };
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentType": "CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts";
};
export type CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts$key = {
  readonly " $data"?: CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts">;
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
  "name": "CampaignSectionPreviewForCampaignSectionWithNfts_CampaignSectionWithNfts",
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
      "alias": null,
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
                  "name": "GenericCampaignSectionPreview_MetadataAccount"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignSectionWithNfts",
  "abstractKey": null
};

(node as any).hash = "369616ec4b30b193cbcb2096385617b0";

export default node;
