/**
 * @generated SignedSource<<741f0c9e6a6e2a7b71e5de0bce5ae50b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly feedback: string;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback";
};
export type ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback$key = {
  readonly " $data"?: ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignRejectedWithFeedback_ActivityNotificationCampaignRejectedWithFeedback",
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
      "name": "feedback",
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
  "type": "ActivityNotificationCampaignRejectedWithFeedback",
  "abstractKey": null
};

(node as any).hash = "30e7bb0f80bdf214afbb1e64e86325b7";

export default node;
