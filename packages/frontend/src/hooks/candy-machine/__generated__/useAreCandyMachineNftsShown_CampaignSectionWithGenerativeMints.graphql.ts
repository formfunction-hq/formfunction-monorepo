/**
 * @generated SignedSource<<1a2094f0d800c88a3c3d750eca502e35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints$data = {
  readonly metadataAccountsForSection: {
    readonly edges: ReadonlyArray<{
      readonly __typename: "MetadataAccountsEdge";
    }>;
  } | null;
  readonly " $fragmentType": "useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints";
};
export type useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints">;
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
  "name": "useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints",
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
              "kind": "ScalarField",
              "name": "__typename",
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

(node as any).hash = "482f405f186ba52ddda5f1fc0e83c030";

export default node;
