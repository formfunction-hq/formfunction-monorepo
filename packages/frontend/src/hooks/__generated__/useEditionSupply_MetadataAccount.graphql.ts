/**
 * @generated SignedSource<<47afb39126f1a03d46a7669a8a543e5f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useEditionSupply_MetadataAccount$data = {
  readonly nft: {
    readonly maxSupply: number | null;
    readonly maxSupplyOfMasterEdition: number | null;
    readonly numberOfStandardEditionsMinted: number | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
  readonly " $fragmentType": "useEditionSupply_MetadataAccount";
};
export type useEditionSupply_MetadataAccount$key = {
  readonly " $data"?: useEditionSupply_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useEditionSupply_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useEditionSupply_MetadataAccount",
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
          "name": "maxSupply",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupplyOfMasterEdition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "numberOfStandardEditionsMinted",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "28bbc45610753c7c0d6ed81cd36fb46f";

export default node;
