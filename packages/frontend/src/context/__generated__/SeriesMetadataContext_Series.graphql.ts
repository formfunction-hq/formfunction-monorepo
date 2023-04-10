/**
 * @generated SignedSource<<b7ee44f76a1231b46c2fe4006b900ebc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesMetadataContext_Series$data = {
  readonly AvatarPhoto: {
    readonly photoUrl: string;
  };
  readonly CoverPhoto: {
    readonly photoUrl: string;
  } | null;
  readonly description: string;
  readonly name: string;
  readonly slug: string;
  readonly " $fragmentType": "SeriesMetadataContext_Series";
};
export type SeriesMetadataContext_Series$key = {
  readonly " $data"?: SeriesMetadataContext_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesMetadataContext_Series">;
};

const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "photoUrl",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesMetadataContext_Series",
  "selections": [
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
      "kind": "ScalarField",
      "name": "description",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "AvatarPhoto",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "CoverPhoto",
      "plural": false,
      "selections": (v0/*: any*/),
      "storageKey": null
    }
  ],
  "type": "Series",
  "abstractKey": null
};
})();

(node as any).hash = "77f75e136a5700e554987e0dc8996639";

export default node;
