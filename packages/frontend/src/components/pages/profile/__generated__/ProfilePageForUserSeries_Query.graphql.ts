/**
 * @generated SignedSource<<c0d7a8fe401a64e3cd5ca068f52ad9bc>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfilePageForUserSeries_Query$data = {
  readonly Series: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ManageSeriesModal_Series">;
  }>;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileSeriesSeries_Query">;
  readonly " $fragmentType": "ProfilePageForUserSeries_Query";
};
export type ProfilePageForUserSeries_Query$key = {
  readonly " $data"?: ProfilePageForUserSeries_Query$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfilePageForUserSeries_Query">;
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
  "name": "ProfilePageForUserSeries_Query",
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
          "args": null,
          "kind": "FragmentSpread",
          "name": "ManageSeriesModal_Series"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProfileSeriesSeries_Query"
    }
  ],
  "type": "query_root",
  "abstractKey": null
};

(node as any).hash = "c91233f6ac67eee12c663fadc61805c5";

export default node;
