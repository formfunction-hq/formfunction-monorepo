/**
 * @generated SignedSource<<a4c970307e275ab22cfcd66017495a79>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended";
};
export type ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended$key = {
  readonly " $data"?: ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderAuctionExtended_ActivityNotificationBidderAuctionExtended",
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
  "type": "ActivityNotificationBidderAuctionExtended",
  "abstractKey": null
};

(node as any).hash = "94f781dd7ac29f3e02cdd7f0016ff09a";

export default node;
