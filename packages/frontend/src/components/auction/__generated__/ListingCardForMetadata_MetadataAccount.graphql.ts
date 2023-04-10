/**
 * @generated SignedSource<<307452316bd6d71bace0996b854d6dad>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftStatusExpress_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type RequestStatusExpress_enum = "Approved" | "Pending" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type ListingCardForMetadata_MetadataAccount$data = {
  readonly assetHeight: number | null;
  readonly assetWidth: number | null;
  readonly contentType: string;
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
      readonly share: number;
      readonly status: RequestStatusExpress_enum;
      readonly user: {
        readonly ProfilePhoto: {
          readonly photoUrl: string;
        } | null;
      } | null;
    }> | null;
    readonly name: string;
  };
  readonly nft: {
    readonly Creator: {
      readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
    } | null;
    readonly creatorId: string;
    readonly isImported: boolean;
    readonly status: NftStatusExpress_enum;
    readonly " $fragmentSpreads": FragmentRefs<"useDoesNftHaveDisclosure_NftExpress">;
  };
  readonly offchainData: {
    readonly listingCardImage: string;
  };
  readonly primarySaleHappened: boolean;
  readonly videoPlaybackId: string | null;
  readonly videoPreviewPlaybackId: string | null;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardNftKindPill_MetadataAccount" | "NftOtherInfo_MetadataAccount" | "NftPageContext_MetadataAccount" | "useNftKind_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  readonly " $fragmentType": "ListingCardForMetadata_MetadataAccount";
};
export type ListingCardForMetadata_MetadataAccount$key = {
  readonly " $data"?: ListingCardForMetadata_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListingCardForMetadata_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListingCardForMetadata_MetadataAccount",
  "selections": [
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
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
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
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtistPillButtonForUserExpress_UserExpress"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useDoesNftHaveDisclosure_NftExpress"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftLinkForMetadataAccount_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListingCardNftKindPill_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftPageContext_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOtherInfo_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "4c917de32a04af7c8e2387317d0cc169";

export default node;
