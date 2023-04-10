/**
 * @generated SignedSource<<9cee55c9c589c8612ae61232d8e998e0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly campaignInfo: {
    readonly title: string;
    readonly " $fragmentSpreads": FragmentRefs<"AssetForNotificationCampaignInfo_ActivityNotificationCampaignInfo">;
  };
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember";
};
export type ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember$key = {
  readonly " $data"?: ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignAddedAsTeamMember_ActivityNotificationCampaignAddedAsTeamMember",
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
  "type": "ActivityNotificationCampaignAddedAsTeamMember",
  "abstractKey": null
};

(node as any).hash = "b6cf8833d088a1535b627cabd8209789";

export default node;
