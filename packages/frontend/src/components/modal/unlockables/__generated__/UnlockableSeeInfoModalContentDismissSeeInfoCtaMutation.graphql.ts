/**
 * @generated SignedSource<<6ec087ee18d46ec970b4694690047508>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DismissUnlockableWinnerCreatorSeeInfoCtaInput = {
  unlockableId: string;
  unlockableWinnerUserId: string;
};
export type UnlockableWinnerUserEmailInput = {
  viewerId?: string | null;
};
export type UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation$variables = {
  input: DismissUnlockableWinnerCreatorSeeInfoCtaInput;
  unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput;
};
export type UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation$data = {
  readonly dismissUnlockableWinnerCreatorSeeInfoCta: {
    readonly unlockableWinner: {
      readonly " $fragmentSpreads": FragmentRefs<"useUnlockableCtaType_UnlockableWinnerExpress">;
    };
  };
};
export type UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation = {
  response: UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation$data;
  variables: UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation$variables;
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
    "name": "UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "dismissUnlockableWinnerCreatorSeeInfoCta",
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
    "name": "UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "UpdateUnlockableWinnerResponse",
        "kind": "LinkedField",
        "name": "dismissUnlockableWinnerCreatorSeeInfoCta",
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
    "cacheID": "e4c06d018ce7c70771d28e0c085f4fab",
    "id": null,
    "metadata": {},
    "name": "UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation",
    "operationKind": "mutation",
    "text": "mutation UnlockableSeeInfoModalContentDismissSeeInfoCtaMutation(\n  $input: DismissUnlockableWinnerCreatorSeeInfoCtaInput!\n  $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!\n) {\n  dismissUnlockableWinnerCreatorSeeInfoCta(input: $input) {\n    unlockableWinner {\n      ...useUnlockableCtaType_UnlockableWinnerExpress\n      id\n    }\n  }\n}\n\nfragment useUnlockableCtaType_UnlockableWinnerExpress on UnlockableWinnerExpress {\n  hasBuyerDismissedShareInfoCta\n  hasCreatorDismissedSeeInfoCta\n  userEmail(input: $unlockableWinnerUserEmailInput)\n  userId\n}\n"
  }
};
})();

(node as any).hash = "97fff0fa399ce0f24321c8d6ebd9c134";

export default node;
