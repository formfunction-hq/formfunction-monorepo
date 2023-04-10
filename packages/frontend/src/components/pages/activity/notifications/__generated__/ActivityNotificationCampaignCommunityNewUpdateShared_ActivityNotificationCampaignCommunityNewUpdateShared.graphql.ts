/**
 * @generated SignedSource<<3a3618617ed16d61f96471011ac71997>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared";
};
export type ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared$key = {
  readonly " $data"?: ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignCommunityNewUpdateShared_ActivityNotificationCampaignCommunityNewUpdateShared",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ActivityNotificationCampaignInfo",
      "kind": "LinkedField",
      "name": "campaignInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "action",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ActivityNotificationLinkActionButton_ActivityNotificationLinkAction"
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
  "type": "ActivityNotificationCampaignCommunityNewUpdateShared",
  "abstractKey": null
};

(node as any).hash = "6456bb8728621f8444bdb4aac881a6a6";

export default node;
