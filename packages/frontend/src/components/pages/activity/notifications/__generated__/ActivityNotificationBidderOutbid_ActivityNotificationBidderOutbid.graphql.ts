/**
 * @generated SignedSource<<e3b01b6715d2ffe70bbb71ff50e33f48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly refundAmount: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid";
};
export type ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid$key = {
  readonly " $data"?: ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBidderOutbid_ActivityNotificationBidderOutbid",
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
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "refundAmount",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PriceWithSymbol_Price"
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
  "type": "ActivityNotificationBidderOutbid",
  "abstractKey": null
};

(node as any).hash = "efee232b9e9ae445dbe27bd351d438ce";

export default node;
