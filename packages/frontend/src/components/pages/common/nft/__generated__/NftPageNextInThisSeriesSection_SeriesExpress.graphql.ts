/**
 * @generated SignedSource<<804f7d3fb2732bc7773170f5ccc52e50>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SeriesTypeExpress_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftPageNextInThisSeriesSection_SeriesExpress$data = {
  readonly AvatarPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  };
  readonly Creator: {
    readonly username: string;
  };
  readonly id: string;
  readonly slug: string;
  readonly type: SeriesTypeExpress_enum;
  readonly " $fragmentType": "NftPageNextInThisSeriesSection_SeriesExpress";
};
export type NftPageNextInThisSeriesSection_SeriesExpress$key = {
  readonly " $data"?: NftPageNextInThisSeriesSection_SeriesExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftPageNextInThisSeriesSection_SeriesExpress">;
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
  "name": "NftPageNextInThisSeriesSection_SeriesExpress",
  "selections": [
    (v0/*: any*/),
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
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "PhotoExpress",
      "kind": "LinkedField",
      "name": "AvatarPhoto",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "photoUrl",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "Creator",
      "plural": false,
      "selections": [
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
  "type": "SeriesExpress",
  "abstractKey": null
};
})();

(node as any).hash = "6b943859961554d97037e052189cbd29";

export default node;
