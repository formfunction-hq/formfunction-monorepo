/**
 * @generated SignedSource<<a49345b8fe0eb9d44f9702a9a5bf918a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditTagsModal_MetadataAccount$data = {
  readonly mint: string;
  readonly tags: ReadonlyArray<string>;
  readonly " $fragmentType": "EditTagsModal_MetadataAccount";
};
export type EditTagsModal_MetadataAccount$key = {
  readonly " $data"?: EditTagsModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditTagsModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditTagsModal_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mint",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tags",
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "4f928025d4aaed737768b24e574db8ed";

export default node;
