/**
 * @generated SignedSource<<432918b7ade25201fab80275f5591bd4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type ExploreAvailabilityV2 = "Available" | "InstantSale" | "LiveAuction" | "LiveAuctionWithBids" | "LiveAuctionWithoutBids" | "ReservePrice" | "Sold" | "SoldOut" | "%future added value";
export type ExploreExtra = "HasPnft" | "HasUnlockable" | "%future added value";
export type ExploreMarket = "Primary" | "Secondary" | "%future added value";
export type ExploreSortOrder = "AuctionEndEarliest" | "AuctionEndLatest" | "FewestPieces" | "HighestPrice" | "LeastRecentlyAddedTo" | "LowestPrice" | "MostPieces" | "MostRecentlyAddedTo" | "MostRecentlySold" | "NameAscending" | "NameDescending" | "Newest" | "Oldest" | "RarityHighest" | "RarityLowest" | "%future added value";
export type NftKind = "Generative" | "MasterEditionWithNonzeroSupply" | "MasterEditionWithUnlimitedSupply" | "OneOfOne" | "PnftMasterEdition" | "PnftStandardEdition" | "StandardEditionPrintNonzeroSupply" | "StandardEditionPrintUnlimitedSupply" | "%future added value";
export type MetadataAccountsForExploreInput = {
  attributes?: ReadonlyArray<NftAttributeInput> | null;
  availabilitySet: ReadonlyArray<ExploreAvailabilityV2>;
  contentTypes?: ReadonlyArray<string> | null;
  currencyNames?: ReadonlyArray<CurrencyNameExpress_enum | null> | null;
  extras?: ReadonlyArray<ExploreExtra> | null;
  highPriceLamports?: number | null;
  lowPriceLamports?: number | null;
  market: ReadonlyArray<ExploreMarket>;
  nftKind: ReadonlyArray<NftKind>;
  ownerId?: string | null;
  series?: MetadataAccountsForExploreSeriesInput | null;
  sortOrder: ExploreSortOrder;
  tag?: string | null;
};
export type NftAttributeInput = {
  traitType: string;
  value: string;
};
export type MetadataAccountsForExploreSeriesInput = {
  creatorId?: string | null;
  creatorUsername?: string | null;
  seriesSlug: string;
};
export type getNftKindQueryValuesForTabQuery$variables = {
  input: MetadataAccountsForExploreInput;
};
export type getNftKindQueryValuesForTabQuery$data = {
  readonly metadataAccountsForExplore: {
    readonly metadataAccounts: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly id: string;
        };
      }>;
    };
  };
};
export type getNftKindQueryValuesForTabQuery = {
  response: getNftKindQueryValuesForTabQuery$data;
  variables: getNftKindQueryValuesForTabQuery$variables;
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
    "alias": null,
    "args": null,
    "concreteType": "MetadataAccountsForExploreResponse",
    "kind": "LinkedField",
    "name": "metadataAccountsForExplore",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Literal",
            "name": "after",
            "value": "0"
          },
          {
            "kind": "Literal",
            "name": "first",
            "value": 0
          },
          {
            "kind": "Variable",
            "name": "input",
            "variableName": "input"
          }
        ],
        "concreteType": "MetadataAccountsConnection",
        "kind": "LinkedField",
        "name": "metadataAccounts",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccountsEdge",
            "kind": "LinkedField",
            "name": "edges",
            "plural": true,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "MetadataAccount",
                "kind": "LinkedField",
                "name": "node",
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
            ],
            "storageKey": null
          }
        ],
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
    "name": "getNftKindQueryValuesForTabQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "getNftKindQueryValuesForTabQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "9c0464c0202cdfb72cc6642cc1d4aaaa",
    "id": null,
    "metadata": {},
    "name": "getNftKindQueryValuesForTabQuery",
    "operationKind": "query",
    "text": "query getNftKindQueryValuesForTabQuery(\n  $input: MetadataAccountsForExploreInput!\n) {\n  metadataAccountsForExplore {\n    metadataAccounts(after: \"0\", first: 0, input: $input) {\n      edges {\n        node {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "d3f537568f6690a68f72858a29f39e32";

export default node;
