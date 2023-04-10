/**
 * @generated SignedSource<<aa237bb32491b28c911cb77009731924>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$data = {
  readonly candyMachineInfo: {
    readonly candyMachine: {
      readonly " $fragmentSpreads": FragmentRefs<"CandyMachineSeeAllButton_CandyMachineExpress" | "useCandyMachineIsSoldOut_CandyMachineExpress" | "useCandyMachineMintPhase_CandyMachineExpress">;
    };
    readonly mintPreviewAsset: {
      readonly contentType: string;
      readonly downloadUrl: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo" | "MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
  } | null;
  readonly id: string;
  readonly metadataAccountsForSection: {
    readonly __id: string;
    readonly edges: ReadonlyArray<{
      readonly __typename: "MetadataAccountsEdge";
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachineInfo_CampaignSectionWithGenerativeMints" | "CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints" | "CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints" | "useAreCandyMachineNftsShown_CampaignSectionWithGenerativeMints">;
  readonly " $fragmentType": "CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints";
};
export type CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "candyMachineInfoInput"
    },
    {
      "kind": "RootArgument",
      "name": "firstForSections"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignSectionForCampaignSectionWithGenerativeMint_CampaignSectionWithGenerativeMints",
  "selections": [
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
          "name": "input",
          "variableName": "candyMachineInfoInput"
        }
      ],
      "concreteType": "CampaignSectionWithGenerativeMintsCandyMachineInfo",
      "kind": "LinkedField",
      "name": "candyMachineInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CandyMachineExpress",
          "kind": "LinkedField",
          "name": "candyMachine",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CandyMachineSeeAllButton_CandyMachineExpress"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCandyMachineIsSoldOut_CandyMachineExpress"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCandyMachineMintPhase_CandyMachineExpress"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "mintPreviewAsset",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "contentType",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "downloadUrl",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo"
        }
      ],
      "storageKey": null
    },
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
        },
        {
          "kind": "ClientExtension",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__id",
              "storageKey": null
            }
          ]
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CandyMachineInfo_CampaignSectionWithGenerativeMints"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CandyMachineMetadataAccounts_CampaignSectionWithGenerativeMints"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints"
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

(node as any).hash = "3f6a321103e333994f980ea7404350ba";

export default node;
