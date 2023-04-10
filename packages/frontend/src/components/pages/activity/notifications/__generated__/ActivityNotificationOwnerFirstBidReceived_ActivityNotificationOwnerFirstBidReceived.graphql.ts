/**
 * @generated SignedSource<<b3d2df54aca43adb61f33b73247bba2f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived$data = {
  readonly bidPrice: {
    readonly " $fragmentSpreads": FragmentRefs<"PriceWithSymbol_Price">;
  };
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived";
};
export type ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived$key = {
  readonly " $data"?: ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerFirstBidReceived_ActivityNotificationOwnerFirstBidReceived",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Price",
      "kind": "LinkedField",
      "name": "bidPrice",
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
  "type": "ActivityNotificationOwnerFirstBidReceived",
  "abstractKey": null
};

(node as any).hash = "e15bcaf363014fba20ebbe9ea22605d2";

export default node;
