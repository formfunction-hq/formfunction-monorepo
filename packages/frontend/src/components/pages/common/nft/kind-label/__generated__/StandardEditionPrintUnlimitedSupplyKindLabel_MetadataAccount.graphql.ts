/**
 * @generated SignedSource<<5717aef96c1d6a97a231df076aaec8c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount$data = {
  readonly nft: {
    readonly edition: number | null;
    readonly isImported: boolean;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount";
};
export type StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount$key = {
  readonly " $data"?: StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount",
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
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isImported",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useEditionSupply_MetadataAccount"
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

(node as any).hash = "ccc6c069dffcf78b7823854df7e3fcd4";

export default node;
