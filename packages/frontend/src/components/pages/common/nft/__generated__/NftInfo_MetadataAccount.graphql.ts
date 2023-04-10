/**
 * @generated SignedSource<<e8f399f4a726e2810063f2606578be3c>>
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
export type NftInfo_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
      readonly share: number;
      readonly status: RequestStatusExpress_enum;
      readonly user: {
        readonly ProfilePhoto: {
          readonly photoUrl: string;
        } | null;
        readonly id: string;
        readonly username: string;
      } | null;
    }> | null;
    readonly name: string;
  };
  readonly id: string;
  readonly nft: {
    readonly Creator: {
      readonly ProfilePhoto: {
        readonly id: string;
        readonly photoUrl: string;
      } | null;
      readonly id: string;
      readonly username: string;
    } | null;
    readonly Owner: {
      readonly ProfilePhoto: {
        readonly id: string;
        readonly photoUrl: string;
      } | null;
      readonly id: string;
      readonly username: string;
    } | null;
    readonly creatorId: string;
    readonly id: string;
    readonly ownerId: string;
    readonly status: NftStatusExpress_enum;
  };
  readonly offchainData: {
    readonly description: string | null;
  };
  readonly " $fragmentSpreads": FragmentRefs<"CrossmintButtonWrapper_MetadataAccount" | "NftActionButton_MetadataAccount" | "NftAllowlistInfo_MetadataAccount" | "NftEllipsisShadowButton_MetadataAccount" | "NftInfoDisclosures_MetadataAccount" | "NftKindLabel_MetadataAccount" | "NftListedEllipsisShadowButton_MetadataAccount" | "NftOffer_MetadataAccount" | "NftPageUnlockableInfo_MetadataAccount" | "NftPrice_MetadataAccount" | "NftTransaction_MetadataAccount" | "PnftInfo_MetadataAccount" | "UnlockableModalContainer_MetadataAccount" | "useNftKind_MetadataAccount">;
  readonly " $fragmentType": "NftInfo_MetadataAccount";
};
export type NftInfo_MetadataAccount$key = {
  readonly " $data"?: NftInfo_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftInfo_MetadataAccount">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v3 = [
  (v0/*: any*/),
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "PhotoExpress",
    "kind": "LinkedField",
    "name": "ProfilePhoto",
    "plural": false,
    "selections": [
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "storageKey": null
  }
],
v4 = {
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
  "name": "NftInfo_MetadataAccount",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "NftExpress",
      "kind": "LinkedField",
      "name": "nft",
      "plural": false,
      "selections": [
        (v0/*: any*/),
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Creator",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Owner",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "ownerId",
          "storageKey": null
        },
        (v4/*: any*/)
      ],
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
            (v4/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "PhotoExpress",
                  "kind": "LinkedField",
                  "name": "ProfilePhoto",
                  "plural": false,
                  "selections": [
                    (v2/*: any*/)
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
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "description",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftAllowlistInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CrossmintButtonWrapper_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftTransaction_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftEllipsisShadowButton_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftInfoDisclosures_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftListedEllipsisShadowButton_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftPrice_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftActionButton_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftOffer_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftKindLabel_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "PnftInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useNftKind_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "NftPageUnlockableInfo_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UnlockableModalContainer_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "1ffd65d8b59da9cccf527fb3c61cbfcc";

export default node;
