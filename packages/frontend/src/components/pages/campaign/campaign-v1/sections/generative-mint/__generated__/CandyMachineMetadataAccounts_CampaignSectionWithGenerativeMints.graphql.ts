/**
 * @generated SignedSource<<74b6302f32d1b46364b5e7b8b97b5d23>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints$data = {
  readonly metadataAccountsForSection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
      };
    }>;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints">;
  readonly " $fragmentType": "CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints";
};
export type CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "firstForSections"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints",
  "selections": [
    {
      "alias": "metadataAccountsForSection",
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "firstForSections"
        }
      ],
      "concreteType": "MetadataAccountsConnection",
      "kind": "LinkedField",
      "name": "previewMetadataAccounts",
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
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "id",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ListingCardForMetadata_MetadataAccount"
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
      "name": "useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints"
    }
  ],
  "type": "CampaignSectionWithGenerativeMints",
  "abstractKey": null
};

(node as any).hash = "2ecfa810918cc1b249226acde4bffb66";

export default node;
