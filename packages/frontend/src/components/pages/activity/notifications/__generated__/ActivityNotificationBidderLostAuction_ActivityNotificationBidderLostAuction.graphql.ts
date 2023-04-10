/**
 * @generated SignedSource<<5c14ef4346fc12e52c293349d53d1e98>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction";
};
export type ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction$key = {
  readonly " $data"?: ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderLostAuction_ActivityNotificationBidderLostAuction",
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
  "type": "ActivityNotificationBidderLostAuction",
  "abstractKey": null
};

(node as any).hash = "d689bdd90788245499304cd95dcf2ee6";

export default node;
