/**
 * @generated SignedSource<<db7a9443e5ea8ee527b047bf9f8804c3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled$data = {
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
  readonly " $fragmentType": "ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled";
};
export type ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled$key = {
  readonly " $data"?: ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationFollowerNewPieceScheduled_ActivityNotificationFollowerNewPieceScheduled",
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
  "type": "ActivityNotificationFollowerNewPieceScheduled",
  "abstractKey": null
};

(node as any).hash = "19da9ffe9a0c4575b4f8fb34b2659c29";

export default node;
