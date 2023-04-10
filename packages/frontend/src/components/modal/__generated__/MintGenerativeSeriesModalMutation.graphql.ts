/**
 * @generated SignedSource<<0cb6c6ab52f64193494fcdda57465849>>
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
export type MintGenerativeSeriesModalMutation$variables = {
  insertNftTransactionInput: InsertNftTransactionInput;
  metadataAccountConnections: ReadonlyArray<string>;
};
export type MintGenerativeSeriesModalMutation$data = {
  readonly insertNftTransaction: {
    readonly updatedMetadataAccount: {
      readonly assetHeight: number | null;
      readonly assetWidth: number | null;
      readonly mint: string;
      readonly nft: {
        readonly Creator: {
          readonly username: string;
        } | null;
      };
      readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
    };
  };
};
export type MintGenerativeSeriesModalMutation = {
  response: MintGenerativeSeriesModalMutation$data;
  variables: MintGenerativeSeriesModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "insertNftTransactionInput"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "metadataAccountConnections"
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
  "name": "assetHeight",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "assetWidth",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v7 = {
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
    (v6/*: any*/)
  ],
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v9 = [
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
      (v6/*: any*/),
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
    "name": "MintGenerativeSeriesModalMutation",
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
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Creator",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/)
                    ],
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
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "ListingCardForMetadata_MetadataAccount"
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
    "name": "MintGenerativeSeriesModalMutation",
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
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/),
              (v4/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Creator",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/),
                      (v7/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v6/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "creatorId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isImported",
                    "storageKey": null
                  },
                  (v8/*: any*/),
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "masterEditionMint",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Owner",
                    "plural": false,
                    "selections": [
                      (v5/*: any*/),
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isMasterEdition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPnft",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxSupplyOnchain",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxSupplyOfMasterEdition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CandyMachineExpress",
                    "kind": "LinkedField",
                    "name": "CandyMachine",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      },
                      (v6/*: any*/)
                    ],
                    "storageKey": null
                  },
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
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfStandardEditionsMinted",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionEndTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionHoldingPeriodEndTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isOffPlatform",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceV2",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceLastSoldV2",
                    "plural": false,
                    "selections": (v9/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "scheduledAuctionTime",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v6/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contentType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "primarySaleHappened",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "videoPlaybackId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "videoPreviewPlaybackId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MetadataAccountData",
                "kind": "LinkedField",
                "name": "data",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "name",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MetadataCreator",
                    "kind": "LinkedField",
                    "name": "creators",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "share",
                        "storageKey": null
                      },
                      (v8/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v7/*: any*/),
                          (v6/*: any*/)
                        ],
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
                "concreteType": "MetadataOffchain",
                "kind": "LinkedField",
                "name": "offchainData",
                "plural": false,
                "selections": [
                  {
                    "alias": "listingCardImage",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "image",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "numberOfBidsForCurrentAuction",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "updatedMetadataAccount",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "metadataAccountConnections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "MetadataAccountsEdge"
              }
            ]
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "d151b0665a79a930ecf6f4e4611272ef",
    "id": null,
    "metadata": {},
    "name": "MintGenerativeSeriesModalMutation",
    "operationKind": "mutation",
    "text": "mutation MintGenerativeSeriesModalMutation(\n  $insertNftTransactionInput: InsertNftTransactionInput!\n) {\n  insertNftTransaction(input: $insertNftTransactionInput) {\n    updatedMetadataAccount {\n      assetHeight\n      assetWidth\n      mint\n      nft {\n        Creator {\n          username\n          id\n        }\n        id\n      }\n      id\n      ...ListingCardForMetadata_MetadataAccount\n    }\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "073a4ec3f7a71a09ba4395bcc8b1fd0b";

export default node;
