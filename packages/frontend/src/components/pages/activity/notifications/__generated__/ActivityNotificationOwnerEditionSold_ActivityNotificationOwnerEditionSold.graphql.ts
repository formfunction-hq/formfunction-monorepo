/**
 * @generated SignedSource<<2309073b5ea67fc8ae5fd187f42b436e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold$data = {
  readonly nftInfo: {
    readonly editionNumber: number | null;
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForActivityNotificationNftInfo_ActivityNotificationNftInfo" | "NftLinkForActivityNotificationNftInfo_ActivityNotificationNftInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold";
};
export type ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold$key = {
  readonly " $data"?: ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerEditionSold_ActivityNotificationOwnerEditionSold",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "editionNumber",
          "storageKey": null
        },
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
  "type": "ActivityNotificationOwnerEditionSold",
  "abstractKey": null
};

(node as any).hash = "9087d9e1f65f7dc96c43744f56b945ec";

export default node;
