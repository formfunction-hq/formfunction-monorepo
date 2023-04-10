/**
 * @generated SignedSource<<70bbeb6ca7f988f336526b3323748aa4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount$data = {
  readonly nft: {
    readonly edition: number | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount";
};
export type StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount$key = {
  readonly " $data"?: StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount",
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

(node as any).hash = "ba376c80711adba1c1852213c336450c";

export default node;
