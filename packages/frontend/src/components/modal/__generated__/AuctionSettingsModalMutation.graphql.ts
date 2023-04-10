/**
 * @generated SignedSource<<97b74080d3217b4ae69234a641a024b0>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type PriceFunctionType_enum = "Constant" | "Linear" | "Minimum" | "%future added value";
export type NftListing_pk_columns_input = {
  nftId: string;
};
export type NftListing_set_input = {
  antiBotProtectionEnabled?: boolean | null;
  auctionDurationInSeconds?: number | null;
  auctionEndTime?: string | null;
  currencyId?: string | null;
  editionAllowlistEnabled?: boolean | null;
  editionAllowlistPrice?: number | null;
  editionAllowlistSaleStartTime?: string | null;
  editionBuyLimitPerAddress?: number | null;
  editionPriceFunctionParams?: any | null;
  editionPriceFunctionStartingPriceInLamports?: number | null;
  editionPriceFunctionType?: PriceFunctionType_enum | null;
  editionPublicSaleStartTime?: string | null;
  id?: string | null;
  isPnftDropActive?: boolean | null;
  nftId?: string | null;
  pnftIdForAuction?: string | null;
  priceInLamports?: number | null;
  scheduledAuctionTime?: string | null;
  tickSizeConstantInLamports?: number | null;
  timeCreated?: string | null;
  timeExtensionDurationInSeconds?: number | null;
  timeLastAuctionAlmostOverEmailSent?: string | null;
  unlockableId?: string | null;
};
export type AuctionSettingsModalMutation$variables = {
  pk_columns: NftListing_pk_columns_input;
  set: NftListing_set_input;
};
export type AuctionSettingsModalMutation$data = {
  readonly update_NftListing_by_pk: {
    readonly id: string;
  } | null;
};
export type AuctionSettingsModalMutation = {
  response: AuctionSettingsModalMutation$data;
  variables: AuctionSettingsModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "pk_columns"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "set"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "_set",
        "variableName": "set"
      },
      {
        "kind": "Variable",
        "name": "pk_columns",
        "variableName": "pk_columns"
      }
    ],
    "concreteType": "NftListing",
    "kind": "LinkedField",
    "name": "update_NftListing_by_pk",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AuctionSettingsModalMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AuctionSettingsModalMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "85e60331d36ba50de54ef797fc68d555",
    "id": null,
    "metadata": {},
    "name": "AuctionSettingsModalMutation",
    "operationKind": "mutation",
    "text": "mutation AuctionSettingsModalMutation(\n  $pk_columns: NftListing_pk_columns_input!\n  $set: NftListing_set_input!\n) {\n  update_NftListing_by_pk(_set: $set, pk_columns: $pk_columns) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "4899ef0cbd7c7238e628084aaa8cf89a";

export default node;
