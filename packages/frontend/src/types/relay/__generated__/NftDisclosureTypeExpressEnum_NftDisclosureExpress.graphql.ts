/**
 * @generated SignedSource<<47e47c89c336b1534daaa6abff306bf0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftDisclosureTypeExpress_enum = "AiArt" | "Derivative" | "Nsfw" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftDisclosureTypeExpressEnum_NftDisclosureExpress$data = {
  readonly type: NftDisclosureTypeExpress_enum;
  readonly " $fragmentType": "NftDisclosureTypeExpressEnum_NftDisclosureExpress";
};
export type NftDisclosureTypeExpressEnum_NftDisclosureExpress$key = {
  readonly " $data"?: NftDisclosureTypeExpressEnum_NftDisclosureExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftDisclosureTypeExpressEnum_NftDisclosureExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftDisclosureTypeExpressEnum_NftDisclosureExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "type",
      "storageKey": null
    }
  ],
  "type": "NftDisclosureExpress",
  "abstractKey": null
};

(node as any).hash = "5f1b206d7a54e29fd276bdb3a335f5b7";

export default node;
