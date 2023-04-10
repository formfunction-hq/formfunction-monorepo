/**
 * @generated SignedSource<<84d50517e0689d258c993d81e75126a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly percentAsNumber: number;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent";
};
export type ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent$key = {
  readonly " $data"?: ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignGoalReachedXPercent_ActivityNotificationCampaignGoalReachedXPercent",
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
      "kind": "ScalarField",
      "name": "percentAsNumber",
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
  "type": "ActivityNotificationCampaignGoalReachedXPercent",
  "abstractKey": null
};

(node as any).hash = "f5682a725fa8c880c09995bfbeb9e7ca";

export default node;
