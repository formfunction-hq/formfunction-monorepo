/**
 * @generated SignedSource<<cfe38ac0ed8444bf6277165134209592>>
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
export type useCampaignPageCampaignQuery$variables = {
  input: CampaignForSlugInput;
};
export type useCampaignPageCampaignQuery$data = {
  readonly campaignForSlug: {
    readonly campaign: {
      readonly " $fragmentSpreads": FragmentRefs<"CampaignAbout_CampaignExpress" | "CampaignHero_CampaignExpress">;
    } | null;
  };
};
export type useCampaignPageCampaignQuery = {
  response: useCampaignPageCampaignQuery$data;
  variables: useCampaignPageCampaignQuery$variables;
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
  "name": "currentAmount",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v6 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "contentType",
    "storageKey": null
  },
  (v5/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AssetDarkModeInfo",
    "kind": "LinkedField",
    "name": "darkModeInfo",
    "plural": false,
    "selections": [
      (v5/*: any*/)
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
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCampaignPageCampaignQuery",
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
                "args": null,
                "kind": "FragmentSpread",
                "name": "CampaignAbout_CampaignExpress"
              },
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CampaignHero_CampaignExpress"
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
    "name": "useCampaignPageCampaignQuery",
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
                "kind": "ScalarField",
                "name": "about",
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
                  },
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "emojiMarker",
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
                      (v4/*: any*/),
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
                      (v3/*: any*/),
                      (v4/*: any*/)
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
                "kind": "ScalarField",
                "name": "description",
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
                "concreteType": "AssetExpress",
                "kind": "LinkedField",
                "name": "logoAsset",
                "plural": false,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "CampaignSocialLinks",
                "kind": "LinkedField",
                "name": "socialLinks",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "discord",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "instagram",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "twitter",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "website",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AssetExpress",
                "kind": "LinkedField",
                "name": "heroAssets",
                "plural": true,
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "4b4bb38d15a6a1f2e0e32d99c2287dce",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageCampaignQuery",
    "operationKind": "query",
    "text": "query useCampaignPageCampaignQuery(\n  $input: CampaignForSlugInput!\n) {\n  campaignForSlug(input: $input) {\n    campaign {\n      ...CampaignAbout_CampaignExpress\n      ...CampaignHero_CampaignExpress\n      id\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment CampaignAbout_CampaignExpress on CampaignExpress {\n  about\n}\n\nfragment CampaignHeroAssets_AssetExpress on AssetExpress {\n  ...AssetForAssetExpress_AssetExpress\n}\n\nfragment CampaignHeroAssets_CampaignExpress on CampaignExpress {\n  heroAssets {\n    ...CampaignHeroAssets_AssetExpress\n    id\n  }\n}\n\nfragment CampaignHero_CampaignExpress on CampaignExpress {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  ...CampaignProgressTowardsGoal_CampaignExpress\n  description\n  title\n  logoAsset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  socialLinks {\n    discord\n    instagram\n    twitter\n    website\n  }\n  ...CampaignHeroAssets_CampaignExpress\n}\n\nfragment CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal on CampaignMonetaryGoal {\n  goalAmount\n  currentAmount\n  currency {\n    decimals\n    shortSymbol\n    symbol\n    id\n  }\n}\n\nfragment CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal on CampaignSaleCountGoal {\n  goalAmount\n  currentAmount\n}\n\nfragment CampaignProgressTowardsGoal_CampaignExpress on CampaignExpress {\n  emojiMarker\n  goal {\n    __typename\n    ... on CampaignMonetaryGoal {\n      ...CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal\n    }\n    ... on CampaignSaleCountGoal {\n      ...CampaignProgressForCampaignSaleCountGoal_CampaignSaleCountGoal\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "e54931b3b2d5c5701618dc81f9d36490";

export default node;
