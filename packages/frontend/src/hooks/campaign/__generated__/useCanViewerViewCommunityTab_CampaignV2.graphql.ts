/**
 * @generated SignedSource<<090c0f4aba243ab9497714026a71f4c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCanViewerViewCommunityTab_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
  };
  readonly isViewerHolder: boolean | null;
  readonly teamMembers: ReadonlyArray<{
    readonly member: {
      readonly id: string;
    };
  }> | null;
  readonly " $fragmentType": "useCanViewerViewCommunityTab_CampaignV2";
};
export type useCanViewerViewCommunityTab_CampaignV2$key = {
  readonly " $data"?: useCanViewerViewCommunityTab_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCanViewerViewCommunityTab_CampaignV2">;
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
  "name": "useCanViewerViewCommunityTab_CampaignV2",
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isViewerHolder",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "62609d692d735be84f19eba2fbe07399";

export default node;
