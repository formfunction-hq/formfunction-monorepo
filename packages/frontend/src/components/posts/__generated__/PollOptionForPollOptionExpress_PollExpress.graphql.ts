/**
 * @generated SignedSource<<1e65c3f274e9bd297988af778a73ea17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PollOptionForPollOptionExpress_PollExpress$data = {
  readonly id: string;
  readonly isMultiSelect: boolean | null;
  readonly totalResponses: number;
  readonly viewerRespondedToPoll: boolean;
  readonly " $fragmentType": "PollOptionForPollOptionExpress_PollExpress";
};
export type PollOptionForPollOptionExpress_PollExpress$key = {
  readonly " $data"?: PollOptionForPollOptionExpress_PollExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"PollOptionForPollOptionExpress_PollExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PollOptionForPollOptionExpress_PollExpress",
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
      "name": "totalResponses",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerRespondedToPoll",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isMultiSelect",
      "storageKey": null
    }
  ],
  "type": "PollExpress",
  "abstractKey": null
};

(node as any).hash = "0e88715162261efb7eb1140cb2467b4c";

export default node;
