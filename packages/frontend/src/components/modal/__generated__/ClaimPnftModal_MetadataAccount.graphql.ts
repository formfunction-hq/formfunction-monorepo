/**
 * @generated SignedSource<<68d7cca9e57ab754e3fcd27df4eb94a4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ClaimPnftModal_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly mint: string;
  readonly nft: {
    readonly creatorId: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  readonly " $fragmentType": "ClaimPnftModal_MetadataAccount";
};
export type ClaimPnftModal_MetadataAccount$key = {
  readonly " $data"?: ClaimPnftModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ClaimPnftModal_MetadataAccount",
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
          "kind": "ScalarField",
          "name": "creatorId",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListingCardForMetadata_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "875e666e2e23fe1af3f85a2298ee0ecc";

export default node;
