/**
 * @generated SignedSource<<9382eb7a2d80fad7efb6d6710cde0dd0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UnlockableCategory = "DigitalDownload" | "Merch" | "Other" | "PhysicalOriginal" | "PhysicalPrint" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type UnlockableDetailsModalContent_MetadataAccount$data = {
  readonly unlockable: {
    readonly asset: {
      readonly contentType: string;
      readonly path: string;
    };
    readonly category: UnlockableCategory;
    readonly description: string | null;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"UnlockableTinyLabel_UnlockableExpress">;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableDetailsModalCtaLabel_MetadataAccount">;
  readonly " $fragmentType": "UnlockableDetailsModalContent_MetadataAccount";
};
export type UnlockableDetailsModalContent_MetadataAccount$key = {
  readonly " $data"?: UnlockableDetailsModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableDetailsModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableDetailsModalContent_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "category",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "asset",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "contentType",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "path",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "UnlockableTinyLabel_UnlockableExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableDetailsModalCtaLabel_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "47ac9c3ceb8c2280df44d8662966730b";

export default node;
