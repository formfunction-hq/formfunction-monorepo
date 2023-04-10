/**
 * @generated SignedSource<<b5a248b779d2b5f3310d75e645621ba6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly previewAsset: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAssetForAssetExpress_AssetExpress">;
  };
  readonly slug: string;
  readonly " $fragmentType": "AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo";
};
export type AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo$key = {
  readonly " $data"?: AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "previewAsset",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ActivityNotificationAssetForAssetExpress_AssetExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationCampaignInfo",
  "abstractKey": null
};

(node as any).hash = "caf80c7f53e3d7e937b619d813354268";

export default node;
