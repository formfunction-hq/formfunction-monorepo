/**
 * @generated SignedSource<<b231967dac9f7d75fbc351ec4e279c1f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction";
};
export type ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction$key = {
  readonly " $data"?: ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderWonAuction_ActivityNotificationBidderWonAuction",
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
  "type": "ActivityNotificationBidderWonAuction",
  "abstractKey": null
};

(node as any).hash = "926ede7fe6a4bb7cb42ffbf7a1ef4247";

export default node;
