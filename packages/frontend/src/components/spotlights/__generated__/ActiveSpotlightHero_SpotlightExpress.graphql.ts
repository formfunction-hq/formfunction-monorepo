/**
 * @generated SignedSource<<6fdb6e75486ee8cb15e959b1d119e4fb>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type SpotlightExpressHeroUnitLayout_enum = "Standard" | "TwoColumnSquareImage" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ActiveSpotlightHero_SpotlightExpress$data = {
  readonly endTime: string;
  readonly heroUnitLayout: SpotlightExpressHeroUnitLayout_enum;
  readonly spotlightInfo: {
    readonly asset: {
      readonly contentType: string;
      readonly downloadUrl: string;
    };
    readonly description: string;
    readonly label: string;
    readonly title: string;
  };
  readonly startTime: string;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightArtistPills_SpotlightExpress" | "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress">;
  readonly " $fragmentType": "ActiveSpotlightHero_SpotlightExpress";
};
export type ActiveSpotlightHero_SpotlightExpress$key = {
  readonly " $data"?: ActiveSpotlightHero_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActiveSpotlightHero_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActiveSpotlightHero_SpotlightExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "startTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "endTime",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "heroUnitLayout",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "SpotlightInfo",
      "kind": "LinkedField",
      "name": "spotlightInfo",
      "plural": false,
      "selections": [
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
          "name": "label",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "asset",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "contentType",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "downloadUrl",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "title",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightArtistPills_SpotlightExpress"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SpotlightGoToUrlOrShowDetailsModal_SpotlightExpress"
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "061f8860fc07340e1e22f78fab33fcb7";

export default node;
