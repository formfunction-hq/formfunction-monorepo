/**
 * @generated SignedSource<<10e1f0fa6b87106bbafa4c60aad3d408>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ManageSeriesPiecesModal_Series$data = {
  readonly Creator: {
    readonly id: string;
    readonly username: string;
  };
  readonly id: string;
  readonly mint: string;
  readonly slug: string;
  readonly " $fragmentType": "ManageSeriesPiecesModal_Series";
};
export type ManageSeriesPiecesModal_Series$key = {
  readonly " $data"?: ManageSeriesPiecesModal_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"ManageSeriesPiecesModal_Series">;
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
  "name": "ManageSeriesPiecesModal_Series",
  "selections": [
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
      "name": "slug",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "Creator",
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
    }
  ],
  "type": "Series",
  "abstractKey": null
};
})();

(node as any).hash = "d60637e364ed03a8e0e1cb6cc4386e3f";

export default node;
