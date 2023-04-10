/**
 * @generated SignedSource<<9b6b664daa43e382b71f4f1742a8b8b7>>
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
export type useCampaignPageCampaignV2Query$variables = {
  input: CampaignV2ForSlugInput;
};
export type useCampaignPageCampaignV2Query$data = {
  readonly CampaignsNamespace: {
    readonly " $fragmentSpreads": FragmentRefs<"CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse" | "CampaignCommunityTabButton_CampaignsNamespaceQueryResponse" | "CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse" | "CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse" | "CampaignPage_CampaignsNamespaceQueryResponse" | "CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse">;
  };
};
export type useCampaignPageCampaignV2Query = {
  response: useCampaignPageCampaignV2Query$data;
  variables: useCampaignPageCampaignV2Query$variables;
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
  "name": "downloadUrl",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "contentType",
    "storageKey": null
  },
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "AssetDarkModeInfo",
    "kind": "LinkedField",
    "name": "darkModeInfo",
    "plural": false,
    "selections": [
      (v1/*: any*/)
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
],
v4 = [
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
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useCampaignPageCampaignV2Query",
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
            "name": "CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignCommunityTabButton_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignPage_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse"
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
    "name": "useCampaignPageCampaignV2Query",
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
                    "alias": null,
                    "args": null,
                    "concreteType": "AssetExpress",
                    "kind": "LinkedField",
                    "name": "galleryAssets",
                    "plural": true,
                    "selections": (v3/*: any*/),
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
                    "selections": (v3/*: any*/),
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
                    "kind": "ScalarField",
                    "name": "youtubeVideoHref",
                    "storageKey": null
                  },
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
                        "selections": (v4/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CampaignAbout",
                    "kind": "LinkedField",
                    "name": "about",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "campaign",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "contactInfo",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "creator",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "risksAndChallenges",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "timeline",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isViewerHolder",
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
                    "kind": "ScalarField",
                    "name": "colorScheme",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "slug",
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
    "cacheID": "01d885f7ca95309a37bb5c95cba00098",
    "id": null,
    "metadata": {},
    "name": "useCampaignPageCampaignV2Query",
    "operationKind": "query",
    "text": "query useCampaignPageCampaignV2Query(\n  $input: CampaignV2ForSlugInput!\n) {\n  CampaignsNamespace {\n    ...CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse\n    ...CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse\n    ...CampaignCommunityTabButton_CampaignsNamespaceQueryResponse\n    ...CampaignPage_CampaignsNamespaceQueryResponse\n    ...CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse\n    ...CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      about {\n        campaign\n        contactInfo\n        creator\n        risksAndChallenges\n        timeline\n      }\n      id\n    }\n  }\n}\n\nfragment CampaignArtistPillButtons_CampaignV2 on CampaignV2 {\n  creator {\n    ...ArtistPillButtonForUserExpress_UserExpress\n    id\n  }\n  teamMembers {\n    member {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n  }\n}\n\nfragment CampaignCommunityTabButton_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      ...useCanViewerViewCommunityTab_CampaignV2\n      id\n    }\n  }\n}\n\nfragment CampaignCommunityTabContent_CampaignV2 on CampaignV2 {\n  slug\n  creator {\n    username\n    id\n  }\n  ...useIsViewerCampaignCreatorOrTeamMember_CampaignV2\n}\n\nfragment CampaignFundingTierPreviewsForCampaignsNamespaceCampaign_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      creator {\n        id\n      }\n      status\n      id\n    }\n  }\n}\n\nfragment CampaignHeaderGoToDashboardBanner_CampaignV2 on CampaignV2 {\n  slug\n  creator {\n    username\n    id\n  }\n  ...useIsViewerCampaignCreatorOrTeamMember_CampaignV2\n}\n\nfragment CampaignHeroAssets_AssetExpress on AssetExpress {\n  ...AssetForAssetExpress_AssetExpress\n}\n\nfragment CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      galleryAssets {\n        ...CampaignHeroAssets_AssetExpress\n        id\n      }\n      tagline\n      title\n      logoAsset {\n        ...AssetForAssetExpress_AssetExpress\n        id\n      }\n      socialLinks {\n        discord\n        instagram\n        twitter\n        website\n      }\n      youtubeVideoHref\n      ...CampaignArtistPillButtons_CampaignV2\n      id\n    }\n  }\n}\n\nfragment CampaignPageContent_CampaignV2 on CampaignV2 {\n  ...useCampaignTab_CampaignV2\n  ...CampaignCommunityTabContent_CampaignV2\n  ...CampaignHeaderGoToDashboardBanner_CampaignV2\n}\n\nfragment CampaignPage_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      status\n      colorScheme\n      ...CampaignPageContent_CampaignV2\n      ...useCanViewerEditCampaign_CampaignV2\n      id\n    }\n  }\n}\n\nfragment CampaignSubmissionReviewActionsBanner_CampaignsNamespaceQueryResponse on CampaignsNamespaceQueryResponse {\n  campaignV2ForSlug(input: $input) {\n    campaign {\n      id\n      status\n    }\n  }\n}\n\nfragment useCampaignTab_CampaignV2 on CampaignV2 {\n  ...useCanViewerViewCommunityTab_CampaignV2\n}\n\nfragment useCanViewerEditCampaign_CampaignV2 on CampaignV2 {\n  creator {\n    id\n  }\n}\n\nfragment useCanViewerViewCommunityTab_CampaignV2 on CampaignV2 {\n  creator {\n    id\n  }\n  teamMembers {\n    member {\n      id\n    }\n  }\n  isViewerHolder\n}\n\nfragment useIsViewerCampaignCreatorOrTeamMember_CampaignV2 on CampaignV2 {\n  creator {\n    id\n  }\n  teamMembers {\n    member {\n      id\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "959b471a878237ee5fca224bae192eb8";

export default node;
