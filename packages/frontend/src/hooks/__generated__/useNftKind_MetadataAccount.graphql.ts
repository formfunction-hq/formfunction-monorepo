/**
 * @generated SignedSource<<743ef4bca496274dedda96afb830a3b2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useNftKind_MetadataAccount$data = {
  readonly nft: {
    readonly CandyMachine: {
      readonly __typename: "CandyMachineExpress";
    } | null;
    readonly isMasterEdition: boolean;
    readonly isPnft: boolean;
    readonly maxSupplyOfMasterEdition: number | null;
    readonly maxSupplyOnchain: number | null;
  };
  readonly " $fragmentType": "useNftKind_MetadataAccount";
};
export type useNftKind_MetadataAccount$key = {
  readonly " $data"?: useNftKind_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useNftKind_MetadataAccount",
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

(node as any).hash = "c304d267b5871d0f5e8adcfdf7453cdf";

export default node;
