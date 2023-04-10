/**
 * @generated SignedSource<<5e6a8e0ce7e0c4420f7c626f068577c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale";
};
export type ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale$key = {
  readonly " $data"?: ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCreatorSecondarySale_ActivityNotificationCreatorSecondarySale",
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
  "type": "ActivityNotificationCreatorSecondarySale",
  "abstractKey": null
};

(node as any).hash = "287806e17a3b5da38c667e57db596230";

export default node;
