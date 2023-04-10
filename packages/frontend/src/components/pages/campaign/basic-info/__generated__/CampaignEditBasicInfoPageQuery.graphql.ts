/**
 * @generated SignedSource<<d0b1aa09e2b22b662ed6e85d1fcafd0c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignV2ForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type CampaignEditBasicInfoPageQuery$variables = {
  input: CampaignV2ForSlugInput;
};
export type CampaignEditBasicInfoPageQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignV2ForSlug: {
      readonly campaign: {
        readonly " $fragmentSpreads": FragmentRefs<"CampaignEditBasicInfoPage_CampaignV2">;
      } | null;
    };
  };
};
export type CampaignEditBasicInfoPageQuery = {
  response: CampaignEditBasicInfoPageQuery$data;
  variables: CampaignEditBasicInfoPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignEditBasicInfoPageQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignV2ForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignV2ForSlug",
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignEditBasicInfoPage_CampaignV2"
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
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
    "name": "CampaignEditBasicInfoPageQuery",
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
            "args": (v1/*: any*/),
            "concreteType": "CampaignV2ForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignV2ForSlug",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "colorScheme",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "goalProgressSymbol",
                    "storageKey": null
                  },
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
                          (v3/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CurrencyExpress",
                            "kind": "LinkedField",
                            "name": "currency",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "decimals",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "symbol",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "shortSymbol",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "name",
                                "storageKey": null
                              },
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "mint",
                                "storageKey": null
                              },
                              (v2/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CampaignMonetaryGoal",
                        "abstractKey": null
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v3/*: any*/)
                        ],
                        "type": "CampaignSaleCountGoal",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
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
                      (v2/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "tagline",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignTeamMemberExpress",
                    "kind": "LinkedField",
                    "name": "teamMembers",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "member",
                        "plural": false,
                        "selections": [
                          (v2/*: any*/),
                          (v4/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "PhotoExpress",
                            "kind": "LinkedField",
                            "name": "ProfilePhoto",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "photoUrl",
                                "storageKey": null
                              },
                              (v2/*: any*/)
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
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "title",
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
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "creator",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/)
                    ],
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
      }
    ]
  },
  "params": {
    "cacheID": "c0d5d2281217f3a2cc3d03342b29b652",
    "id": null,
    "metadata": {},
    "name": "CampaignEditBasicInfoPageQuery",
    "operationKind": "query",
    "text": "query CampaignEditBasicInfoPageQuery(\n  $input: CampaignV2ForSlugInput!\n) {\n  CampaignsNamespace {\n    campaignV2ForSlug(input: $input) {\n      campaign {\n        ...CampaignEditBasicInfoPage_CampaignV2\n        id\n      }\n    }\n  }\n}\n\nfragment CampaignEditBasicInfoPage_CampaignV2 on CampaignV2 {\n  id\n  category\n  colorScheme\n  goalProgressSymbol\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      goalAmount\n      currency {\n        ...useGetCurrencyConfigForCurrencyExpress_CurrencyExpress\n        id\n      }\n    }\n    ... on CampaignSaleCountGoal {\n      goalAmount\n    }\n  }\n  previewAsset {\n    downloadUrl\n    id\n  }\n  tagline\n  teamMembers {\n    member {\n      ...useUserSearchBarUserExpress_UserExpress\n      id\n    }\n  }\n  title\n  ...CampaignHeaderStatusBanner_CampaignV2\n}\n\nfragment CampaignHeaderStatusBanner_CampaignV2 on CampaignV2 {\n  slug\n  status\n  creator {\n    username\n    id\n  }\n}\n\nfragment UserSearchBarSelectedItem_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment UserSearchPopoverResult_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment useGetCurrencyConfigForCurrencyExpress_CurrencyExpress on CurrencyExpress {\n  decimals\n  symbol\n  shortSymbol\n  name\n  mint\n}\n\nfragment useUserSearchBarUserExpress_UserExpress on UserExpress {\n  id\n  ...UserSearchBarSelectedItem_UserExpress\n  ...UserSearchPopoverResult_UserExpress\n}\n"
  }
};
})();

(node as any).hash = "68376821aaae2323ac5db608ac4c2000";

export default node;
