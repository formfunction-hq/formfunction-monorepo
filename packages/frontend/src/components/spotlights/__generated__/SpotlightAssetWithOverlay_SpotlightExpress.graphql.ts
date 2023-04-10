/**
 * @generated SignedSource<<e476bdc90b5b3d354ee748f3eb19b279>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SpotlightAssetWithOverlay_SpotlightExpress$data = {
  readonly endTime: string;
  readonly spotlightInfo: {
    readonly asset: {
      readonly " $fragmentSpreads": FragmentRefs<"AssetForAssetExpress_AssetExpress">;
    };
  };
  readonly startTime: string;
  readonly " $fragmentType": "SpotlightAssetWithOverlay_SpotlightExpress";
};
export type SpotlightAssetWithOverlay_SpotlightExpress$key = {
  readonly " $data"?: SpotlightAssetWithOverlay_SpotlightExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"SpotlightAssetWithOverlay_SpotlightExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SpotlightAssetWithOverlay_SpotlightExpress",
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
      "concreteType": "SpotlightInfo",
      "kind": "LinkedField",
      "name": "spotlightInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "asset",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "AssetForAssetExpress_AssetExpress"
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

(node as any).hash = "5a469db59b369e93f4fecc4fd67820de";

export default node;
