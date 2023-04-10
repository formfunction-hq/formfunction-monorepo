/**
 * @generated SignedSource<<777d2153daa1f3fd56c5c447c3ac2b50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft";
};
export type ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft$key = {
  readonly " $data"?: ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderClaimPnft_ActivityNotificationBidderClaimPnft",
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
      "name": "timeCreated",
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationBidderClaimPnft",
  "abstractKey": null
};

(node as any).hash = "47e6eb1e4c29dd6d67be5ff05781dcd4";

export default node;
