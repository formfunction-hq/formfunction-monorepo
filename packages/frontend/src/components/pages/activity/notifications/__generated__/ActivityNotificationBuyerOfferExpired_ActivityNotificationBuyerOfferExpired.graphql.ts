/**
 * @generated SignedSource<<8709f79f4183d1ff7308ba46efa3efd2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired";
};
export type ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired$key = {
  readonly " $data"?: ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBuyerOfferExpired_ActivityNotificationBuyerOfferExpired",
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
  "type": "ActivityNotificationBuyerOfferExpired",
  "abstractKey": null
};

(node as any).hash = "2409f795da9e8fe076041245a3e184b8";

export default node;
