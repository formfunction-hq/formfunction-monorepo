/**
 * @generated SignedSource<<52a100cb44a8e894b255819b9eb66160>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableModalContainer_MetadataAccount$data = {
  readonly unlockable: {
    readonly unlockableWinners: ReadonlyArray<{
      readonly userEmail: string | null;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableDetailsModalContent_MetadataAccount" | "UnlockableSeeInfoModalContent_MetadataAccount" | "UnlockableShareInfoModalContent_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "UnlockableModalContainer_MetadataAccount";
};
export type UnlockableModalContainer_MetadataAccount$key = {
  readonly " $data"?: UnlockableModalContainer_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableModalContainer_MetadataAccount">;
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
  "name": "UnlockableModalContainer_MetadataAccount",
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
          "concreteType": "UnlockableWinnerExpress",
          "kind": "LinkedField",
          "name": "unlockableWinners",
          "plural": true,
          "selections": [
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableShareInfoModalContent_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableSeeInfoModalContent_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableDetailsModalContent_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "1ad44c1f2fefc665998093c25d782814";

export default node;
