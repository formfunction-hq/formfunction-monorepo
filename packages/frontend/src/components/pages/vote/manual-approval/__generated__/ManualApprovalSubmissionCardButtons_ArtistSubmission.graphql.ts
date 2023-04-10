/**
 * @generated SignedSource<<92f7666835616c227c2201ef135aec20>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManualApprovalSubmissionCardButtons_ArtistSubmission$data = {
  readonly id: string;
  readonly " $fragmentType": "ManualApprovalSubmissionCardButtons_ArtistSubmission";
};
export type ManualApprovalSubmissionCardButtons_ArtistSubmission$key = {
  readonly " $data"?: ManualApprovalSubmissionCardButtons_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManualApprovalSubmissionCardButtons_ArtistSubmission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ManualApprovalSubmissionCardButtons_ArtistSubmission",
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

(node as any).hash = "2b599571e4f6e9ea461e1b52d9c0f558";

export default node;
