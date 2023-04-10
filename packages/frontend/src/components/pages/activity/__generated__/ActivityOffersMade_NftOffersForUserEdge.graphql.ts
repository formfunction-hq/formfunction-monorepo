/**
 * @generated SignedSource<<1af12d1b585863687976913ff4c57836>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityOffersMade_NftOffersForUserEdge$data = ReadonlyArray<{
  readonly node: {
    readonly " $fragmentSpreads": FragmentRefs<"NftOfferForActivity_NftOfferForUser">;
  };
  readonly " $fragmentType": "ActivityOffersMade_NftOffersForUserEdge";
}>;
export type ActivityOffersMade_NftOffersForUserEdge$key = ReadonlyArray<{
  readonly " $data"?: ActivityOffersMade_NftOffersForUserEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityOffersMade_NftOffersForUserEdge">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ActivityOffersMade_NftOffersForUserEdge",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NftOfferForUser",
      "kind": "LinkedField",
      "name": "node",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftOfferForActivity_NftOfferForUser"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftOffersForUserEdge",
  "abstractKey": null
};

(node as any).hash = "54be11b70669bd4141039be32cfaf719";

export default node;
