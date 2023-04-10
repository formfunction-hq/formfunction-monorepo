/**
 * @generated SignedSource<<945045a182e6d124bb5d22d676a891a6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesRow_Series$data = {
  readonly AvatarPhoto: {
    readonly photoUrl: string;
  };
  readonly id: string;
  readonly name: string;
  readonly " $fragmentType": "SeriesRow_Series";
};
export type SeriesRow_Series$key = {
  readonly " $data"?: SeriesRow_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesRow_Series">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesRow_Series",
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
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "AvatarPhoto",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "photoUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "79eb06ddecd1852d6ccabc2ee48144b7";

export default node;
