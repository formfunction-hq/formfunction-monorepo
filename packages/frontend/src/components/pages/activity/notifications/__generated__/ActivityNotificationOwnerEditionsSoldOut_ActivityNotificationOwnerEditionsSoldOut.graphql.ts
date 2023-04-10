/**
 * @generated SignedSource<<5ae943c54c19c20ccdf4fa433f0eddf6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut$data = {
  readonly nftInfo: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut";
};
export type ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut$key = {
  readonly " $data"?: ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerEditionsSoldOut_ActivityNotificationOwnerEditionsSoldOut",
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
  "type": "ActivityNotificationOwnerEditionsSoldOut",
  "abstractKey": null
};

(node as any).hash = "9392ea3006698315067cd8be05d09967";

export default node;
