/**
 * @generated SignedSource<<4a8ee7b03aec6cd89a7c46e85be4833b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type OpenBidStatus = "HighestBid" | "Outbid" | "Refund" | "Won" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type OpenBidCard_OpenBid$data = {
  readonly metadataAccount: {
    readonly openBidStatus: OpenBidStatus | null;
    readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  };
  readonly " $fragmentType": "OpenBidCard_OpenBid";
};
export type OpenBidCard_OpenBid$key = {
  readonly " $data"?: OpenBidCard_OpenBid$data;
  readonly " $fragmentSpreads": FragmentRefs<"OpenBidCard_OpenBid">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "userId"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "OpenBidCard_OpenBid",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccount",
      "kind": "LinkedField",
      "name": "metadataAccount",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ListingCardForMetadata_MetadataAccount"
        },
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "userId",
              "variableName": "userId"
            }
          ],
          "kind": "ScalarField",
          "name": "openBidStatus",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "OpenBid",
  "abstractKey": null
};

(node as any).hash = "230fe3f40e0a54f58f84184cbf5c6ff9";

export default node;
