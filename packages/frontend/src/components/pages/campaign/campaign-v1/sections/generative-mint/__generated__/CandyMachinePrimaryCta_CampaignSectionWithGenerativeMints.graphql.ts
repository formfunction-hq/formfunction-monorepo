/**
 * @generated SignedSource<<e3a175c79bbf876105fd97651753849a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints$data = {
  readonly candyMachineInfo: {
    readonly candyMachine: {
      readonly maxSupply: number;
      readonly totalAmountMinted: number;
      readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPhase_CandyMachineExpress" | "useCandyMachineMintPrice_CandyMachineExpress">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
  } | null;
  readonly " $fragmentType": "CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints";
};
export type CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "candyMachineInfoInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CandyMachinePrimaryCta_CampaignSectionWithGenerativeMints",
  "selections": [
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "maxSupply",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalAmountMinted",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCandyMachineMintPhase_CandyMachineExpress"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCandyMachineMintPrice_CandyMachineExpress"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignSectionWithGenerativeMints",
  "abstractKey": null
};

(node as any).hash = "5755f347ea0544df779d5372fdd5fe9f";

export default node;
