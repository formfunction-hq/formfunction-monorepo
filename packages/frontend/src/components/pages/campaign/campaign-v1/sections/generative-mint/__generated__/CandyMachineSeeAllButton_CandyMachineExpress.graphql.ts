/**
 * @generated SignedSource<<eaa650989c17f27860e4e309c2552283>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CandyMachineSeeAllButton_CandyMachineExpress$data = {
  readonly Series: {
    readonly " $fragmentSpreads": FragmentRefs<"useSeriesLinkRelativeForSeriesExpress_SeriesExpress">;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineIsSoldOut_CandyMachineExpress" | "useCandyMachineMintPhase_CandyMachineExpress">;
  readonly " $fragmentType": "CandyMachineSeeAllButton_CandyMachineExpress";
};
export type CandyMachineSeeAllButton_CandyMachineExpress$key = {
  readonly " $data"?: CandyMachineSeeAllButton_CandyMachineExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CandyMachineSeeAllButton_CandyMachineExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CandyMachineSeeAllButton_CandyMachineExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "SeriesExpress",
      "kind": "LinkedField",
      "name": "Series",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useSeriesLinkRelativeForSeriesExpress_SeriesExpress"
        }
      ],
      "storageKey": null
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
  "type": "CandyMachineExpress",
  "abstractKey": null
};

(node as any).hash = "4193aad84ef5d39a6355c66de8421bb4";

export default node;
