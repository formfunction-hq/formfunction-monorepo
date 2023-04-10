/**
 * @generated SignedSource<<66b2282503da118677c13d6afe3f9eb5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts$data = {
  readonly benefits: ReadonlyArray<string>;
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
  readonly " $fragmentType": "CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts";
};
export type CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts$key = {
  readonly " $data"?: CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts">;
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
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "firstForSections"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignSectionForCampaignSectionWithNfts_CampaignSectionWithNfts",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "benefits",
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
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": "metadataAccountsForSection",
      "args": [
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "firstForSections"
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
  "type": "CampaignSectionWithNfts",
  "abstractKey": null
};
})();

(node as any).hash = "2a887fb675960aa6b58f8fe14693cb27";

export default node;
