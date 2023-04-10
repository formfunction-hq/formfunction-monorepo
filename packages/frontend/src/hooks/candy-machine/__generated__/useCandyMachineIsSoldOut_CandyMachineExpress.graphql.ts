/**
 * @generated SignedSource<<1cae14c2ebe2e74cca0a231e0d24a903>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCandyMachineIsSoldOut_CandyMachineExpress$data = {
  readonly maxSupply: number;
  readonly totalAmountMinted: number;
  readonly " $fragmentType": "useCandyMachineIsSoldOut_CandyMachineExpress";
};
export type useCandyMachineIsSoldOut_CandyMachineExpress$key = {
  readonly " $data"?: useCandyMachineIsSoldOut_CandyMachineExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineIsSoldOut_CandyMachineExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCandyMachineIsSoldOut_CandyMachineExpress",
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
    }
  ],
  "type": "CandyMachineExpress",
  "abstractKey": null
};

(node as any).hash = "b1189ff55dad166bae7faf2f53ae7a9d";

export default node;
