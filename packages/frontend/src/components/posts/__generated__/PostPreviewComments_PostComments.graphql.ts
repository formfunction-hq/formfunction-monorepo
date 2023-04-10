/**
 * @generated SignedSource<<7708b71980fe94ae5e9edafdcbe1de7c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostPreviewComments_PostComments$data = {
  readonly previewComments: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"PostCommentForCommentExpress_CommentExpress">;
  }>;
  readonly totalCount: number;
  readonly " $fragmentType": "PostPreviewComments_PostComments";
};
export type PostPreviewComments_PostComments$key = {
  readonly " $data"?: PostPreviewComments_PostComments$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostPreviewComments_PostComments">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostPreviewComments_PostComments",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CommentExpress",
      "kind": "LinkedField",
      "name": "previewComments",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "id",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "PostCommentForCommentExpress_CommentExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "PostComments",
  "abstractKey": null
};

(node as any).hash = "5088e89d2854440aab281fda1c66283b";

export default node;
