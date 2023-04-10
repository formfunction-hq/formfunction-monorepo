/**
 * @generated SignedSource<<bb020c810a023541ad85554663b5f3ec>>
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
export type CampaignPage_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ForSlug: {
    readonly campaign: {
      readonly colorScheme: CampaignColorSchemeExpress_enum;
      readonly status: CampaignStatusExpress_enum;
      readonly " $fragmentSpreads": FragmentRefs<"CampaignPageContent_CampaignV2" | "useCanViewerEditCampaign_CampaignV2">;
    } | null;
  };
  readonly " $fragmentType": "CampaignPage_CampaignsNamespaceQueryResponse";
};
export type CampaignPage_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignPage_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignPage_CampaignsNamespaceQueryResponse">;
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
  "name": "CampaignPage_CampaignsNamespaceQueryResponse",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignPageContent_CampaignV2"
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCanViewerEditCampaign_CampaignV2"
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

(node as any).hash = "d66cc3efcfdc6e079340ddd27e7aa2e1";

export default node;
