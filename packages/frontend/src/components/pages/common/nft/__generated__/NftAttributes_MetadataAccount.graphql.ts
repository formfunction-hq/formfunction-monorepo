/**
 * @generated SignedSource<<9dc1a0ed7b336d0b1d5a50c9607032f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftAttributes_MetadataAccount$data = {
  readonly data: {
    readonly attributes: ReadonlyArray<{
      readonly traitType: string;
      readonly value: string;
    }> | null;
  };
  readonly nft: {
    readonly CandyMachine: {
      readonly maxSupply: number;
    } | null;
    readonly seriesRarityRanking: number | null;
  };
  readonly " $fragmentType": "NftAttributes_MetadataAccount";
};
export type NftAttributes_MetadataAccount$key = {
  readonly " $data"?: NftAttributes_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftAttributes_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftAttributes_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "NftAttribute",
          "kind": "LinkedField",
          "name": "attributes",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "traitType",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "value",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "name": "seriesRarityRanking",
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
              "name": "maxSupply",
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

(node as any).hash = "361584f95271f2698c1782127c92e9b0";

export default node;
