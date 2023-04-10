/**
 * @generated SignedSource<<af5d386467ede91bb345c6a9f01f4144>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type NftDisclosureTypeExpress_enum = "AiArt" | "Derivative" | "Nsfw" | "%future added value";
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
export type PriceFunctionTypeExpress_enum = "Constant" | "Linear" | "Minimum" | "%future added value";
export type UnlockableCategory = "DigitalDownload" | "Merch" | "Other" | "PhysicalOriginal" | "PhysicalPrint" | "%future added value";
export type InsertNftTransactionInput = {
  comment?: string | null;
  creatorId: string;
  currencyName?: CurrencyNameExpress_enum | null;
  editionsInput?: InsertNftTransactionEditionsInput | null;
  fromUserId: string;
  id?: string | null;
  insertNftInput?: InsertNftInput | null;
  insertPnftInput?: InsertPnftInput | null;
  insertStandardEditionInput?: InsertStandardEditionInput | null;
  ixIndex?: number | null;
  ixInnerIndex?: number | null;
  mint: string;
  offerTransactionId?: string | null;
  price?: number | null;
  timeCreatedFallback?: string | null;
  toUserId: string;
  txid: string;
  type: NftTransactionTypeExpress_enum;
  updateClaimInput?: InsertNftTransactionUpdateClaimInput | null;
  updateNftInput?: InsertNftTransactionUpdateNftInput | null;
};
export type InsertNftTransactionEditionsInput = {
  allowlistAddresses?: ReadonlyArray<string> | null;
  allowlistAmountAllowed?: number | null;
  allowlistEnabled?: boolean | null;
  allowlistPrice?: number | null;
  allowlistStartTime?: string | null;
  priceFunctionType: PriceFunctionTypeExpress_enum;
  priceParams: ReadonlyArray<number>;
  publicSaleStartTime?: string | null;
  startingPriceInLamports: number;
};
export type InsertNftInput = {
  assetArweaveTxid: string;
  assetHeight?: number | null;
  assetWidth?: number | null;
  attributes?: ReadonlyArray<NftAttributeInput> | null;
  contentType: string;
  creatorId: string;
  creatorsMetadataString: string;
  description: string;
  disclosures?: ReadonlyArray<NftDisclosureInput> | null;
  editionNonce?: number | null;
  image: string;
  isPnft?: boolean | null;
  maxSupply?: number | null;
  metadataArweaveTxid: string;
  mint: string;
  name: string;
  nonstandardAsset?: AssetInput | null;
  ownerId: string;
  sellerFeeBasisPoints: number;
  seriesMint?: string | null;
  status: NftStatusExpress_enum;
};
export type NftAttributeInput = {
  traitType: string;
  value: string;
};
export type NftDisclosureInput = {
  details?: string | null;
  type: NftDisclosureTypeExpress_enum;
};
export type AssetInput = {
  arweaveTxid?: string | null;
  contentType: string;
  dimensions?: AssetDimensionsInput | null;
  downloadUrl: string;
  path: string;
};
export type AssetDimensionsInput = {
  height: number;
  width: number;
};
export type InsertPnftInput = {
  edition: number;
  ownerId: string;
  pnftLimitedEditionMint: string;
  pnftMasterEditionMint: string;
};
export type InsertStandardEditionInput = {
  masterEditionMint: string;
  ownerId: string;
  standardEditionMint: string;
};
export type InsertNftTransactionUpdateClaimInput = {
  claimId: string;
};
export type InsertNftTransactionUpdateNftInput = {
  antiBotProtectionEnabled?: boolean | null;
  auctionDurationInSeconds?: number | null;
  editionBuyLimitPerAddress?: number | null;
  insertUnlockableInput?: InsertUnlockableInput | null;
  pnftIdForAuction?: string | null;
  scheduledAuctionTime?: string | null;
  tickSizeConstantInLamports?: number | null;
  timeExtensionDurationInSeconds?: number | null;
};
export type InsertUnlockableInput = {
  asset: AssetInput;
  unlockable: UnlockableInput;
};
export type UnlockableInput = {
  activationPriceInLamports?: number | null;
  category: UnlockableCategory;
  description?: string | null;
  id: string;
  name: string;
};
export type useMintNftMutation$variables = {
  insertNftTransactionInput: InsertNftTransactionInput;
};
export type useMintNftMutation$data = {
  readonly insertNftTransaction: {
    readonly transaction: {
      readonly " $fragmentSpreads": FragmentRefs<"NftTransaction_NftTransactionExpress">;
    };
  };
};
export type useMintNftMutation = {
  response: useMintNftMutation$data;
  variables: useMintNftMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "insertNftTransactionInput"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "insertNftTransactionInput"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "username",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "concreteType": "PhotoExpress",
    "kind": "LinkedField",
    "name": "ProfilePhoto",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "photoUrl",
        "storageKey": null
      },
      (v2/*: any*/)
    ],
    "storageKey": null
  },
  (v2/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useMintNftMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NftTransaction_NftTransactionExpress"
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "useMintNftMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "comment",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fromAddress",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NftTransactionNftInfo",
                "kind": "LinkedField",
                "name": "nftInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "edition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxSupply",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "price",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "amount",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CurrencyExpress",
                    "kind": "LinkedField",
                    "name": "currencyInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "decimals",
                        "storageKey": null
                      },
                      (v2/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "symbol",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "shortSymbol",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "name",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "source",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "timeCreated",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "toAddress",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "txid",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "usdPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "From",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "To",
                "plural": false,
                "selections": (v3/*: any*/),
                "storageKey": null
              },
              (v2/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cac3ca83dbbbedf851c3c93d93eb14f3",
    "id": null,
    "metadata": {},
    "name": "useMintNftMutation",
    "operationKind": "mutation",
    "text": "mutation useMintNftMutation(\n  $insertNftTransactionInput: InsertNftTransactionInput!\n) {\n  insertNftTransaction(input: $insertNftTransactionInput) {\n    transaction {\n      ...NftTransaction_NftTransactionExpress\n      id\n    }\n  }\n}\n\nfragment NftTransaction_NftTransactionExpress on NftTransactionExpress {\n  auctionCount\n  comment\n  fromAddress\n  nftInfo {\n    edition\n    maxSupply\n  }\n  price {\n    ...PriceWithSymbol_Price\n    ...useFormattedNftPrice_Price\n    currencyInfo {\n      name\n      id\n    }\n  }\n  source\n  timeCreated\n  toAddress\n  txid\n  type\n  usdPrice\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  To {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "bfa5e1918c5c0a3625b037bbf951b7b6";

export default node;
