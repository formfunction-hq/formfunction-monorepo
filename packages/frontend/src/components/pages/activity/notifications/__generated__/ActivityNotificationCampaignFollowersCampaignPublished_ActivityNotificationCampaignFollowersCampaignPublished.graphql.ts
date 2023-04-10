/**
 * @generated SignedSource<<94dc6f988f0736d56a4775b8e93544ab>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished$data = {
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
  readonly " $fragmentType": "ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished";
};
export type ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished$key = {
  readonly " $data"?: ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationCampaignFollowersCampaignPublished_ActivityNotificationCampaignFollowersCampaignPublished",
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
  "type": "ActivityNotificationCampaignFollowersCampaignPublished",
  "abstractKey": null
};

(node as any).hash = "f42721efdee9313b2e2951482ff91c12";

export default node;
