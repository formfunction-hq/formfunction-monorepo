/**
 * @generated SignedSource<<3484aa19126e368f4a524893f3809f2d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignCommunityTabContent_CampaignV2$data = {
  readonly creator: {
    readonly username: string;
  };
  readonly slug: string;
  readonly " $fragmentSpreads": FragmentRefs<"useIsViewerCampaignCreatorOrTeamMember_CampaignV2">;
  readonly " $fragmentType": "CampaignCommunityTabContent_CampaignV2";
};
export type CampaignCommunityTabContent_CampaignV2$key = {
  readonly " $data"?: CampaignCommunityTabContent_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignCommunityTabContent_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignCommunityTabContent_CampaignV2",
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

(node as any).hash = "1943029b85c56d77ee98bc63b2942f63";

export default node;
