/**
 * @generated SignedSource<<c367e38d9d7998638284f6368c1d2ee5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDraftChecklist_CampaignV2$data = {
  readonly about: {
    readonly campaign: string | null;
    readonly contactInfo: string | null;
    readonly creator: string | null;
    readonly risksAndChallenges: string | null;
    readonly timeline: string | null;
  };
  readonly fundingTiers: ReadonlyArray<{
    readonly __typename: "CampaignFundingTierStandard";
    readonly metadataAccountsForPreview: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        };
      }>;
    } | null;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  }> | null;
  readonly galleryAssets: ReadonlyArray<{
    readonly id: string;
  }> | null;
  readonly " $fragmentType": "CampaignDraftChecklist_CampaignV2";
};
export type CampaignDraftChecklist_CampaignV2$key = {
  readonly " $data"?: CampaignDraftChecklist_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDraftChecklist_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDraftChecklist_CampaignV2",
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "galleryAssets",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "fundingTiers",
      "plural": true,
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
            {
              "alias": "metadataAccountsForPreview",
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 3
                }
              ],
              "concreteType": "MetadataAccountsConnection",
              "kind": "LinkedField",
              "name": "metadataAccounts",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "MetadataAccountsEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "MetadataAccount",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": (v0/*: any*/),
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": "metadataAccounts(first:3)"
            }
          ],
          "type": "CampaignFundingTierStandard",
          "abstractKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "fd10c012d04375f99ba252017f5112a0";

export default node;
