/**
 * @generated SignedSource<<c5ac54400a59c4fc8ae598085c19278e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary";
};
export type ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary$key = {
  readonly " $data"?: ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationFollowerNewPieceListedSecondary_ActivityNotificationFollowerNewPieceListedSecondary",
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
  "type": "ActivityNotificationFollowerNewPieceListedSecondary",
  "abstractKey": null
};

(node as any).hash = "eec79caae823b8b643f3ad1d647d8b23";

export default node;
