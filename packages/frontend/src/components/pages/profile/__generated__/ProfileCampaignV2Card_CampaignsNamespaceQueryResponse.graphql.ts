/**
 * @generated SignedSource<<fe9e71b220abf22257e3a4bc5a81c3ac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type CampaignStatusExpress_enum = "Approved" | "Concluded" | "Draft" | "Pending" | "Published" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignV2Card_CampaignsNamespaceQueryResponse$data = {
  readonly campaignsForUser: {
    readonly campaigns: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly previewAsset: {
            readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
          };
          readonly status: CampaignStatusExpress_enum;
          readonly tagline: string;
          readonly title: string;
          readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignV2CardGoal_CampaignV2" | "useCampaignLinkForCampaignV2_CampaignV2">;
        };
      }>;
    } | null;
  };
  readonly " $fragmentType": "ProfileCampaignV2Card_CampaignsNamespaceQueryResponse";
};
export type ProfileCampaignV2Card_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: ProfileCampaignV2Card_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignV2Card_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignV2Card_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "CampaignsForUserResponse",
      "kind": "LinkedField",
      "name": "campaignsForUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "after",
              "variableName": "after"
            },
            {
              "kind": "Variable",
              "name": "first",
              "variableName": "first"
            },
            (v0/*: any*/)
          ],
          "concreteType": "CampaignsConnection",
          "kind": "LinkedField",
          "name": "campaigns",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "CampaignsEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "CampaignV2",
                  "kind": "LinkedField",
                  "name": "node",
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
                      "name": "status",
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
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "ProfileCampaignV2CardGoal_CampaignV2"
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
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};
})();

(node as any).hash = "bb73cf4eb758f2c1dcf2e30723f3eee4";

export default node;
