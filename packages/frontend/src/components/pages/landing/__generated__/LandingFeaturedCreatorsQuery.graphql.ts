/**
 * @generated SignedSource<<00b4f00e8c899b4c13a7cc730fc83498>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LandingFeaturedCreatorsQuery$variables = {};
export type LandingFeaturedCreatorsQuery$data = {
  readonly usersFeatured: ReadonlyArray<{
    readonly user: {
      readonly id: string;
    };
    readonly " $fragmentSpreads": FragmentRefs<"ExploreCreatorCard_UserAndMetadataAccounts">;
  }>;
};
export type LandingFeaturedCreatorsQuery = {
  response: LandingFeaturedCreatorsQuery$data;
  variables: LandingFeaturedCreatorsQuery$variables;
};

const node: ConcreteRequest = (function(){
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
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "LandingFeaturedCreatorsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAndMetadataAccounts",
        "kind": "LinkedField",
        "name": "usersFeatured",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserExpress",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ExploreCreatorCard_UserAndMetadataAccounts"
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
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "LandingFeaturedCreatorsQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserAndMetadataAccounts",
        "kind": "LinkedField",
        "name": "usersFeatured",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "UserExpress",
            "kind": "LinkedField",
            "name": "user",
            "plural": false,
            "selections": [
              (v0/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "bio",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "displayName",
                "storageKey": null
              },
              (v1/*: any*/),
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
                  (v0/*: any*/)
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
            "name": "metadataAccounts",
            "plural": true,
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
                "name": "mint",
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
                    "alias": "creatorCardImage",
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
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
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
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Owner",
                    "plural": false,
                    "selections": [
                      (v1/*: any*/),
                      (v0/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v0/*: any*/)
                ],
                "storageKey": null
              },
              (v0/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "973209e4cfed365e533434026797a7d1",
    "id": null,
    "metadata": {},
    "name": "LandingFeaturedCreatorsQuery",
    "operationKind": "query",
    "text": "query LandingFeaturedCreatorsQuery {\n  usersFeatured {\n    user {\n      id\n    }\n    ...ExploreCreatorCard_UserAndMetadataAccounts\n  }\n}\n\nfragment ExploreCardNftAsset_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  mint\n  offchainData {\n    creatorCardImage: image\n  }\n  videoPlaybackId\n  videoPreviewPlaybackId\n  nft {\n    ...useDoesNftHaveDisclosure_NftExpress\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment ExploreCreatorCard_UserAndMetadataAccounts on UserAndMetadataAccounts {\n  user {\n    bio\n    displayName\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  metadataAccounts {\n    ...ExploreCardNftAsset_MetadataAccount\n    id\n  }\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n"
  }
};
})();

(node as any).hash = "1269ba50838508dc5b0d5060ff030a9c";

export default node;
