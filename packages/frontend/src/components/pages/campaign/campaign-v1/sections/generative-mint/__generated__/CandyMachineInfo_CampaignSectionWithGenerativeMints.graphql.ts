/**
 * @generated SignedSource<<57f99cd4eb00269010a68e9b877f4285>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CandyMachineInfo_CampaignSectionWithGenerativeMints$data = {
  readonly candyMachineInfo: {
    readonly candyMachine: {
      readonly allowlistSaleStartTime: string | null;
      readonly limitPerAddress: number;
      readonly omniMintWallets: ReadonlyArray<string>;
      readonly publicSaleStartTime: string;
      readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineIsSoldOut_CandyMachineExpress" | "useCandyMachineMintPhase_CandyMachineExpress">;
    };
    readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
  } | null;
  readonly description: string;
  readonly title: string;
  readonly " $fragmentType": "CandyMachineInfo_CampaignSectionWithGenerativeMints";
};
export type CandyMachineInfo_CampaignSectionWithGenerativeMints$key = {
  readonly " $data"?: CandyMachineInfo_CampaignSectionWithGenerativeMints$data;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachineInfo_CampaignSectionWithGenerativeMints">;
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
  "name": "CandyMachineInfo_CampaignSectionWithGenerativeMints",
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
              "name": "allowlistSaleStartTime",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "limitPerAddress",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "publicSaleStartTime",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "omniMintWallets",
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
              "name": "useCandyMachineIsSoldOut_CandyMachineExpress"
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

(node as any).hash = "2eac2d3eb9d267a8898940bef68190df";

export default node;
