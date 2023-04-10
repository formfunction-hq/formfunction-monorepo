/**
 * @generated SignedSource<<9a04390256371f2d5af1cdc5724039cd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHoldersForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
  fundingTierIds?: ReadonlyArray<string> | null;
  viewerId?: string | null;
};
export type CreateAirdropsForCampaignModalQuery$variables = {
  input: CampaignHoldersForSlugInput;
};
export type CreateAirdropsForCampaignModalQuery$data = {
  readonly CampaignsNamespace: {
    readonly campaignHoldersForSlug: {
      readonly holdersByFundingTier: ReadonlyArray<{
        readonly fundingTier: {
          readonly __typename: string;
          readonly id?: string;
          readonly " $fragmentSpreads": FragmentRefs<"GenericFundingTiersInput_CampaignFundingTierStandard">;
        };
        readonly holders: ReadonlyArray<{
          readonly user: {
            readonly id: string;
          };
        }>;
      }> | null;
    };
  };
};
export type CreateAirdropsForCampaignModalQuery = {
  response: CreateAirdropsForCampaignModalQuery$data;
  variables: CreateAirdropsForCampaignModalQuery$variables;
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
v3 = [
  (v2/*: any*/)
],
v4 = {
  "kind": "InlineFragment",
  "selections": (v3/*: any*/),
  "type": "ICampaignFundingTier",
  "abstractKey": "__isICampaignFundingTier"
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "concreteType": "Holder",
  "kind": "LinkedField",
  "name": "holders",
  "plural": true,
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": (v3/*: any*/),
      "storageKey": null
    }
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAirdropsForCampaignModalQuery",
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
            "args": null,
            "concreteType": "CampaignHoldersForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignHoldersForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "CampaignFundingTierHolders",
                "kind": "LinkedField",
                "name": "holdersByFundingTier",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "fundingTier",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "args": null,
                            "kind": "FragmentSpread",
                            "name": "GenericFundingTiersInput_CampaignFundingTierStandard"
                          }
                        ],
                        "type": "CampaignFundingTierStandard",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
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
    "name": "CreateAirdropsForCampaignModalQuery",
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
            "args": null,
            "concreteType": "CampaignHoldersForSlugResponse",
            "kind": "LinkedField",
            "name": "campaignHoldersForSlug",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": (v1/*: any*/),
                "concreteType": "CampaignFundingTierHolders",
                "kind": "LinkedField",
                "name": "holdersByFundingTier",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "fundingTier",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v5/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          (v2/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          }
                        ],
                        "type": "CampaignFundingTierStandard",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/)
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
    "cacheID": "84274882e1279896c0f827cb558dd84c",
    "id": null,
    "metadata": {},
    "name": "CreateAirdropsForCampaignModalQuery",
    "operationKind": "query",
    "text": "query CreateAirdropsForCampaignModalQuery(\n  $input: CampaignHoldersForSlugInput!\n) {\n  CampaignsNamespace {\n    campaignHoldersForSlug {\n      holdersByFundingTier(input: $input) {\n        fundingTier {\n          ... on ICampaignFundingTier {\n            __isICampaignFundingTier: __typename\n            id\n          }\n          __typename\n          ... on CampaignFundingTierStandard {\n            ...GenericFundingTiersInput_CampaignFundingTierStandard\n            id\n          }\n        }\n        holders {\n          user {\n            id\n          }\n        }\n      }\n    }\n  }\n}\n\nfragment GenericFundingTiersInput_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  id\n  title\n}\n"
  }
};
})();

(node as any).hash = "e5d8590e2eecf3834a5dc2b444be8451";

export default node;
