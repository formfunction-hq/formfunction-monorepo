/**
 * @generated SignedSource<<cf518c2084f890cf503561a01a0ec018>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ForSlug: {
    readonly campaign: {
      readonly galleryAssets: ReadonlyArray<{
        readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_AssetExpress">;
      }> | null;
      readonly logoAsset: {
        readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
      } | null;
      readonly socialLinks: {
        readonly discord: string | null;
        readonly instagram: string | null;
        readonly twitter: string | null;
        readonly website: string | null;
      } | null;
      readonly tagline: string;
      readonly title: string;
      readonly youtubeVideoHref: string | null;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignArtistPillButtons_CampaignV2">;
    } | null;
  };
  readonly " $fragmentType": "CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse";
};
export type CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignHeroForCampaignsNamespace_CampaignsNamespaceQueryResponse",
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
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "CampaignHeroAssets_AssetExpress"
                }
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
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "AssetForAssetExpress_AssetExpress"
                }
              ],
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignArtistPillButtons_CampaignV2"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};

(node as any).hash = "1ae9b03acb63fef46b9156c502feac97";

export default node;
