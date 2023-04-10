/**
 * @generated SignedSource<<877237d5f60b3edefaf607a494247458>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignForSlugInput = {
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
};
export type ProfileCampaignCardQuery$variables = {
  input: CampaignForSlugInput;
};
export type ProfileCampaignCardQuery$data = {
  readonly campaignForSlug: {
    readonly campaign: {
      readonly creator: {
        readonly username: string;
        readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
      };
      readonly description: string;
      readonly heroAssets: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
      }>;
      readonly title: string;
      readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardGoal_CampaignExpress">;
    } | null;
  };
};
export type ProfileCampaignCardQuery = {
  response: ProfileCampaignCardQuery$data;
  variables: ProfileCampaignCardQuery$variables;
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
  "name": "username",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "title",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "currentAmount",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileCampaignCardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CampaignForSlugResponse",
        "kind": "LinkedField",
        "name": "campaignForSlug",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CampaignExpress",
            "kind": "LinkedField",
            "name": "campaign",
            "plural": false,
            "selections": [
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
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "ArtistPillButtonForUserExpress_UserExpress"
                  }
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AssetExpress",
                "kind": "LinkedField",
                "name": "heroAssets",
                "plural": true,
                "selections": [
                  {
                    "args": null,
                    "kind": "FragmentSpread",
                    "name": "AssetForAssetExpress_AssetExpress"
                  }
                ],
                "storageKey": null
              },
              (v4/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ProfileCampaignCardGoal_CampaignExpress"
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
    "name": "ProfileCampaignCardQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CampaignForSlugResponse",
        "kind": "LinkedField",
        "name": "campaignForSlug",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "CampaignExpress",
            "kind": "LinkedField",
            "name": "campaign",
            "plural": false,
            "selections": [
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
                      (v5/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "AssetExpress",
                "kind": "LinkedField",
                "name": "heroAssets",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "contentType",
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssetDarkModeInfo",
                    "kind": "LinkedField",
                    "name": "darkModeInfo",
                    "plural": false,
                    "selections": [
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "videoPlaybackId",
                    "storageKey": null
                  },
                  (v5/*: any*/)
                ],
                "storageKey": null
              },
              (v4/*: any*/),
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
                      (v7/*: any*/),
                      (v8/*: any*/),
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
                            "name": "shortSymbol",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "symbol",
                            "storageKey": null
                          },
                          (v5/*: any*/)
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
                      (v7/*: any*/),
                      (v8/*: any*/)
                    ],
                    "type": "CampaignSaleCountGoal",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              },
              (v5/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "f7cb1c37dab0f922d6b253574fb7b4e7",
    "id": null,
    "metadata": {},
    "name": "ProfileCampaignCardQuery",
    "operationKind": "query",
    "text": "query ProfileCampaignCardQuery(\n  $input: CampaignForSlugInput!\n) {\n  campaignForSlug(input: $input) {\n    campaign {\n      creator {\n        username\n        ...ArtistPillButtonForUserExpress_UserExpress\n        id\n      }\n      description\n      heroAssets {\n        ...AssetForAssetExpress_AssetExpress\n        id\n      }\n      title\n      ...ProfileCampaignCardGoal_CampaignExpress\n      id\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment ProfileCampaignCardGoal_CampaignExpress on CampaignExpress {\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n\nfragment ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment ProfileCampaignCardSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n"
  }
};
})();

(node as any).hash = "6d789d33bf316dc0ccfe949e2013701f";

export default node;
