/**
 * @generated SignedSource<<83acfb02b8030a7f6fc19dc6417fd19b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftsForAddress_User$data = {
  readonly CreatorStory: {
    readonly id: string;
  } | null;
  readonly displayName: string | null;
  readonly id: string;
  readonly seriesOrder: any;
  readonly username: string;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCreatorStory_User" | "ProfileSeries_User">;
  readonly " $fragmentType": "NftsForAddress_User";
};
export type NftsForAddress_User$key = {
  readonly " $data"?: NftsForAddress_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftsForAddress_User">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftsForAddress_User",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "displayName",
      "storageKey": null
    },
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
      "kind": "ScalarField",
      "name": "seriesOrder",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CreatorStory",
      "kind": "LinkedField",
      "name": "CreatorStory",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileCreatorStory_User"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileSeries_User"
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "ac2c7a479adf86e3c2f969c7045637e6";

export default node;
