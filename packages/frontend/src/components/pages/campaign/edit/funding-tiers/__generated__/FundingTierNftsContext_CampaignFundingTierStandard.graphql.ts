/**
 * @generated SignedSource<<167c28ec2158ce104ad6b37f01b964f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FundingTierNftsContext_CampaignFundingTierStandard$data = {
  readonly id: string;
  readonly metadataAccounts: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly mint: string;
        readonly nft: {
          readonly id: string;
        };
        readonly " $fragmentSpreads": FragmentRefs<"GenericNftSearchDndRow_MetadataAccount" | "GenericNftSearchRow_MetadataAccount">;
      };
    }>;
  } | null;
  readonly nftOrder: ReadonlyArray<string> | null;
  readonly " $fragmentType": "FundingTierNftsContext_CampaignFundingTierStandard";
};
export type FundingTierNftsContext_CampaignFundingTierStandard$key = {
  readonly " $data"?: FundingTierNftsContext_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"FundingTierNftsContext_CampaignFundingTierStandard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FundingTierNftsContext_CampaignFundingTierStandard",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "nftOrder",
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 300
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
              "selections": [
                (v0/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "NftExpress",
                  "kind": "LinkedField",
                  "name": "nft",
                  "plural": false,
                  "selections": [
                    (v0/*: any*/)
                  ],
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "mint",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GenericNftSearchRow_MetadataAccount"
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "GenericNftSearchDndRow_MetadataAccount"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": "metadataAccounts(first:300)"
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};
})();

(node as any).hash = "10e4eb719afd2768c002af5a124459ca";

export default node;
