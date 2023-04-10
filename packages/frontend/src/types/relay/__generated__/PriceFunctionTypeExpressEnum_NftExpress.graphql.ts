/**
 * @generated SignedSource<<e73214bc9841649a71b776ea1293e7c1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PriceFunctionTypeExpress_enum = "Constant" | "Linear" | "Minimum" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PriceFunctionTypeExpressEnum_NftExpress$data = {
  readonly editionPriceInfo: {
    readonly priceFunctionType: PriceFunctionTypeExpress_enum;
  } | null;
  readonly " $fragmentType": "PriceFunctionTypeExpressEnum_NftExpress";
};
export type PriceFunctionTypeExpressEnum_NftExpress$key = {
  readonly " $data"?: PriceFunctionTypeExpressEnum_NftExpress$data;
  readonly " $fragmentSpreads": FragmentRefs<"PriceFunctionTypeExpressEnum_NftExpress">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PriceFunctionTypeExpressEnum_NftExpress",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EditionPriceInfo",
      "kind": "LinkedField",
      "name": "editionPriceInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "priceFunctionType",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftExpress",
  "abstractKey": null
};

(node as any).hash = "3f91c7b4ce3529d93c1a3bd1cc15761f";

export default node;
