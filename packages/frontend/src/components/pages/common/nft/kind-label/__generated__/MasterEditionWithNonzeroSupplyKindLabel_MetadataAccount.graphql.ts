/**
 * @generated SignedSource<<36ff687016c69484dc0af8ecda234513>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount">;
  readonly " $fragmentType": "MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount";
};
export type MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount$key = {
  readonly " $data"?: MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useEditionSupply_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "c57d535b7a740cfe5bd7e27fdeaa0ae7";

export default node;
