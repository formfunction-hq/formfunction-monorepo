/**
 * @generated SignedSource<<110b04bb66d51573ab62bd3539c0caeb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PnftStandardEditionKindLabel_MetadataAccount$data = {
  readonly nft: {
    readonly edition: number | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "PnftStandardEditionKindLabel_MetadataAccount";
};
export type PnftStandardEditionKindLabel_MetadataAccount$key = {
  readonly " $data"?: PnftStandardEditionKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"PnftStandardEditionKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PnftStandardEditionKindLabel_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "edition",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftLinkForMetadataAccount_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "012579bce2a2ee9aa3025247d79ba57c";

export default node;
