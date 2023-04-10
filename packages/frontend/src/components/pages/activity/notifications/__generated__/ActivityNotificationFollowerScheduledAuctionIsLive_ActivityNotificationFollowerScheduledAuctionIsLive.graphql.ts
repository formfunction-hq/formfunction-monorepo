/**
 * @generated SignedSource<<b7725267aa07e2e0d9dbff0a80c80a7e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive";
};
export type ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive$key = {
  readonly " $data"?: ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationFollowerScheduledAuctionIsLive_ActivityNotificationFollowerScheduledAuctionIsLive",
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
  "type": "ActivityNotificationFollowerScheduledAuctionIsLive",
  "abstractKey": null
};

(node as any).hash = "81c1b6bb341b8c716717c2d0c22a81ca";

export default node;
