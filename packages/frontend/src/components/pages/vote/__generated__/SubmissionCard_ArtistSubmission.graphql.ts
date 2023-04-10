/**
 * @generated SignedSource<<cb3d3abcdb3f0baf0ae97df1987716f4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SubmissionCard_ArtistSubmission$data = {
  readonly User: {
    readonly id: string;
    readonly username: string;
  };
  readonly artistStatement: string;
  readonly id: string;
  readonly instagramName: string | null;
  readonly twitterName: string;
  readonly websiteUrl: string;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCardAssets_ArtistSubmission">;
  readonly " $fragmentType": "SubmissionCard_ArtistSubmission";
};
export type SubmissionCard_ArtistSubmission$key = {
  readonly " $data"?: SubmissionCard_ArtistSubmission$data;
  readonly " $fragmentSpreads": FragmentRefs<"SubmissionCard_ArtistSubmission">;
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
  "name": "SubmissionCard_ArtistSubmission",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "artistStatement",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "instagramName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "twitterName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "websiteUrl",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "User",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmissionCardAssets_ArtistSubmission"
    }
  ],
  "type": "ArtistSubmission",
  "abstractKey": null
};
})();

(node as any).hash = "dcc5745e155d859d6a87029d7a86bab6";

export default node;
