/**
 * @generated SignedSource<<c52ed1da1814d419bba9e13d48568ec9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignForNftInput = {
  mint: string;
};
export type useNftPageCampaignQuery$variables = {
  input: CampaignForNftInput;
};
export type useNftPageCampaignQuery$data = {
  readonly CampaignsNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"CampaignBenefitsSection_CampaignsNamespaceQueryResponse" | "CampaignInfoCard_CampaignsNamespaceQueryResponse" | "useNftPageLoadCampaign_CampaignsNamespaceQueryResponse">;
  };
};
export type useNftPageCampaignQuery = {
  response: useNftPageCampaignQuery$data;
  variables: useNftPageCampaignQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "name",
    "storageKey": null
  },
  (v1/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNftPageCampaignQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
        "selections": [
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignInfoCard_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "useNftPageLoadCampaign_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignBenefitsSection_CampaignsNamespaceQueryResponse"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useNftPageCampaignQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "CampaignsNamespaceQueryResponse",
        "kind": "LinkedField",
        "name": "CampaignsNamespace",
        "plural": false,
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
                    "concreteType": "AssetExpress",
                    "kind": "LinkedField",
                    "name": "previewAsset",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "downloadUrl",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "creator",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      },
                      (v1/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "status",
                    "storageKey": null
                  },
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "goal",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
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
                            "selections": (v2/*: any*/),
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
                "selections": (v2/*: any*/),
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
    "cacheID": "7419700eb60c90def72b24d2c5a4cbca",
    "id": null,
    "metadata": {},
    "name": "useNftPageCampaignQuery",
    "operationKind": "query",
    "text": "query useNftPageCampaignQuery(\n  $input: CampaignForNftInput!\n) {\n  CampaignsNamespace {\n    ...CampaignInfoCard_CampaignsNamespaceQueryResponse\n    ...useNftPageLoadCampaign_CampaignsNamespaceQueryResponse\n    ...CampaignBenefitsSection_CampaignsNamespaceQueryResponse\n  }\n}\n\nfragment CampaignBenefitsSection_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignForNft(input: $input) {\n    campaign {\n      slug\n      creator {\n        username\n        id\n      }\n      id\n    }\n  }\n}\n\nfragment CampaignInfoCard_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignForNft(input: $input) {\n    campaign {\n      previewAsset {\n        downloadUrl\n        id\n      }\n      title\n      ...useCampaignLinkForCampaignV2_CampaignV2\n      id\n    }\n  }\n}\n\nfragment useCampaignLinkForCampaignV2_CampaignV2 on CampaignV2 {\n  creator {\n    username\n    id\n  }\n  slug\n  status\n}\n\nfragment useNftPageLoadCampaign_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignForNft(input: $input) {\n    campaign {\n      goal {\n        __typename\n        ... on CampaignMonetaryGoal {\n          currency {\n            name\n            id\n          }\n        }\n      }\n      id\n    }\n    campaignGoalCurrency {\n      name\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "4cb4106ecb90b6250a53b13ae23d5d99";

export default node;
