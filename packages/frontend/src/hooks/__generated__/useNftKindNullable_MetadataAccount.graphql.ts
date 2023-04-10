/**
 * @generated SignedSource<<289b02ef40a0edb0da29533346b134c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useNftKindNullable_MetadataAccount$data = {
  readonly nft: {
    readonly CandyMachine: {
      readonly __typename: "CandyMachineExpress";
    } | null;
    readonly isMasterEdition: boolean;
    readonly isPnft: boolean;
    readonly maxSupplyOfMasterEdition: number | null;
    readonly maxSupplyOnchain: number | null;
  };
  readonly " $fragmentType": "useNftKindNullable_MetadataAccount";
};
export type useNftKindNullable_MetadataAccount$key = {
  readonly " $data"?: useNftKindNullable_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNftKindNullable_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useNftKindNullable_MetadataAccount",
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
          "name": "isMasterEdition",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isPnft",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "maxSupplyOnchain",
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
          "concreteType": "CandyMachineExpress",
          "kind": "LinkedField",
          "name": "CandyMachine",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "81365bb068d088301a864542d4572281";

export default node;
