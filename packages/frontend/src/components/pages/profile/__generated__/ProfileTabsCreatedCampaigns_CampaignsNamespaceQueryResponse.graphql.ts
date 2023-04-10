/**
 * @generated SignedSource<<162b0630f6d478af551245bf4cffd910>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse$data = {
  readonly campaignsForUser: {
    readonly campaigns: {
      readonly totalCount: number;
    } | null;
  };
  readonly " $fragmentType": "ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse";
};
export type ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "kind": "Variable",
  "name": "input",
  "variableName": "input"
};
return {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "after"
    },
    {
      "kind": "RootArgument",
      "name": "first"
    },
    {
      "kind": "RootArgument",
      "name": "input"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileTabsCreatedCampaigns_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "CampaignsForUserResponse",
      "kind": "LinkedField",
      "name": "campaignsForUser",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": [
            {
              "kind": "Variable",
              "name": "after",
              "variableName": "after"
            },
            {
              "kind": "Variable",
              "name": "first",
              "variableName": "first"
            },
            (v0/*: any*/)
          ],
          "concreteType": "CampaignsConnection",
          "kind": "LinkedField",
          "name": "campaigns",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "totalCount",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignsNamespaceQueryResponse",
  "abstractKey": null
};
})();

(node as any).hash = "39a60308b721570bd469959c266a57d5";

export default node;
