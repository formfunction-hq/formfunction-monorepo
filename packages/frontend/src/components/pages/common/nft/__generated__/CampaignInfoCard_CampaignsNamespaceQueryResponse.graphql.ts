/**
 * @generated SignedSource<<701a7a6a236411aaaca20a975152e3d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignInfoCard_CampaignsNamespaceQueryResponse$data = {
  readonly campaignForNft: {
    readonly campaign: {
      readonly previewAsset: {
        readonly downloadUrl: string;
      };
      readonly title: string;
      readonly " $fragmentSpreads": FragmentRefs<"useCampaignLinkForCampaignV2_CampaignV2">;
    } | null;
  };
  readonly " $fragmentType": "CampaignInfoCard_CampaignsNamespaceQueryResponse";
};
export type CampaignInfoCard_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignInfoCard_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignInfoCard_CampaignsNamespaceQueryResponse">;
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
  "name": "CampaignInfoCard_CampaignsNamespaceQueryResponse",
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
      "concreteType": "CampaignForNftResponse",
      "kind": "LinkedField",
      "name": "campaignForNft",
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
              "name": "title",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCampaignLinkForCampaignV2_CampaignV2"
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

(node as any).hash = "1fb295a7d00d4a39a54b082fae32b25d";

export default node;
