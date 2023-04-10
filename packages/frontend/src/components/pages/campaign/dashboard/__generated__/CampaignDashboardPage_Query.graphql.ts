/**
 * @generated SignedSource<<34e0589867d7fe7d80375492dd28f3e5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
export type CampaignV2ForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type CampaignDashboardPage_Query$variables = {
  input: CampaignV2ForSlugInput;
};
export type CampaignDashboardPage_Query$data = {
  readonly CampaignsNamespace: {
    readonly campaignV2ForSlug: {
      readonly campaign: {
        readonly creator: {
          readonly id: string;
        };
        readonly id: string;
        readonly status: CampaignStatusExpress_enum;
        readonly teamMembers: ReadonlyArray<{
          readonly member: {
            readonly id: string;
          };
        }> | null;
        readonly " $fragmentSpreads": FragmentRefs<"CampaignDashboardPageContent_CampaignV2">;
      } | null;
    };
  };
};
export type CampaignDashboardPage_Query = {
  response: CampaignDashboardPage_Query$data;
  variables: CampaignDashboardPage_Query$variables;
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
  "name": "status",
  "storageKey": null
},
v4 = [
  (v2/*: any*/)
],
v5 = {
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
      "selections": (v4/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v7 = [
  (v2/*: any*/),
  (v6/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CampaignDashboardPage_Query",
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "creator",
                    "plural": false,
                    "selections": (v4/*: any*/),
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "CampaignDashboardPageContent_CampaignV2"
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
    "name": "CampaignDashboardPage_Query",
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "creator",
                    "plural": false,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "username",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/),
                  (v6/*: any*/),
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
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "fundingTiers",
                    "plural": true,
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
                        "selections": (v7/*: any*/),
                        "type": "ICampaignFundingTier",
                        "abstractKey": "__isICampaignFundingTier"
                      },
                      {
                        "kind": "InlineFragment",
                        "selections": (v7/*: any*/),
                        "type": "CampaignFundingTierStandard",
                        "abstractKey": null
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
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "056bcef58b66eacf253dde7ab6a39832",
    "id": null,
    "metadata": {},
    "name": "CampaignDashboardPage_Query",
    "operationKind": "query",
    "text": "query CampaignDashboardPage_Query(\n  $input: CampaignV2ForSlugInput!\n) {\n  CampaignsNamespace {\n    campaignV2ForSlug(input: $input) {\n      campaign {\n        id\n        status\n        creator {\n          id\n        }\n        teamMembers {\n          member {\n            id\n          }\n        }\n        ...CampaignDashboardPageContent_CampaignV2\n      }\n    }\n  }\n}\n\nfragment CampaignDashboardCommunityUpdatesTab_CampaignV2 on CampaignV2 {\n  title\n  ...CreateAirdropsForCampaignModal_CampaignV2\n  ...CreatePostBaseForCampaignModal_CampaignV2\n  ...CreatePollForCampaignModal_CampaignV2\n}\n\nfragment CampaignDashboardHoldersTab_CampaignV2 on CampaignV2 {\n  title\n  slug\n  creator {\n    username\n    id\n  }\n  fundingTiers {\n    __typename\n    ... on ICampaignFundingTier {\n      __isICampaignFundingTier: __typename\n      id\n      title\n    }\n    ...GenericFundingTiersInput_CampaignFundingTierStandard\n    ... on CampaignFundingTierStandard {\n      id\n    }\n  }\n}\n\nfragment CampaignDashboardPageContent_CampaignV2 on CampaignV2 {\n  ...CampaignDashboardSidebar_CampaignV2\n  ...CampaignDashboardSettingsTab_CampaignV2\n  ...CampaignDashboardHoldersTab_CampaignV2\n  ...CampaignDashboardCommunityUpdatesTab_CampaignV2\n}\n\nfragment CampaignDashboardSettingsTab_CampaignV2 on CampaignV2 {\n  id\n  creator {\n    id\n  }\n  status\n  title\n}\n\nfragment CampaignDashboardSidebar_CampaignV2 on CampaignV2 {\n  ...useCanViewerEditCampaign_CampaignV2\n}\n\nfragment CreateAirdropsForCampaignModal_CampaignV2 on CampaignV2 {\n  slug\n  creator {\n    id\n  }\n}\n\nfragment CreatePollForCampaignModal_CampaignV2 on CampaignV2 {\n  ...PostVisibilityInput_CampaignV2\n}\n\nfragment CreatePostBaseForCampaignModal_CampaignV2 on CampaignV2 {\n  ...PostVisibilityInput_CampaignV2\n}\n\nfragment GenericFundingTiersInput_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  title\n}\n\nfragment PostVisibilityInput_CampaignV2 on CampaignV2 {\n  fundingTiers {\n    __typename\n    ... on ICampaignFundingTier {\n      __isICampaignFundingTier: __typename\n      id\n    }\n    ... on CampaignFundingTierStandard {\n      title\n      ...GenericFundingTiersInput_CampaignFundingTierStandard\n      id\n    }\n  }\n}\n\nfragment useCanViewerEditCampaign_CampaignV2 on CampaignV2 {\n  creator {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "05c0ee89f172937fa73fa084e0759594";

export default node;
