/**
 * @generated SignedSource<<bb1c39cd95619c0a833e122021d7758f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard$data = {
  readonly benefits: ReadonlyArray<{
    readonly description: string;
  }> | null;
  readonly description: string;
  readonly id: string;
  readonly metadataAccountsForSection: {
    readonly edges: ReadonlyArray<{
      readonly node: {
        readonly id: string;
        readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
      };
    }>;
  } | null;
  readonly title: string;
  readonly " $fragmentType": "CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard";
};
export type CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard$key = {
  readonly " $data"?: CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "firstForFundingTierNfts"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignFundingTierForCampaignFundingTierStandard_CampaignFundingTierStandard",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignBenefitExpress",
      "kind": "LinkedField",
      "name": "benefits",
      "plural": true,
      "selections": [
        (v0/*: any*/)
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
    (v0/*: any*/),
    (v1/*: any*/),
    {
      "alias": "metadataAccountsForSection",
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "firstForFundingTierNfts"
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
                (v1/*: any*/),
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ListingCardForMetadata_MetadataAccount"
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
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};
})();

(node as any).hash = "af4796e356003e160a490208763a30c5";

export default node;
