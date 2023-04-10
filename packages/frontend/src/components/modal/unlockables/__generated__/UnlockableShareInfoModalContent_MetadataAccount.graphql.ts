/**
 * @generated SignedSource<<cd5c5158e72a8387f2eb8a1bbb182471>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableShareInfoModalContent_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly nft: {
    readonly Creator: {
      readonly username: string;
    } | null;
  };
  readonly unlockable: {
    readonly id: string;
    readonly unlockableWinners: ReadonlyArray<{
      readonly hasBuyerDismissedShareInfoCta: boolean;
      readonly userEmail: string | null;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
  readonly " $fragmentType": "UnlockableShareInfoModalContent_MetadataAccount";
};
export type UnlockableShareInfoModalContent_MetadataAccount$key = {
  readonly " $data"?: UnlockableShareInfoModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableShareInfoModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "unlockableWinnerUserEmailInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableShareInfoModalContent_MetadataAccount",
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
          "kind": "ScalarField",
          "name": "name",
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "username",
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
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
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
          "concreteType": "UnlockableWinnerExpress",
          "kind": "LinkedField",
          "name": "unlockableWinners",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasBuyerDismissedShareInfoCta",
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Variable",
                  "name": "input",
                  "variableName": "unlockableWinnerUserEmailInput"
                }
              ],
              "kind": "ScalarField",
              "name": "userEmail",
              "storageKey": null
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "2ec88740cea5fadf4db6ae640ab017a4";

export default node;
