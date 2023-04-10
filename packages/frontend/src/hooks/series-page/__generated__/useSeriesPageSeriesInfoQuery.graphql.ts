/**
 * @generated SignedSource<<92910ea61a3916755b3bed5f4e74ca90>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesType_enum = "GenerativeMint" | "UserCurated" | "%future added value";
export type useSeriesPageSeriesInfoQuery$variables = {
  seriesSlug: string;
  type: SeriesType_enum;
  userId?: string | null;
  username?: string | null;
};
export type useSeriesPageSeriesInfoQuery$data = {
  readonly Series: ReadonlyArray<{
    readonly Creator: {
      readonly username: string;
    };
    readonly creatorId: string;
    readonly id: string;
    readonly name: string;
    readonly " $fragmentSpreads": FragmentRefs<"GenerativeSeriesPageContent_Series" | "SeriesPageContents_Series">;
  }>;
  readonly User: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"SeriesPageContents_User">;
  }>;
};
export type useSeriesPageSeriesInfoQuery = {
  response: useSeriesPageSeriesInfoQuery$data;
  variables: useSeriesPageSeriesInfoQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "seriesSlug"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "type"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "userId"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
v4 = [
  {
    "kind": "Variable",
    "name": "_eq",
    "variableName": "userId"
  }
],
v5 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "_eq",
        "variableName": "username"
      }
    ],
    "kind": "ObjectValue",
    "name": "username"
  }
],
v6 = [
  {
    "fields": [
      {
        "items": [
          {
            "fields": [
              {
                "fields": (v4/*: any*/),
                "kind": "ObjectValue",
                "name": "id"
              }
            ],
            "kind": "ObjectValue",
            "name": "_or.0"
          },
          {
            "fields": (v5/*: any*/),
            "kind": "ObjectValue",
            "name": "_or.1"
          }
        ],
        "kind": "ListValue",
        "name": "_or"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v8 = {
  "fields": [
    {
      "kind": "Variable",
      "name": "_eq",
      "variableName": "seriesSlug"
    }
  ],
  "kind": "ObjectValue",
  "name": "slug"
},
v9 = {
  "fields": [
    {
      "kind": "Variable",
      "name": "_eq",
      "variableName": "type"
    }
  ],
  "kind": "ObjectValue",
  "name": "type"
},
v10 = [
  {
    "fields": [
      {
        "items": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "fields": (v4/*: any*/),
                    "kind": "ObjectValue",
                    "name": "creatorId"
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "kind": "ObjectValue",
                "name": "_and"
              }
            ],
            "kind": "ObjectValue",
            "name": "_or.0"
          },
          {
            "fields": [
              {
                "fields": [
                  {
                    "fields": (v5/*: any*/),
                    "kind": "ObjectValue",
                    "name": "Creator"
                  },
                  (v8/*: any*/),
                  (v9/*: any*/)
                ],
                "kind": "ObjectValue",
                "name": "_and"
              }
            ],
            "kind": "ObjectValue",
            "name": "_or.1"
          }
        ],
        "kind": "ListValue",
        "name": "_or"
      }
    ],
    "kind": "ObjectValue",
    "name": "where"
  }
],
v11 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v12 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "creatorId",
  "storageKey": null
},
v13 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v15 = [
  (v7/*: any*/),
  (v14/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useSeriesPageSeriesInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SeriesPageContents_User"
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "Series",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "Creator",
            "plural": false,
            "selections": [
              (v13/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "GenerativeSeriesPageContent_Series"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SeriesPageContents_Series"
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
    "argumentDefinitions": [
      (v2/*: any*/),
      (v3/*: any*/),
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Operation",
    "name": "useSeriesPageSeriesInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v6/*: any*/),
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "User",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          (v13/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "ProfilePhoto",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      },
      {
        "alias": null,
        "args": (v10/*: any*/),
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "Series",
        "plural": true,
        "selections": [
          (v7/*: any*/),
          (v11/*: any*/),
          (v12/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "Creator",
            "plural": false,
            "selections": [
              (v13/*: any*/),
              (v7/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Asset",
            "kind": "LinkedField",
            "name": "logoAsset",
            "plural": false,
            "selections": [
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
                "name": "downloadUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "videoPlaybackId",
                "storageKey": null
              }
            ],
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
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "AvatarPhoto",
            "plural": false,
            "selections": [
              (v7/*: any*/),
              (v14/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "storagePath",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "CoverPhoto",
            "plural": false,
            "selections": (v15/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": [
              {
                "kind": "Literal",
                "name": "where",
                "value": {
                  "status": {
                    "_neq": "Burned"
                  }
                }
              }
            ],
            "concreteType": "Nft_aggregate",
            "kind": "LinkedField",
            "name": "Nfts_aggregate",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "Nft_aggregate_fields",
                "kind": "LinkedField",
                "name": "aggregate",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "count",
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "Nfts_aggregate(where:{\"status\":{\"_neq\":\"Burned\"}})"
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
            "name": "slug",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "avatarPhotoId",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "coverPhotoId",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "6c93904fef38727d0cc3b01a172c1c26",
    "id": null,
    "metadata": {},
    "name": "useSeriesPageSeriesInfoQuery",
    "operationKind": "query",
    "text": "query useSeriesPageSeriesInfoQuery(\n  $userId: String\n  $username: String\n  $seriesSlug: String!\n  $type: SeriesType_enum!\n) {\n  User(where: {_or: [{id: {_eq: $userId}}, {username: {_eq: $username}}]}) {\n    id\n    ...SeriesPageContents_User\n  }\n  Series(where: {_or: [{_and: {creatorId: {_eq: $userId}, slug: {_eq: $seriesSlug}, type: {_eq: $type}}}, {_and: {Creator: {username: {_eq: $username}}, slug: {_eq: $seriesSlug}, type: {_eq: $type}}}]}) {\n    id\n    name\n    creatorId\n    Creator {\n      username\n    }\n    ...GenerativeSeriesPageContent_Series\n    ...SeriesPageContents_Series\n  }\n}\n\nfragment AssetForAsset_Asset on Asset {\n  contentType\n  downloadUrl\n  videoPlaybackId\n}\n\nfragment EditSeriesModal_Series on Series {\n  id\n  mint\n  avatarPhotoId\n  coverPhotoId\n  AvatarPhoto {\n    storagePath\n  }\n}\n\nfragment GenerativeSeriesPageContent_Series on Series {\n  id\n  description\n  name\n  logoAsset {\n    ...AssetForAsset_Asset\n  }\n}\n\nfragment ManageSeriesPiecesModal_Series on Series {\n  mint\n  slug\n  id\n  Creator {\n    id\n    username\n  }\n}\n\nfragment SeriesMetadataContext_Series on Series {\n  name\n  description\n  slug\n  AvatarPhoto {\n    photoUrl\n  }\n  CoverPhoto {\n    photoUrl\n  }\n}\n\nfragment SeriesPageContents_Series on Series {\n  id\n  name\n  description\n  type\n  AvatarPhoto {\n    id\n    photoUrl\n  }\n  CoverPhoto {\n    id\n    photoUrl\n  }\n  Nfts_aggregate(where: {status: {_neq: Burned}}) {\n    aggregate {\n      count\n    }\n  }\n  ...ManageSeriesPiecesModal_Series\n  ...SeriesMetadataContext_Series\n  ...EditSeriesModal_Series\n}\n\nfragment SeriesPageContents_User on User {\n  id\n  username\n  ProfilePhoto {\n    id\n    photoUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "1666e8a7d059009dbb7b71dba91c1a4b";

export default node;
