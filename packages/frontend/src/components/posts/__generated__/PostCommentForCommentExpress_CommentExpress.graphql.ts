/**
 * @generated SignedSource<<8069769930b36385139e2b09a1e04f28>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostCommentForCommentExpress_CommentExpress$data = {
  readonly comment: string;
  readonly commenter: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "PostCommentForCommentExpress_CommentExpress";
};
export type PostCommentForCommentExpress_CommentExpress$key = {
  readonly " $data"?: PostCommentForCommentExpress_CommentExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostCommentForCommentExpress_CommentExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostCommentForCommentExpress_CommentExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "comment",
      "storageKey": null
    },
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
      "name": "commenter",
      "plural": false,
      "selections": [
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
          "concreteType": "PhotoExpress",
          "kind": "LinkedField",
          "name": "ProfilePhoto",
          "plural": false,
          "selections": [
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
      "storageKey": null
    }
  ],
  "type": "CommentExpress",
  "abstractKey": null
};

(node as any).hash = "e9eb1aabd509dd480f8d59ba2758c36b";

export default node;
