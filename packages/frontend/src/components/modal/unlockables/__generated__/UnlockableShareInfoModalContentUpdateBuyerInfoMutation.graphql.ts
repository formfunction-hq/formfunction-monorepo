/**
 * @generated SignedSource<<9dcfe039f3498bf03154ebb370318bc6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdateUnlockableWinnerBuyerInfoInput = {
  unlockableId: string;
  userEmail: string;
};
export type UnlockableWinnerUserEmailInput = {
  viewerId?: string | null;
};
export type UnlockableShareInfoModalContentUpdateBuyerInfoMutation$variables = {
  input: UpdateUnlockableWinnerBuyerInfoInput;
  unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput;
};
export type UnlockableShareInfoModalContentUpdateBuyerInfoMutation$data = {
  readonly updateUnlockableWinnerBuyerInfo: {
    readonly unlockableWinner: {
      readonly " $fragmentSpreads": FragmentRefs<"useUnlockableCtaType_UnlockableWinnerExpress">;
    };
  };
};
export type UnlockableShareInfoModalContentUpdateBuyerInfoMutation = {
  response: UnlockableShareInfoModalContentUpdateBuyerInfoMutation$data;
  variables: UnlockableShareInfoModalContentUpdateBuyerInfoMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "unlockableWinnerUserEmailInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "UnlockableShareInfoModalContentUpdateBuyerInfoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "updateUnlockableWinnerBuyerInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UnlockableWinnerExpress",
            "kind": "LinkedField",
            "name": "unlockableWinner",
            "plural": false,
            "selections": [
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
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UnlockableShareInfoModalContentUpdateBuyerInfoMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "updateUnlockableWinnerBuyerInfo",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UnlockableWinnerExpress",
            "kind": "LinkedField",
            "name": "unlockableWinner",
            "plural": false,
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
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "030a2476d775c33f4af2e79c1c9d1a4a",
    "id": null,
    "metadata": {},
    "name": "UnlockableShareInfoModalContentUpdateBuyerInfoMutation",
    "operationKind": "mutation",
    "text": "mutation UnlockableShareInfoModalContentUpdateBuyerInfoMutation(\n  $input: UpdateUnlockableWinnerBuyerInfoInput!\n  $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!\n) {\n  updateUnlockableWinnerBuyerInfo(input: $input) {\n    unlockableWinner {\n      ...useUnlockableCtaType_UnlockableWinnerExpress\n      id\n    }\n  }\n}\n\nfragment useUnlockableCtaType_UnlockableWinnerExpress on UnlockableWinnerExpress {\n  hasBuyerDismissedShareInfoCta\n  hasCreatorDismissedSeeInfoCta\n  userEmail(input: $unlockableWinnerUserEmailInput)\n  userId\n}\n"
  }
};
})();

(node as any).hash = "5643bac0f1d79c647ac7c09f9546c62a";

export default node;
