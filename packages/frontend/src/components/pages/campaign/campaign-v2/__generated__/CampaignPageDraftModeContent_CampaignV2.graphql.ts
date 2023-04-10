/**
 * @generated SignedSource<<868e3eb338c8af34b8d93089e254b13d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignColorSchemeExpress_enum = "AliceBlueSinopia" | "AntiFlashWhiteDarkGunmetal" | "BrightGrayMediumBlue" | "CulturedCadmiumGreen" | "GreenishGrayMidnightBlue" | "SeashellMaximumRed" | "%future added value";
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignPageDraftModeContent_CampaignV2$data = {
  readonly colorScheme: CampaignColorSchemeExpress_enum;
  readonly galleryAssets: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_AssetExpress">;
  }> | null;
  readonly id: string;
  readonly status: CampaignStatusExpress_enum;
  readonly tagline: string;
  readonly title: string;
  readonly youtubeVideoHref: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignAboutModal_CampaignV2" | "CampaignArtistPillButtons_CampaignV2" | "CampaignDraftAboutCard_CampaignV2" | "CampaignDraftBiddingInfo_CampaignV2" | "CampaignDraftChecklist_CampaignV2" | "CampaignGalleryModal_CampaignV2" | "CampaignHeaderStatusBanner_CampaignV2" | "FundingTierSectionForCampaignV2_CampaignV2" | "ManageFundingTiersModal_CampaignV2">;
  readonly " $fragmentType": "CampaignPageDraftModeContent_CampaignV2";
};
export type CampaignPageDraftModeContent_CampaignV2$key = {
  readonly " $data"?: CampaignPageDraftModeContent_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignPageDraftModeContent_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignPageDraftModeContent_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
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
      "name": "title",
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
      "name": "status",
      "storageKey": null
    },
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
      "name": "youtubeVideoHref",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageFundingTiersModal_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FundingTierSectionForCampaignV2_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignAboutModal_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignGalleryModal_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDraftAboutCard_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDraftBiddingInfo_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignArtistPillButtons_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignDraftChecklist_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignHeaderStatusBanner_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "4750825eec6032f14924c9c40c7c0ec7";

export default node;
