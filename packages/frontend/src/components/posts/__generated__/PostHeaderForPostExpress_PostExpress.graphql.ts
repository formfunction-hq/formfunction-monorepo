/**
 * @generated SignedSource<<8d19a0026c5f2c5bb0aa88e26a31e7c0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostHeaderForPostExpress_PostExpress$data = {
  readonly creator: {
    readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
  };
  readonly timeCreated: string;
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilitySection_IPost">;
  readonly " $fragmentType": "PostHeaderForPostExpress_PostExpress";
};
export type PostHeaderForPostExpress_PostExpress$key = {
  readonly " $data"?: PostHeaderForPostExpress_PostExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostHeaderForPostExpress_PostExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostHeaderForPostExpress_PostExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeCreated",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ArtistPillButtonForUserExpress_UserExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PostVisibilitySection_IPost"
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
};

(node as any).hash = "ee447d7f1173266fd566e9f46d09bf1f";

export default node;
