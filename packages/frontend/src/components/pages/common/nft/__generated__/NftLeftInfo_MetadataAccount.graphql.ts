/**
 * @generated SignedSource<<6d61d86b60ce7890f0da9e3634e1d4f8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type SeriesTypeExpress_enum = "GenerativeMint" | "UserCurated" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftLeftInfo_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
    readonly sellerFeeBasisPoints: number;
  };
  readonly mint: string;
  readonly nft: {
    readonly Series: {
      readonly AvatarPhoto: {
        readonly photoUrl: string;
      };
      readonly Creator: {
        readonly username: string;
      };
      readonly name: string;
      readonly slug: string;
      readonly type: SeriesTypeExpress_enum;
    } | null;
    readonly auctionDurationInSeconds: number;
    readonly priceV2: {
      readonly currencyInfo: {
        readonly decimals: number;
      };
      readonly " $fragmentSpreads": FragmentRefs<"useNftPriceSymbol_Price">;
    } | null;
    readonly status: NftStatusExpress_enum;
    readonly tickSizeInfo: {
      readonly tickSizeConstantInLamports: number | null;
    };
    readonly timeExtensionDurationInSeconds: number;
  };
  readonly " $fragmentSpreads": FragmentRefs<"NftAttributes_MetadataAccount" | "NftLeftInfoEditionInfo_MetadataAccount" | "NftTags_MetadataAccount">;
  readonly " $fragmentType": "NftLeftInfo_MetadataAccount";
};
export type NftLeftInfo_MetadataAccount$key = {
  readonly " $data"?: NftLeftInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftLeftInfo_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftLeftInfo_MetadataAccount",
  "selections": [
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
      "concreteType": "MetadataAccountData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "sellerFeeBasisPoints",
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
          "name": "auctionDurationInSeconds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "status",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timeExtensionDurationInSeconds",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "Price",
          "kind": "LinkedField",
          "name": "priceV2",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "useNftPriceSymbol_Price"
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
          "concreteType": "TickSizeInfo",
          "kind": "LinkedField",
          "name": "tickSizeInfo",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "tickSizeConstantInLamports",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "SeriesExpress",
          "kind": "LinkedField",
          "name": "Series",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "slug",
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
              "concreteType": "PhotoExpress",
              "kind": "LinkedField",
              "name": "AvatarPhoto",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "photoUrl",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "Creator",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "username",
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftLeftInfoEditionInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftTags_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftAttributes_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "be1df97488b016eff22b0824b2e44f27";

export default node;
