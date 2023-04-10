/**
 * @generated SignedSource<<98f888cc4c360f30b341e9acf9a552c9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenerativeKindLabel_MetadataAccount$data = {
  readonly nft: {
    readonly CandyMachine: {
      readonly maxSupply: number;
    } | null;
    readonly Series: {
      readonly " $fragmentSpreads": FragmentRefs<"useSeriesLinkRelativeForSeriesExpress_SeriesExpress">;
    } | null;
  };
  readonly " $fragmentType": "GenerativeKindLabel_MetadataAccount";
};
export type GenerativeKindLabel_MetadataAccount$key = {
  readonly " $data"?: GenerativeKindLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenerativeKindLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenerativeKindLabel_MetadataAccount",
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
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SeriesExpress",
          "kind": "LinkedField",
          "name": "Series",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useSeriesLinkRelativeForSeriesExpress_SeriesExpress"
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

(node as any).hash = "945f43f403fb2d4d9713337bef3e6174";

export default node;
