/**
 * @generated SignedSource<<df17373d11201dad363aa32495cc8b52>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClaimPnftModal_Claim$data = {
  readonly id: string;
  readonly proof: string | null;
  readonly " $fragmentType": "ClaimPnftModal_Claim";
};
export type ClaimPnftModal_Claim$key = {
  readonly " $data"?: ClaimPnftModal_Claim$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_Claim">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClaimPnftModal_Claim",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "proof",
      "storageKey": null
    }
  ],
  "type": "Claim",
  "abstractKey": null
};

(node as any).hash = "8b74161933de4f95d929ac6e980af151";

export default node;
