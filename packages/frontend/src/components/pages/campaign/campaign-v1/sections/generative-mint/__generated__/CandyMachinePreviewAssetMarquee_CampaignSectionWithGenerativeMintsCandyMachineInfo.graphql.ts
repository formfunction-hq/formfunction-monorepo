/**
 * @generated SignedSource<<cc6147fd00edf7d8c12988d65dd7b01b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo$data = {
  readonly candyMachine: {
    readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPhase_CandyMachineExpress">;
  };
  readonly premintPreviewAssets: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  }> | null;
  readonly " $fragmentType": "CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo";
};
export type CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo$key = {
  readonly " $data"?: CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CandyMachinePreviewAssetMarquee_CampaignSectionWithGenerativeMintsCandyMachineInfo",
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
      "name": "premintPreviewAssets",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForAssetExpress_AssetExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignSectionWithGenerativeMintsCandyMachineInfo",
  "abstractKey": null
};

(node as any).hash = "e242062ff3430484262898525cbe009e";

export default node;
