/**
 * @generated SignedSource<<36ce925fb7d3905f929f1a403a1a431d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PrescreenSubmissionCardButtons_ArtistSubmission$data = {
  readonly id: string;
  readonly " $fragmentType": "PrescreenSubmissionCardButtons_ArtistSubmission";
};
export type PrescreenSubmissionCardButtons_ArtistSubmission$key = {
  readonly " $data"?: PrescreenSubmissionCardButtons_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"PrescreenSubmissionCardButtons_ArtistSubmission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PrescreenSubmissionCardButtons_ArtistSubmission",
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

(node as any).hash = "8656b0de315fc838281962e81f3ad438";

export default node;
