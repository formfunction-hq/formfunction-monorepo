/**
 * @generated SignedSource<<d6a39b82dac5759c9146c386ee578484>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected";
};
export type ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected$key = {
  readonly " $data"?: ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignRejected_ActivityNotificationCampaignRejected",
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
  "type": "ActivityNotificationCampaignRejected",
  "abstractKey": null
};

(node as any).hash = "f39d46e7f216ae1dffc69a2c737205e3";

export default node;
