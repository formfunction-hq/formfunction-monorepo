/**
 * @generated SignedSource<<1bc15c289db65ec95bad6ed4d336f706>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHero_CampaignExpress$data = {
  readonly creator: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
  };
  readonly description: string;
  readonly logoAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  } | null;
  readonly socialLinks: {
    readonly discord: string | null;
    readonly instagram: string | null;
    readonly twitter: string | null;
    readonly website: string | null;
  } | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeroAssets_CampaignExpress" | "CampaignProgressTowardsGoal_CampaignExpress">;
  readonly " $fragmentType": "CampaignHero_CampaignExpress";
};
export type CampaignHero_CampaignExpress$key = {
  readonly " $data"?: CampaignHero_CampaignExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHero_CampaignExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignHero_CampaignExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistPillButtonForUserExpress_UserExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignProgressTowardsGoal_CampaignExpress"
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignHeroAssets_CampaignExpress"
    }
  ],
  "type": "CampaignExpress",
  "abstractKey": null
};

(node as any).hash = "e5d220beafe1b372779516bd23fc18d8";

export default node;
