/**
 * @generated SignedSource<<5ddddf86aa26f21a128738e4c70d8bb2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditSeriesModal_Series$data = {
  readonly AvatarPhoto: {
    readonly storagePath: string | null;
  };
  readonly avatarPhotoId: string;
  readonly coverPhotoId: string | null;
  readonly id: string;
  readonly mint: string;
  readonly " $fragmentType": "EditSeriesModal_Series";
};
export type EditSeriesModal_Series$key = {
  readonly " $data"?: EditSeriesModal_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditSeriesModal_Series">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditSeriesModal_Series",
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
      "name": "mint",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "avatarPhotoId",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "coverPhotoId",
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
          "name": "storagePath",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "7e77ba2211b68f742387c730de79a20a";

export default node;
