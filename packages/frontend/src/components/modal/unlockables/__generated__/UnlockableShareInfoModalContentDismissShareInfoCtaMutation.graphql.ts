/**
 * @generated SignedSource<<6f59756aa795906a44d56fde12064517>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DismissUnlockableWinnerBuyerShareInfoCtaInput = {
  unlockableId: string;
};
export type UnlockableWinnerUserEmailInput = {
  viewerId?: string | null;
};
export type UnlockableShareInfoModalContentDismissShareInfoCtaMutation$variables = {
  input: DismissUnlockableWinnerBuyerShareInfoCtaInput;
  unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput;
};
export type UnlockableShareInfoModalContentDismissShareInfoCtaMutation$data = {
  readonly dismissUnlockableWinnerBuyerShareInfoCta: {
    readonly unlockableWinner: {
      readonly " $fragmentSpreads": FragmentRefs<"useUnlockableCtaType_UnlockableWinnerExpress">;
    };
  };
};
export type UnlockableShareInfoModalContentDismissShareInfoCtaMutation = {
  response: UnlockableShareInfoModalContentDismissShareInfoCtaMutation$data;
  variables: UnlockableShareInfoModalContentDismissShareInfoCtaMutation$variables;
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
    "name": "UnlockableShareInfoModalContentDismissShareInfoCtaMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "dismissUnlockableWinnerBuyerShareInfoCta",
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
    "name": "UnlockableShareInfoModalContentDismissShareInfoCtaMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "dismissUnlockableWinnerBuyerShareInfoCta",
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
    "cacheID": "6690261f9d0f74b1409f854858de059e",
    "id": null,
    "metadata": {},
    "name": "UnlockableShareInfoModalContentDismissShareInfoCtaMutation",
    "operationKind": "mutation",
    "text": "mutation UnlockableShareInfoModalContentDismissShareInfoCtaMutation(\n  $input: DismissUnlockableWinnerBuyerShareInfoCtaInput!\n  $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!\n) {\n  dismissUnlockableWinnerBuyerShareInfoCta(input: $input) {\n    unlockableWinner {\n      ...useUnlockableCtaType_UnlockableWinnerExpress\n      id\n    }\n  }\n}\n\nfragment useUnlockableCtaType_UnlockableWinnerExpress on UnlockableWinnerExpress {\n  hasBuyerDismissedShareInfoCta\n  hasCreatorDismissedSeeInfoCta\n  userEmail(input: $unlockableWinnerUserEmailInput)\n  userId\n}\n"
  }
};
})();

(node as any).hash = "7fb67fb2e3e3a5e51725f5048b4d32f1";

export default node;
