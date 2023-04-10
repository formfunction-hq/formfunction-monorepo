/**
 * @generated SignedSource<<daf0f40c8d1d6c869898f0c5efc3977f>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditCreatorStoryForm_User$data = {
  readonly CreatorStory: {
    readonly colorScheme: number;
    readonly goals: string | null;
    readonly headline: string | null;
    readonly id: string;
    readonly inspiration: string | null;
    readonly process: string | null;
  } | null;
  readonly ProfilePhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly displayName: string | null;
  readonly id: string;
  readonly username: string;
  readonly " $fragmentType": "EditCreatorStoryForm_User";
};
export type EditCreatorStoryForm_User$key = {
  readonly " $data"?: EditCreatorStoryForm_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditCreatorStoryForm_User">;
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
  "name": "EditCreatorStoryForm_User",
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
      "concreteType": "CreatorStory",
      "kind": "LinkedField",
      "name": "CreatorStory",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "colorScheme",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "goals",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "headline",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "inspiration",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "process",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "ProfilePhoto",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "287224affda2690a0c27b450bf2405af";

export default node;
