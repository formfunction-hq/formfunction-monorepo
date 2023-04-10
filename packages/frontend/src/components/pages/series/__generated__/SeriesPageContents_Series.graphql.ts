/**
 * @generated SignedSource<<6a144a347f5dfd80061a4effcedde9e4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SeriesType_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SeriesPageContents_Series$data = {
  readonly AvatarPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  };
  readonly CoverPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  } | null;
  readonly Nfts_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly description: string;
  readonly id: string;
  readonly name: string;
  readonly type: SeriesType_enum;
  readonly " $fragmentSpreads": FragmentRefs<"EditSeriesModal_Series" | "ManageSeriesPiecesModal_Series" | "SeriesMetadataContext_Series">;
  readonly " $fragmentType": "SeriesPageContents_Series";
};
export type SeriesPageContents_Series$key = {
  readonly " $data"?: SeriesPageContents_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesPageContents_Series">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = [
  (v0/*: any*/),
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
  "name": "SeriesPageContents_Series",
  "selections": [
    (v0/*: any*/),
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
      "name": "type",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "AvatarPhoto",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Photo",
      "kind": "LinkedField",
      "name": "CoverPhoto",
      "plural": false,
      "selections": (v1/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": [
        {
          "kind": "Literal",
          "name": "where",
          "value": {
            "status": {
              "_neq": "Burned"
            }
          }
        }
      ],
      "concreteType": "Nft_aggregate",
      "kind": "LinkedField",
      "name": "Nfts_aggregate",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Nft_aggregate_fields",
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
      "storageKey": "Nfts_aggregate(where:{\"status\":{\"_neq\":\"Burned\"}})"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ManageSeriesPiecesModal_Series"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SeriesMetadataContext_Series"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "EditSeriesModal_Series"
    }
  ],
  "type": "Series",
  "abstractKey": null
};
})();

(node as any).hash = "0043f37a11dd59684a07b6db5a06f4de";

export default node;
