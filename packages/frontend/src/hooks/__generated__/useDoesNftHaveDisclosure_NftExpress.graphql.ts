/**
 * @generated SignedSource<<21c3f9d95f19c51505648660c39ed19d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftDisclosureTypeExpress_enum = "AiArt" | "Derivative" | "Nsfw" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type useDoesNftHaveDisclosure_NftExpress$data = {
  readonly disclosures: ReadonlyArray<{
    readonly type: NftDisclosureTypeExpress_enum;
  }> | null;
  readonly " $fragmentType": "useDoesNftHaveDisclosure_NftExpress";
};
export type useDoesNftHaveDisclosure_NftExpress$key = {
  readonly " $data"?: useDoesNftHaveDisclosure_NftExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"useDoesNftHaveDisclosure_NftExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useDoesNftHaveDisclosure_NftExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "NftDisclosureExpress",
      "kind": "LinkedField",
      "name": "disclosures",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "type",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftExpress",
  "abstractKey": null
};

(node as any).hash = "00b93d8038e032ea88167ba3f93289ff";

export default node;
