/**
 * @generated SignedSource<<66e43c7a850a7176d49e4e8975134338>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionCardButtons_ArtistSubmission$data = {
  readonly id: string;
  readonly " $fragmentType": "SubmissionCardButtons_ArtistSubmission";
};
export type SubmissionCardButtons_ArtistSubmission$key = {
  readonly " $data"?: SubmissionCardButtons_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardButtons_ArtistSubmission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionCardButtons_ArtistSubmission",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};

(node as any).hash = "8818928c5849e780a010c0bdc0941afe";

export default node;
