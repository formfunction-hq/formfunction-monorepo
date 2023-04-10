/**
 * @generated SignedSource<<edffa075cdac9ff58fb80c3e1f8571ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableDetailsModalCtaLabel_MetadataAccount$data = {
  readonly nft: {
    readonly Creator: {
      readonly id: string;
      readonly username: string;
    } | null;
  };
  readonly unlockable: {
    readonly unlockableWinners: ReadonlyArray<{
      readonly hasBuyerDismissedShareInfoCta: boolean;
      readonly hasCreatorDismissedSeeInfoCta: boolean;
      readonly user: {
        readonly id: string;
        readonly username: string;
      };
      readonly userEmail: string | null;
    }> | null;
  } | null;
  readonly " $fragmentSpreads": FragmentRefs<"useNftKind_MetadataAccount">;
  readonly " $fragmentType": "UnlockableDetailsModalCtaLabel_MetadataAccount";
};
export type UnlockableDetailsModalCtaLabel_MetadataAccount$key = {
  readonly " $data"?: UnlockableDetailsModalCtaLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableDetailsModalCtaLabel_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = [
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
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "unlockableWinnerUserEmailInput"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableDetailsModalCtaLabel_MetadataAccount",
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": (v0/*: any*/),
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
              "selections": (v0/*: any*/),
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

(node as any).hash = "992f915abba1ea0468616c7e233d6ec3";

export default node;
