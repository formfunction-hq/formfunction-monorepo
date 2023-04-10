/**
 * @generated SignedSource<<c48b6e4af299dd39f8e49ac6c5b0e1a1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useBuyEdition_EditionsMerkleAllowlistInfoExpress$data = {
  readonly amountAllowed: number;
  readonly proof: string;
  readonly rootIndex: number;
  readonly " $fragmentType": "useBuyEdition_EditionsMerkleAllowlistInfoExpress";
};
export type useBuyEdition_EditionsMerkleAllowlistInfoExpress$key = {
  readonly " $data"?: useBuyEdition_EditionsMerkleAllowlistInfoExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useBuyEdition_EditionsMerkleAllowlistInfoExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useBuyEdition_EditionsMerkleAllowlistInfoExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "amountAllowed",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "proof",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "rootIndex",
      "storageKey": null
    }
  ],
  "type": "EditionsMerkleAllowlistInfoExpress",
  "abstractKey": null
};

(node as any).hash = "125f178d417e0506dcdc4dc3dfd201fc";

export default node;
