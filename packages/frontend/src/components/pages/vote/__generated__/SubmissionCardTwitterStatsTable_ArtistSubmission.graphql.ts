/**
 * @generated SignedSource<<1624be3b1a1f1994df3f0af284401ddc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionCardTwitterStatsTable_ArtistSubmission$data = {
  readonly twitterName: string;
  readonly " $fragmentType": "SubmissionCardTwitterStatsTable_ArtistSubmission";
};
export type SubmissionCardTwitterStatsTable_ArtistSubmission$key = {
  readonly " $data"?: SubmissionCardTwitterStatsTable_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardTwitterStatsTable_ArtistSubmission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionCardTwitterStatsTable_ArtistSubmission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twitterName",
      "storageKey": null
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};

(node as any).hash = "068eb3112deeba620339d41a0256a752";

export default node;
