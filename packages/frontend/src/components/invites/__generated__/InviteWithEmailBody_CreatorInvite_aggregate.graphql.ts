/**
 * @generated SignedSource<<df9e4cdf4035b7642d5cb69617ed1c29>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InviteWithEmailBody_CreatorInvite_aggregate$data = {
  readonly aggregate: {
    readonly count: number;
  } | null;
  readonly " $fragmentType": "InviteWithEmailBody_CreatorInvite_aggregate";
};
export type InviteWithEmailBody_CreatorInvite_aggregate$key = {
  readonly " $data"?: InviteWithEmailBody_CreatorInvite_aggregate$data;
  readonly " $fragmentSpreads": FragmentRefs<"InviteWithEmailBody_CreatorInvite_aggregate">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteWithEmailBody_CreatorInvite_aggregate",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CreatorInvite_aggregate_fields",
      "kind": "LinkedField",
      "name": "aggregate",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "count",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CreatorInvite_aggregate",
  "abstractKey": null
};

(node as any).hash = "505f9b8af3226dd55df51aed6c5057b4";

export default node;
