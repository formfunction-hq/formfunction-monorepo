/**
 * @generated SignedSource<<85e6204d8f3179f587e3d587a9548316>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver";
};
export type ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver$key = {
  readonly " $data"?: ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderAuctionAlmostOver_ActivityNotificationBidderAuctionAlmostOver",
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
  "type": "ActivityNotificationBidderAuctionAlmostOver",
  "abstractKey": null
};

(node as any).hash = "c565a32cc444a38b0ecd64a5774a2378";

export default node;
