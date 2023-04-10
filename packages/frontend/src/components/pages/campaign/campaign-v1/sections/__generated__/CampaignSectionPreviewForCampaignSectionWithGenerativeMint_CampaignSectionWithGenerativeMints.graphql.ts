/**
 * @generated SignedSource<<02ee5f1ca26b97ddd6491fa3ff88ca04>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$data = {
  readonly description: string;
  readonly id: string;
  readonly previewMetadataAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly " $fragmentSpreads": FragmentRefs<"GenericCampaignSectionPreview_MetadataAccount">;
      };
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentType": "CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints";
};
export type CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints">;
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
  "name": "CampaignSectionPreviewForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints",
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
  "type": "CampaignSectionWithGenerativeMints",
  "abstractKey": null
};

(node as any).hash = "111e6361202f37b3da0b3b55ba72b6ed";

export default node;
