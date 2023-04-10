/**
 * @generated SignedSource<<6a7cab31454aa98385ba0cc43b3e4b35>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved";
};
export type ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved$key = {
  readonly " $data"?: ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignApproved_ActivityNotificationCampaignApproved",
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
  "type": "ActivityNotificationCampaignApproved",
  "abstractKey": null
};

(node as any).hash = "7f7a39d12c56f798e3afed231c400b6d";

export default node;
