/**
 * @generated SignedSource<<997a295d04fda17204ab048cbf45ba50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled";
};
export type ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled$key = {
  readonly " $data"?: ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerAuctionSettled_ActivityNotificationOwnerAuctionSettled",
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
  "type": "ActivityNotificationOwnerAuctionSettled",
  "abstractKey": null
};

(node as any).hash = "e0da45a7bddfb0a491fc2abcc1227ebb";

export default node;
