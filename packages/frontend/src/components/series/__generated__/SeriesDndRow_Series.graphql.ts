/**
 * @generated SignedSource<<c2bf75d4629a4d68f234cf42f1a1de81>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesDndRow_Series$data = {
  readonly Nfts_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
  };
  readonly id: string;
  readonly mint: string;
  readonly name: string;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesRow_Series">;
  readonly " $fragmentType": "SeriesDndRow_Series";
};
export type SeriesDndRow_Series$key = {
  readonly " $data"?: SeriesDndRow_Series$data;
  readonly " $fragmentSpreads": FragmentRefs<"SeriesDndRow_Series">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SeriesDndRow_Series",
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
      "kind": "ScalarField",
      "name": "mint",
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
      "name": "SeriesRow_Series"
    }
  ],
  "type": "Series",
  "abstractKey": null
};

(node as any).hash = "ba3e4c4f646203a0afaad96e2710fe30";

export default node;
