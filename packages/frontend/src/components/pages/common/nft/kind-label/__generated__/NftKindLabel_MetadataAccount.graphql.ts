/**
 * @generated SignedSource<<9925a0e169c53227259b122cc3db2d51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftKindLabel_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"GenerativeKindLabel_MetadataAccount" | "MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount" | "MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount" | "PnftStandardEditionKindLabel_MetadataAccount" | "StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount" | "StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "NftKindLabel_MetadataAccount";
};
export type NftKindLabel_MetadataAccount$key = {
  readonly " $data"?: NftKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftKindLabel_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "GenerativeKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PnftStandardEditionKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "eb908f3070bdb30ea488293bb72664af";

export default node;
