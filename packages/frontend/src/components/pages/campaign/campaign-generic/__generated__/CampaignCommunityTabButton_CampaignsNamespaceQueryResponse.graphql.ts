/**
 * @generated SignedSource<<71d99836f9247b638e89f71484d8e030>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignCommunityTabButton_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ForSlug: {
    readonly campaign: {
      readonly " $fragmentSpreads": FragmentRefs<"useCanViewerViewCommunityTab_CampaignV2">;
    } | null;
  };
  readonly " $fragmentType": "CampaignCommunityTabButton_CampaignsNamespaceQueryResponse";
};
export type CampaignCommunityTabButton_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignCommunityTabButton_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignCommunityTabButton_CampaignsNamespaceQueryResponse">;
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
  "name": "CampaignCommunityTabButton_CampaignsNamespaceQueryResponse",
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
              "args": null,
              "kind": "FragmentSpread",
              "name": "useCanViewerViewCommunityTab_CampaignV2"
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

(node as any).hash = "721c1a7b6f2dd9520c28e0e05ace0690";

export default node;
