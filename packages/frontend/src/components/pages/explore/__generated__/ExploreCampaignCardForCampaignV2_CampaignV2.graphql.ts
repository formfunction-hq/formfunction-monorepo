/**
 * @generated SignedSource<<a92c996768a616dfb3ff420dfc132a28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignColorSchemeExpress_enum = "AliceBlueSinopia" | "AntiFlashWhiteDarkGunmetal" | "BrightGrayMediumBlue" | "CulturedCadmiumGreen" | "GreenishGrayMidnightBlue" | "SeashellMaximumRed" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ExploreCampaignCardForCampaignV2_CampaignV2$data = {
  readonly colorScheme: CampaignColorSchemeExpress_enum;
  readonly creator: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
  };
  readonly previewAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
  };
  readonly tagline: string;
  readonly teamMembers: ReadonlyArray<{
    readonly member: {
      readonly ProfilePhoto: {
        readonly photoUrl: string;
      } | null;
    };
  }> | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressTowardsGoalForCampaignV2_CampaignV2" | "useCampaignLinkForCampaignV2_CampaignV2">;
  readonly " $fragmentType": "ExploreCampaignCardForCampaignV2_CampaignV2";
};
export type ExploreCampaignCardForCampaignV2_CampaignV2$key = {
  readonly " $data"?: ExploreCampaignCardForCampaignV2_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCampaignCardForCampaignV2_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExploreCampaignCardForCampaignV2_CampaignV2",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "colorScheme",
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
                }
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CampaignProgressTowardsGoalForCampaignV2_CampaignV2"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCampaignLinkForCampaignV2_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "2babe133325802e878aa4872286eed9a";

export default node;
