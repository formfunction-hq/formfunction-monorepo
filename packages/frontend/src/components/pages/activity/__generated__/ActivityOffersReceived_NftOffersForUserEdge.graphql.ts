/**
 * @generated SignedSource<<d84287d63186a602feebb4dba5bca1e9>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityOffersReceived_NftOffersForUserEdge$data = ReadonlyArray<{
  readonly node: {
    readonly isValid: boolean;
    readonly " $fragmentSpreads": FragmentRefs<"NftOfferForActivity_NftOfferForUser">;
  };
  readonly " $fragmentType": "ActivityOffersReceived_NftOffersForUserEdge";
}>;
export type ActivityOffersReceived_NftOffersForUserEdge$key = ReadonlyArray<{
  readonly " $data"?: ActivityOffersReceived_NftOffersForUserEdge$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityOffersReceived_NftOffersForUserEdge">;
}>;

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ActivityOffersReceived_NftOffersForUserEdge",
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isValid",
          "storageKey": null
        },
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

(node as any).hash = "4eea44f2d192566509994a47f208ee55";

export default node;
