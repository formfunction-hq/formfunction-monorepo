/**
 * @generated SignedSource<<3d6de73266b54fdf9222f72fe257fd60>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionCardAssets_ArtistSubmission$data = {
  readonly Assets: ReadonlyArray<{
    readonly contentType: string;
    readonly downloadUrl: string;
    readonly id: string;
    readonly path: string;
  }>;
  readonly id: string;
  readonly " $fragmentType": "SubmissionCardAssets_ArtistSubmission";
};
export type SubmissionCardAssets_ArtistSubmission$key = {
  readonly " $data"?: SubmissionCardAssets_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardAssets_ArtistSubmission">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SubmissionCardAssets_ArtistSubmission",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "Asset",
      "kind": "LinkedField",
      "name": "Assets",
      "plural": true,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "contentType",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "downloadUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};
})();

(node as any).hash = "8f8548b1eceeab409a5caf83b1624462";

export default node;
