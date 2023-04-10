/**
 * @generated SignedSource<<4071e4f71ec80343278a278f462c18f7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileSeriesSeries_Query$data = {
  readonly Series: ReadonlyArray<{
    readonly id: string;
    readonly mint: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"SeriesCard_Series">;
  }>;
  readonly " $fragmentType": "ProfileSeriesSeries_Query";
};
export type ProfileSeriesSeries_Query$key = {
  readonly " $data"?: ProfileSeriesSeries_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileSeriesSeries_Query">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "kind": "RootArgument",
      "name": "seriesOrderBy"
    },
    {
      "kind": "RootArgument",
      "name": "seriesWhere"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileSeriesSeries_Query",
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "order_by",
          "variableName": "seriesOrderBy"
        },
        {
          "kind": "Variable",
          "name": "where",
          "variableName": "seriesWhere"
        }
      ],
      "concreteType": "Series",
      "kind": "LinkedField",
      "name": "Series",
      "plural": true,
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
          "name": "name",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "SeriesCard_Series"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "query_root",
  "abstractKey": null
};

(node as any).hash = "26c5b99a9bddf00057589be4e8048e2c";

export default node;
