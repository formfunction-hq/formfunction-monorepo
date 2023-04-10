/**
 * @generated SignedSource<<4cfc2a5322e5cec1c1e0610e7de0be93>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useNftPageLoadCampaign_CampaignsNamespaceQueryResponse$data = {
  readonly campaignForNft: {
    readonly campaign: {
      readonly goal: {
        readonly currency?: {
          readonly name: CurrencyNameExpress_enum;
        };
      };
    } | null;
    readonly campaignGoalCurrency: {
      readonly name: CurrencyNameExpress_enum;
    } | null;
  };
  readonly " $fragmentType": "useNftPageLoadCampaign_CampaignsNamespaceQueryResponse";
};
export type useNftPageLoadCampaign_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: useNftPageLoadCampaign_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"useNftPageLoadCampaign_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "useNftPageLoadCampaign_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "CampaignForNftResponse",
      "kind": "LinkedField",
      "name": "campaignForNft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "CampaignV2",
          "kind": "LinkedField",
          "name": "campaign",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": null,
              "kind": "LinkedField",
              "name": "goal",
              "plural": false,
              "selections": [
                {
                  "kind": "InlineFragment",
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "CurrencyExpress",
                      "kind": "LinkedField",
                      "name": "currency",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "type": "CampaignMonetaryGoal",
                  "abstractKey": null
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
          "concreteType": "CurrencyExpress",
          "kind": "LinkedField",
          "name": "campaignGoalCurrency",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};
})();

(node as any).hash = "43b1d6bbe4c762f37df1f067e855185d";

export default node;
