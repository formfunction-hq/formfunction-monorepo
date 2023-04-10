/**
 * @generated SignedSource<<67eed6aa9f825ee06d8ceaee486b27b7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted";
};
export type ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted$key = {
  readonly " $data"?: ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationAirdropCompleted_ActivityNotificationAirdropCompleted",
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
  "type": "ActivityNotificationAirdropCompleted",
  "abstractKey": null
};

(node as any).hash = "7b7dd58c1f94d0b82c6eb10114774933";

export default node;
