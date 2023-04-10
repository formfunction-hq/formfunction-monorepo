/**
 * @generated SignedSource<<1e8179b929ad2655fd7adb2ef6ca3774>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver";
};
export type ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver$key = {
  readonly " $data"?: ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationFollowerAuctionAlmostOver_ActivityNotificationFollowerAuctionAlmostOver",
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
  "type": "ActivityNotificationFollowerAuctionAlmostOver",
  "abstractKey": null
};

(node as any).hash = "11398e60b1b6b36854321c0ea844ba44";

export default node;
