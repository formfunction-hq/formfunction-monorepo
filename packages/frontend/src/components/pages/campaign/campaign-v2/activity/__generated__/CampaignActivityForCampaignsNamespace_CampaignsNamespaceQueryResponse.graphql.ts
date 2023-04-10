/**
 * @generated SignedSource<<9536d9ce7db68917a9aacfb353fc27ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse$data = {
  readonly campaignV2ActivityForSlug: {
    readonly campaignActivity: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
          readonly " $fragmentSpreads": FragmentRefs<"CampaignActivityItemForNftTransaction_NftTransactionExpress">;
        };
      }>;
    } | null;
  };
  readonly " $fragmentType": "CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse";
};
export type CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse">;
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
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignActivityForCampaignsNamespace_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "CampaignV2ActivityForSlugReponse",
      "kind": "LinkedField",
      "name": "campaignV2ActivityForSlug",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "first",
              "variableName": "first"
            },
            (v0/*: any*/)
          ],
          "concreteType": "NftTransactionsConnection",
          "kind": "LinkedField",
          "name": "campaignActivity",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "NftTransactionsEdge",
              "kind": "LinkedField",
              "name": "edges",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "NftTransactionExpress",
                  "kind": "LinkedField",
                  "name": "node",
                  "plural": false,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "kind": "ScalarField",
                      "name": "id",
                      "storageKey": null
                    },
                    {
                      "args": null,
                      "kind": "FragmentSpread",
                      "name": "CampaignActivityItemForNftTransaction_NftTransactionExpress"
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

(node as any).hash = "271dac5d3d51671f07242fd1f16c3d9b";

export default node;
