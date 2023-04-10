/**
 * @generated SignedSource<<701e79d6ed51cb1797c6870ab938aa6c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled";
};
export type ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled$key = {
  readonly " $data"?: ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderAuctionSettled_ActivityNotificationBidderAuctionSettled",
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
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "sender",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PhotoExpress",
          "kind": "LinkedField",
          "name": "ProfilePhoto",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "photoUrl",
              "storageKey": null
            }
          ],
          "storageKey": null
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
  "type": "ActivityNotificationBidderAuctionSettled",
  "abstractKey": null
};

(node as any).hash = "e76219525add37a2310f968c72a39b76";

export default node;
