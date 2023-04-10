/**
 * @generated SignedSource<<da5072ea4808ed69c1284a554ff56ab2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableSeeInfoModalContent_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly unlockable: {
    readonly asset: {
      readonly contentType: string;
      readonly path: string;
    };
    readonly id: string;
    readonly unlockableWinners: ReadonlyArray<{
      readonly hasCreatorDismissedSeeInfoCta: boolean;
      readonly user: {
        readonly id: string;
        readonly username: string;
      };
      readonly userEmail: string | null;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
  readonly " $fragmentType": "UnlockableSeeInfoModalContent_MetadataAccount";
};
export type UnlockableSeeInfoModalContent_MetadataAccount$key = {
  readonly " $data"?: UnlockableSeeInfoModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableSeeInfoModalContent_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "unlockableWinnerUserEmailInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableSeeInfoModalContent_MetadataAccount",
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
      "concreteType": "UnlockableExpress",
      "kind": "LinkedField",
      "name": "unlockable",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "hasCreatorDismissedSeeInfoCta",
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
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
                (v0/*: any*/),
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
})();

(node as any).hash = "553021245920a270cc0af728a68db2ca";

export default node;
