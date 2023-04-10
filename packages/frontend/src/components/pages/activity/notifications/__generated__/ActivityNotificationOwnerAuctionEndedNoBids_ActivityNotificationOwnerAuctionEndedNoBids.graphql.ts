/**
 * @generated SignedSource<<7f58c45cd4e02d51c806aaa97545a713>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids";
};
export type ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids$key = {
  readonly " $data"?: ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerAuctionEndedNoBids_ActivityNotificationOwnerAuctionEndedNoBids",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ActivityNotificationNftInfo",
      "kind": "LinkedField",
      "name": "nftInfo",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeCreated",
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationOwnerAuctionEndedNoBids",
  "abstractKey": null
};

(node as any).hash = "5c8acac057d6e4b165dcf19c4326b8e3";

export default node;
