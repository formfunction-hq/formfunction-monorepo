/**
 * @generated SignedSource<<00b0be6ec98394cdda4b147ddcd63f07>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type GenericNftSearchRow_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly id: string;
  readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "GenericNftSearchRow_MetadataAccount";
};
export type GenericNftSearchRow_MetadataAccount$key = {
  readonly " $data"?: GenericNftSearchRow_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchRow_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GenericNftSearchRow_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
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

(node as any).hash = "ad40ecd021ba00ff07a746d830dd6734";

export default node;
