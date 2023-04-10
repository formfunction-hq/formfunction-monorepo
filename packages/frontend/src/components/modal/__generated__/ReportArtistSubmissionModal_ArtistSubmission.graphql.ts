/**
 * @generated SignedSource<<0341b1b8876795d47560293991656c48>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ReportArtistSubmissionModal_ArtistSubmission$data = {
  readonly id: string;
  readonly " $fragmentType": "ReportArtistSubmissionModal_ArtistSubmission";
};
export type ReportArtistSubmissionModal_ArtistSubmission$key = {
  readonly " $data"?: ReportArtistSubmissionModal_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"ReportArtistSubmissionModal_ArtistSubmission">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ReportArtistSubmissionModal_ArtistSubmission",
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

(node as any).hash = "6a085c13c59effe7312e7184d2cf66cf";

export default node;
