/**
 * @generated SignedSource<<62e9ffe16a238159602eda7b85a3ed80>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount$data = ReadonlyArray<{
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount";
}>;
export type CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CampaignFundingTierPreviewForMetadataAccounts_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftAssetForMetadataAccount_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "bf60137a811afb164641640e01ef89b5";

export default node;
