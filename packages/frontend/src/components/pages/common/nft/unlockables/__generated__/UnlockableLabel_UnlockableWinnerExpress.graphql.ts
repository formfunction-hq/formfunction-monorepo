/**
 * @generated SignedSource<<a6bc198f9117d16d1078e5e86b2264ec>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableLabel_UnlockableWinnerExpress$data = {
  readonly hasBuyerDismissedShareInfoCta: boolean;
  readonly userEmail: string | null;
  readonly userId: string;
  readonly " $fragmentType": "UnlockableLabel_UnlockableWinnerExpress";
};
export type UnlockableLabel_UnlockableWinnerExpress$key = {
  readonly " $data"?: UnlockableLabel_UnlockableWinnerExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableLabel_UnlockableWinnerExpress">;
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
  "name": "UnlockableLabel_UnlockableWinnerExpress",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "userId",
      "storageKey": null
    }
  ],
  "type": "UnlockableWinnerExpress",
  "abstractKey": null
};

(node as any).hash = "4c5410fd7c25cf6ebde8d6a25b4d425c";

export default node;
