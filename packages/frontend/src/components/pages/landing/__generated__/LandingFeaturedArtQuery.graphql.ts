/**
 * @generated SignedSource<<8f2e7949b928b240f0faaf153f4c7a45>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MetadataAccountsFeaturedInput = {
  isExperimental?: boolean | null;
};
export type LandingFeaturedArtQuery$variables = {
  input?: MetadataAccountsFeaturedInput | null;
};
export type LandingFeaturedArtQuery$data = {
  readonly metadataAccountsFeatured: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
  }>;
};
export type LandingFeaturedArtQuery = {
  response: LandingFeaturedArtQuery$data;
  variables: LandingFeaturedArtQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v4 = {
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
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v6 = [
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
    "name": "LandingFeaturedArtQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MetadataAccount",
        "kind": "LinkedField",
        "name": "metadataAccountsFeatured",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ListingCardForMetadata_MetadataAccount"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LandingFeaturedArtQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "MetadataAccount",
        "kind": "LinkedField",
        "name": "metadataAccountsFeatured",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assetHeight",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "assetWidth",
            "storageKey": null
          },
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
                  (v3/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "user",
                    "plural": false,
                    "selections": [
                      (v4/*: any*/),
                      (v2/*: any*/)
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
            "concreteType": "NftExpress",
            "kind": "LinkedField",
            "name": "nft",
            "plural": false,
            "selections": [
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
              (v3/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "Creator",
                "plural": false,
                "selections": [
                  (v5/*: any*/),
                  (v4/*: any*/),
                  (v2/*: any*/)
                ],
                "storageKey": null
              },
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
              (v2/*: any*/),
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
                  (v2/*: any*/)
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
                  (v2/*: any*/)
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
                "selections": (v6/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "priceLastSoldV2",
                "plural": false,
                "selections": (v6/*: any*/),
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
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "mint",
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
      }
    ]
  },
  "params": {
    "cacheID": "360dd861bcc57d2cd380b7c24656d131",
    "id": null,
    "metadata": {},
    "name": "LandingFeaturedArtQuery",
    "operationKind": "query",
    "text": "query LandingFeaturedArtQuery(\n  $input: MetadataAccountsFeaturedInput\n) {\n  metadataAccountsFeatured(input: $input) {\n    id\n    ...ListingCardForMetadata_MetadataAccount\n  }\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "180b626e428fcd521d6cf210a0521173";

export default node;
