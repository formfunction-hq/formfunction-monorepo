/**
 * @generated SignedSource<<def7b02687fed3a3aca1259d3d8253e1>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
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
export type ExploreExtraPaginationQuery$variables = {
  after?: string | null;
  first: number;
  input: MetadataAccountsForExploreInput;
};
export type ExploreExtraPaginationQuery$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ExploreExtra_Query">;
};
export type ExploreExtraPaginationQuery = {
  response: ExploreExtraPaginationQuery$data;
  variables: ExploreExtraPaginationQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "after"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "first"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "after"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "first"
  },
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "input"
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "ExploreExtraPaginationQuery",
    "selections": [
      {
        "args": null,
        "kind": "FragmentSpread",
        "name": "ExploreExtra_Query"
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ExploreExtraPaginationQuery",
    "selections": [
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
            "args": (v1/*: any*/),
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
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "__typename",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "cursor",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "PageInfo",
                "kind": "LinkedField",
                "name": "pageInfo",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "endCursor",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "hasNextPage",
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
            "args": (v1/*: any*/),
            "filters": [
              "input"
            ],
            "handle": "connection",
            "key": "ExploreExtra_Query_metadataAccounts",
            "kind": "LinkedHandle",
            "name": "metadataAccounts"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "692a300ad1917d648a3498240247d75e",
    "id": null,
    "metadata": {},
    "name": "ExploreExtraPaginationQuery",
    "operationKind": "query",
    "text": "query ExploreExtraPaginationQuery(\n  $after: String\n  $first: Int!\n  $input: MetadataAccountsForExploreInput!\n) {\n  ...ExploreExtra_Query\n}\n\nfragment ExploreExtra_Query on query_root {\n  metadataAccountsForExplore {\n    metadataAccounts(after: $after, first: $first, input: $input) {\n      edges {\n        node {\n          id\n          __typename\n        }\n        cursor\n      }\n      pageInfo {\n        endCursor\n        hasNextPage\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "3faedb90ebd30522acfaa99c337d933e";

export default node;
