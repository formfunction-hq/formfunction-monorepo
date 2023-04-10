/**
 * @generated SignedSource<<7b34a2735ca609fa42aec5d5e8205508>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type OpenBidStatus = "HighestBid" | "Outbid" | "Refund" | "Won" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ActivityAuctionsOpenBids_OpenBid$data = ReadonlyArray<{
  readonly metadataAccount: {
    readonly id: string;
    readonly openBidStatus: OpenBidStatus | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"OpenBidCard_OpenBid">;
  readonly " $fragmentType": "ActivityAuctionsOpenBids_OpenBid";
}>;
export type ActivityAuctionsOpenBids_OpenBid$key = ReadonlyArray<{
  readonly " $data"?: ActivityAuctionsOpenBids_OpenBid$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityAuctionsOpenBids_OpenBid">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "userId"
    }
  ],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ActivityAuctionsOpenBids_OpenBid",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "OpenBidCard_OpenBid"
    }
  ],
  "type": "OpenBid",
  "abstractKey": null
};

(node as any).hash = "8eb1e3e6f92227a2f4de9b923d454c9e";

export default node;
