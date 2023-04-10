/**
 * @generated SignedSource<<1b2dbc222d06f31421687d5f9fde0069>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUnlockableCtaType_UnlockableWinnerExpress$data = {
  readonly hasBuyerDismissedShareInfoCta: boolean;
  readonly hasCreatorDismissedSeeInfoCta: boolean;
  readonly userEmail: string | null;
  readonly userId: string;
  readonly " $fragmentType": "useUnlockableCtaType_UnlockableWinnerExpress";
};
export type useUnlockableCtaType_UnlockableWinnerExpress$key = {
  readonly " $data"?: useUnlockableCtaType_UnlockableWinnerExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUnlockableCtaType_UnlockableWinnerExpress">;
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
  "name": "useUnlockableCtaType_UnlockableWinnerExpress",
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
      "kind": "ScalarField",
      "name": "userId",
      "storageKey": null
    }
  ],
  "type": "UnlockableWinnerExpress",
  "abstractKey": null
};

(node as any).hash = "8ba59f8a623fc39ce8978ba0d2a86858";

export default node;
