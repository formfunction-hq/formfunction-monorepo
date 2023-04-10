/**
 * @generated SignedSource<<4068a25a8f7adb0398c0a8ba9c65c009>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly pnftCloseDate: string;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder";
};
export type ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder$key = {
  readonly " $data"?: ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderClaimPnftReminder_ActivityNotificationBidderClaimPnftReminder",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ActivityNotificationLinkAction",
      "kind": "LinkedField",
      "name": "action",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ActivityNotificationLinkActionButton_ActivityNotificationLinkAction"
        }
      ],
      "storageKey": null
    },
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
      "name": "pnftCloseDate",
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
  "type": "ActivityNotificationBidderClaimPnftReminder",
  "abstractKey": null
};

(node as any).hash = "55fa478c14d2981704007dc333686de3";

export default node;
