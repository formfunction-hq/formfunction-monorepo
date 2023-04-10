/**
 * @generated SignedSource<<fa62c6b0b60d050bd7969fe9f00e9aac>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpotlightArtistPills_SpotlightExpress$data = {
  readonly spotlightInfo: {
    readonly users: ReadonlyArray<{
      readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
    }>;
  };
  readonly " $fragmentType": "SpotlightArtistPills_SpotlightExpress";
};
export type SpotlightArtistPills_SpotlightExpress$key = {
  readonly " $data"?: SpotlightArtistPills_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightArtistPills_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightArtistPills_SpotlightExpress",
  "selections": [
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "users",
          "plural": true,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtistPillButtonForUserExpress_UserExpress"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "SpotlightExpress",
  "abstractKey": null
};

(node as any).hash = "db8453bef78d887b36340fc23bf4a285";

export default node;
