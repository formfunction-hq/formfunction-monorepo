/**
 * @generated SignedSource<<ce89eea15c3d18b85b4a8cc4af43c11c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignCategoryExpress_enum = "Art" | "Brand" | "Comics" | "Culture" | "DanceAndTheater" | "Design" | "Education" | "Fashion" | "FilmAndVideo" | "Food" | "Games" | "Music" | "Photography" | "Podcasts" | "Product" | "Writing" | "%future added value";
export type CampaignColorSchemeExpress_enum = "AliceBlueSinopia" | "AntiFlashWhiteDarkGunmetal" | "BrightGrayMediumBlue" | "CulturedCadmiumGreen" | "GreenishGrayMidnightBlue" | "SeashellMaximumRed" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type CampaignEditBasicInfoPage_CampaignV2$data = {
  readonly category: CampaignCategoryExpress_enum;
  readonly colorScheme: CampaignColorSchemeExpress_enum;
  readonly goal: {
    readonly __typename: "CampaignMonetaryGoal";
    readonly currency: {
      readonly " $fragmentSpreads": FragmentRefs<"useGetCurrencyConfigForCurrencyExpress_CurrencyExpress">;
    };
    readonly goalAmount: number;
  } | {
    readonly __typename: "CampaignSaleCountGoal";
    readonly goalAmount: number;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  };
  readonly goalProgressSymbol: string;
  readonly id: string;
  readonly previewAsset: {
    readonly downloadUrl: string;
  };
  readonly tagline: string;
  readonly teamMembers: ReadonlyArray<{
    readonly member: {
      readonly " $fragmentSpreads": FragmentRefs<"useUserSearchBarUserExpress_UserExpress">;
    };
  }> | null;
  readonly title: string;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeaderStatusBanner_CampaignV2">;
  readonly " $fragmentType": "CampaignEditBasicInfoPage_CampaignV2";
};
export type CampaignEditBasicInfoPage_CampaignV2$key = {
  readonly " $data"?: CampaignEditBasicInfoPage_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignEditBasicInfoPage_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "goalAmount",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignEditBasicInfoPage_CampaignV2",
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "CurrencyExpress",
              "kind": "LinkedField",
              "name": "currency",
              "plural": false,
              "selections": [
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "useGetCurrencyConfigForCurrencyExpress_CurrencyExpress"
                }
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
            (v0/*: any*/)
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "useUserSearchBarUserExpress_UserExpress"
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
      "name": "CampaignHeaderStatusBanner_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "40140bc896b13e9156ef178f71324564";

export default node;
