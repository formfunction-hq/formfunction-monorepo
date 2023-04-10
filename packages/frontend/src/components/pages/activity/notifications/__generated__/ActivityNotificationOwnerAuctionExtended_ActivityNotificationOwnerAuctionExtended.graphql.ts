/**
 * @generated SignedSource<<3495d32a5c302d4540c50c0d6f46cb33>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended";
};
export type ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended$key = {
  readonly " $data"?: ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerAuctionExtended_ActivityNotificationOwnerAuctionExtended",
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
  "type": "ActivityNotificationOwnerAuctionExtended",
  "abstractKey": null
};

(node as any).hash = "82d3078b1d8049150f94193c4cbdfb45";

export default node;
