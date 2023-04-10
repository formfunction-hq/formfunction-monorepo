/**
 * @generated SignedSource<<85bcd62b1c702350636dee7b2683f34f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ForSlug: {
    readonly campaign: {
      readonly about: {
        readonly campaign: string | null;
        readonly contactInfo: string | null;
        readonly creator: string | null;
        readonly risksAndChallenges: string | null;
        readonly timeline: string | null;
      };
    } | null;
  };
  readonly " $fragmentType": "CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse";
};
export type CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
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
  "name": "CampaignAboutForCampaignsNamespace_CampaignsNamespaceQueryResponse",
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

(node as any).hash = "d180ba6ef7ae2aefbcaaece178d54114";

export default node;
