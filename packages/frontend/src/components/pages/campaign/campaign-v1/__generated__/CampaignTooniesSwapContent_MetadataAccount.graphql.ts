/**
 * @generated SignedSource<<27b7beaab4ad187577d9b064600ac0b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignTooniesSwapContent_MetadataAccount$data = ReadonlyArray<{
  readonly mint: string;
  readonly nft: {
    readonly Owner: {
      readonly id: string;
    } | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "CampaignTooniesSwapContent_MetadataAccount";
}>;
export type CampaignTooniesSwapContent_MetadataAccount$key = ReadonlyArray<{
  readonly " $data"?: CampaignTooniesSwapContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignTooniesSwapContent_MetadataAccount">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "CampaignTooniesSwapContent_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Owner",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
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

(node as any).hash = "1c92c740f9c65a2392b2ea8e2d969fbb";

export default node;
