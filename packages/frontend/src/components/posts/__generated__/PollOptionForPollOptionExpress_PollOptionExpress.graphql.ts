/**
 * @generated SignedSource<<58a291a2ea844683f197c28dc8955fa2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PollOptionForPollOptionExpress_PollOptionExpress$data = {
  readonly id: string;
  readonly responseCount: number;
  readonly text: string;
  readonly viewerRespondedToPollOption: boolean | null;
  readonly " $fragmentType": "PollOptionForPollOptionExpress_PollOptionExpress";
};
export type PollOptionForPollOptionExpress_PollOptionExpress$key = {
  readonly " $data"?: PollOptionForPollOptionExpress_PollOptionExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"PollOptionForPollOptionExpress_PollOptionExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PollOptionForPollOptionExpress_PollOptionExpress",
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
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "responseCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerRespondedToPollOption",
      "storageKey": null
    }
  ],
  "type": "PollOptionExpress",
  "abstractKey": null
};

(node as any).hash = "144ba17e1b890f5a603af6d4ad81ab9e";

export default node;
