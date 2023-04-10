/**
 * @generated SignedSource<<a41a30697f8060b9b6cfb3728ac46871>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UserFollowsInfo_User$data = {
  readonly Followed_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly Followers_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly id: string;
  readonly " $fragmentType": "UserFollowsInfo_User";
};
export type UserFollowsInfo_User$key = {
  readonly " $data"?: UserFollowsInfo_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"UserFollowsInfo_User">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserFollows_aggregate_fields",
    "kind": "LinkedField",
    "name": "aggregate",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "count",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UserFollowsInfo_User",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserFollows_aggregate",
      "kind": "LinkedField",
      "name": "Followed_aggregate",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserFollows_aggregate",
      "kind": "LinkedField",
      "name": "Followers_aggregate",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "e2d7adeadca316bca2b7b33a9ab19ed6";

export default node;
