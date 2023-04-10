/**
 * @generated SignedSource<<4a066ddb86de1488a3da4bb06acff65c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type UnlockableCategory = "DigitalDownload" | "Merch" | "Other" | "PhysicalOriginal" | "PhysicalPrint" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftPageUnlockableInfo_MetadataAccount$data = {
  readonly nft: {
    readonly creatorId: string;
  };
  readonly primarySaleHappened: boolean;
  readonly unlockable: {
    readonly asset: {
      readonly contentType: string;
      readonly path: string;
    };
    readonly category: UnlockableCategory;
    readonly unlockableWinners: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"UnlockableLabel_UnlockableWinnerExpress" | "useUnlockableCtaType_UnlockableWinnerExpress">;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableLabel_MetadataAccount" | "useNftKind_MetadataAccount" | "useUnlockableCtaType_MetadataAccount">;
  readonly " $fragmentType": "NftPageUnlockableInfo_MetadataAccount";
};
export type NftPageUnlockableInfo_MetadataAccount$key = {
  readonly " $data"?: NftPageUnlockableInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageUnlockableInfo_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftPageUnlockableInfo_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
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
          "name": "creatorId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
          "alias": null,
          "args": null,
          "concreteType": "UnlockableWinnerExpress",
          "kind": "LinkedField",
          "name": "unlockableWinners",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "UnlockableLabel_UnlockableWinnerExpress"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useUnlockableCtaType_UnlockableWinnerExpress"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useUnlockableCtaType_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "2306600fa5bcb6092adb8039dd16aef1";

export default node;
