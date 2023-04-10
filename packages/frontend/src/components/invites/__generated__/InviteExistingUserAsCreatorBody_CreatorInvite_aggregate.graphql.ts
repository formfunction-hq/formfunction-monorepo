/**
 * @generated SignedSource<<2698ae0efe79d63b1cbc3dca9e5b1083>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type InviteExistingUserAsCreatorBody_CreatorInvite_aggregate$data = {
  readonly aggregate: {
    readonly count: number;
  } | null;
  readonly " $fragmentType": "InviteExistingUserAsCreatorBody_CreatorInvite_aggregate";
};
export type InviteExistingUserAsCreatorBody_CreatorInvite_aggregate$key = {
  readonly " $data"?: InviteExistingUserAsCreatorBody_CreatorInvite_aggregate$data;
  readonly " $fragmentSpreads": FragmentRefs<"InviteExistingUserAsCreatorBody_CreatorInvite_aggregate">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "InviteExistingUserAsCreatorBody_CreatorInvite_aggregate",
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

(node as any).hash = "edb7bc86f698d9b33b9da8291d1cf34f";

export default node;
