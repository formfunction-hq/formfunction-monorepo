/**
 * @generated SignedSource<<a3996f72a65a25d494c629a2ff6b30f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type BuyNowGenericModalForMetadataAccount_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly nft: {
    readonly CampaignFundingTier: {
      readonly " $fragmentSpreads": FragmentRefs<"CampaignBenefitsSection_CampaignFundingTierStandard">;
    } | null;
    readonly priceV2: {
      readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModal_Price">;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "BuyNowGenericModalForMetadataAccount_MetadataAccount";
};
export type BuyNowGenericModalForMetadataAccount_MetadataAccount$key = {
  readonly " $data"?: BuyNowGenericModalForMetadataAccount_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"BuyNowGenericModalForMetadataAccount_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "BuyNowGenericModalForMetadataAccount_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": null,
          "kind": "LinkedField",
          "name": "CampaignFundingTier",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "CampaignBenefitsSection_CampaignFundingTierStandard"
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "BuyNowGenericModal_Price"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListingCardForMetadata_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "d0a5afc5ed0323bf9f78ca9ecf8bde46";

export default node;
