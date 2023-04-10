/**
 * @generated SignedSource<<890afe2615d9d72b81f208f0d81e4d72>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCandyMachineMintPhase_CandyMachineExpress$data = {
  readonly allowlistSaleStartTime: string | null;
  readonly publicSaleEndTime: string;
  readonly publicSaleStartTime: string;
  readonly " $fragmentType": "useCandyMachineMintPhase_CandyMachineExpress";
};
export type useCandyMachineMintPhase_CandyMachineExpress$key = {
  readonly " $data"?: useCandyMachineMintPhase_CandyMachineExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPhase_CandyMachineExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCandyMachineMintPhase_CandyMachineExpress",
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
      "name": "publicSaleEndTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "publicSaleStartTime",
      "storageKey": null
    }
  ],
  "type": "CandyMachineExpress",
  "abstractKey": null
};

(node as any).hash = "ca72f68541b9a85a2e7e8b38e8805701";

export default node;
