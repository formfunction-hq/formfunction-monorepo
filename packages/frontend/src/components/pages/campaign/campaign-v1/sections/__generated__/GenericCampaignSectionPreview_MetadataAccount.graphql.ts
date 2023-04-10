/**
 * @generated SignedSource<<c89169f801609beaefda4b19ceec16b4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericCampaignSectionPreview_MetadataAccount$data = ReadonlyArray<{
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "GenericCampaignSectionPreview_MetadataAccount";
}>;
export type GenericCampaignSectionPreview_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: GenericCampaignSectionPreview_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericCampaignSectionPreview_MetadataAccount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "GenericCampaignSectionPreview_MetadataAccount",
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

(node as any).hash = "04eb58dc2a5af628c1ade4b396dc6152";

export default node;
