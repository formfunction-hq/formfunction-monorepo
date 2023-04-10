/**
 * @generated SignedSource<<a4c5dfd1240fbc2f4f8dd126b0ad4962>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SeriesType_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type SeriesCard_Series$data = {
  readonly AvatarPhoto: {
    readonly id: string;
    readonly photoUrl: string;
  };
  readonly Creator: {
    readonly id: string;
    readonly username: string;
    readonly " $fragmentSpreads": FragmentRefs<"SeriesCardImageForUser_User">;
  };
  readonly Nfts_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly id: string;
  readonly name: string;
  readonly slug: string;
  readonly type: SeriesType_enum;
  readonly " $fragmentType": "SeriesCard_Series";
};
export type SeriesCard_Series$key = {
  readonly " $data"?: SeriesCard_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesCard_Series">;
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
  "name": "SeriesCard_Series",
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
      "name": "name",
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeriesCardImageForUser_User"
        }
      ],
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
    }
  ],
  "type": "Series",
  "abstractKey": null
};
})();

(node as any).hash = "b3f145da4f14cdcd40481042fbf22285";

export default node;
