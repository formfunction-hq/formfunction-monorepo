/**
 * @generated SignedSource<<e3c762a86a069a48fa2ebfb333e6a51d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useIsViewerCampaignCreatorOrTeamMember_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
  };
  readonly teamMembers: ReadonlyArray<{
    readonly member: {
      readonly id: string;
    };
  }> | null;
  readonly " $fragmentType": "useIsViewerCampaignCreatorOrTeamMember_CampaignV2";
};
export type useIsViewerCampaignCreatorOrTeamMember_CampaignV2$key = {
  readonly " $data"?: useIsViewerCampaignCreatorOrTeamMember_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"useIsViewerCampaignCreatorOrTeamMember_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useIsViewerCampaignCreatorOrTeamMember_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignTeamMemberExpress",
      "kind": "LinkedField",
      "name": "teamMembers",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "member",
          "plural": false,
          "selections": (v0/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "39d6e350bffd352cc66138a4de595305";

export default node;
