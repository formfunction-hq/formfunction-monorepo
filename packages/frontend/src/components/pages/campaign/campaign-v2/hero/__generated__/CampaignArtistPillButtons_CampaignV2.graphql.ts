/**
 * @generated SignedSource<<aa3ca4f99271f14690c204416683aa68>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignArtistPillButtons_CampaignV2$data = {
  readonly creator: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
  };
  readonly teamMembers: ReadonlyArray<{
    readonly member: {
      readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
    };
  }> | null;
  readonly " $fragmentType": "CampaignArtistPillButtons_CampaignV2";
};
export type CampaignArtistPillButtons_CampaignV2$key = {
  readonly " $data"?: CampaignArtistPillButtons_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignArtistPillButtons_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "ArtistPillButtonForUserExpress_UserExpress"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignArtistPillButtons_CampaignV2",
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

(node as any).hash = "aca906fe7c39210e0f4e5f1ec5c77953";

export default node;
