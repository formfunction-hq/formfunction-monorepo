/**
 * @generated SignedSource<<b23a4e9d27c5b4825503e71adda47895>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FundingTierNftPreviewAssets_MetadataAccount$data = ReadonlyArray<{
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "FundingTierNftPreviewAssets_MetadataAccount";
}>;
export type FundingTierNftPreviewAssets_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: FundingTierNftPreviewAssets_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"FundingTierNftPreviewAssets_MetadataAccount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "FundingTierNftPreviewAssets_MetadataAccount",
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

(node as any).hash = "737e4ce56117a45ab77ec2c22df1beae";

export default node;
