/**
 * @generated SignedSource<<94b4d73224772ee39ac04faa72d9da3c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse$data = {
  readonly campaignsWhereUserIsActiveSupporter: {
    readonly campaigns: {
      readonly totalCount: number;
    } | null;
  };
  readonly " $fragmentType": "ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse";
};
export type ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse$key = {
  readonly " $data"?: ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse">;
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
  "name": "ProfileTabsCampaignsWhereUserIsActiveSupporter_CampaignsNamespaceQueryResponse",
  "selections": [
    {
      "alias": null,
      "args": [
        (v0/*: any*/)
      ],
      "concreteType": "CampaignsWhereUserIsActiveSupporterResponse",
      "kind": "LinkedField",
      "name": "campaignsWhereUserIsActiveSupporter",
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

(node as any).hash = "9986aa1bf473e2efca458af487227f71";

export default node;
