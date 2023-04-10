/**
 * @generated SignedSource<<e1a78469683e594310fdfa5ea66da9d7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo$data = {
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
  readonly " $fragmentType": "ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo";
};
export type ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo$key = {
  readonly " $data"?: ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationUnlockableDeclinedToSharedInfo_ActivityNotificationUnlockableDeclinedToSharedInfo",
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
  "type": "ActivityNotificationUnlockableDeclinedToSharedInfo",
  "abstractKey": null
};

(node as any).hash = "7b1fb22582fac706e250202f3314cd0a";

export default node;
