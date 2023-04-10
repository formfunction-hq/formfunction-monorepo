/**
 * @generated SignedSource<<85d7d239d1832a53bcbc34e03facda48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DeleteModal_MetadataAccount$data = {
  readonly mint: string;
  readonly nft: {
    readonly numberOfStandardEditionsMinted: number | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
  readonly " $fragmentType": "DeleteModal_MetadataAccount";
};
export type DeleteModal_MetadataAccount$key = {
  readonly " $data"?: DeleteModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"DeleteModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "DeleteModal_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
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

(node as any).hash = "3014ee9af22e473b96d4c348f3b19a6e";

export default node;
