/**
 * @generated SignedSource<<9bb1f837e4dcd2b970e10bdc1dfadac1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CancelOfferModal_MetadataAccount$data = {
  readonly id: string;
  readonly mint: string;
  readonly " $fragmentType": "CancelOfferModal_MetadataAccount";
};
export type CancelOfferModal_MetadataAccount$key = {
  readonly " $data"?: CancelOfferModal_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"CancelOfferModal_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CancelOfferModal_MetadataAccount",
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "116dc505d8fb536f65405a5ba5621e91";

export default node;
