/**
 * @generated SignedSource<<8766521fecc5e7f9f704e3ec4597ed3b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignHeaderGoToDashboardBanner_CampaignV2$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"useIsViewerCampaignCreatorOrTeamMember_CampaignV2">;
  readonly " $fragmentType": "CampaignHeaderGoToDashboardBanner_CampaignV2";
};
export type CampaignHeaderGoToDashboardBanner_CampaignV2$key = {
  readonly " $data"?: CampaignHeaderGoToDashboardBanner_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignHeaderGoToDashboardBanner_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignHeaderGoToDashboardBanner_CampaignV2",
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "useIsViewerCampaignCreatorOrTeamMember_CampaignV2"
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "d4d696d22b3a410ed544b734f11cc288";

export default node;
