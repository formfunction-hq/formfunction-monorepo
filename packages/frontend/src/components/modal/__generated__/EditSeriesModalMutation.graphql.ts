/**
 * @generated SignedSource<<415c5dde42bb70b5d8f3f1a354197c51>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SeriesType_enum = "GenerativeMint" | "UserCurated" | "%future added value";
export type Series_set_input = {
  avatarPhotoId?: string | null;
  coverPhotoId?: string | null;
  creatorId?: string | null;
  description?: string | null;
  id?: string | null;
  logoAssetId?: string | null;
  mint?: string | null;
  name?: string | null;
  nftOrder?: any | null;
  slug?: string | null;
  timeCreated?: string | null;
  timeLastAddedTo?: string | null;
  type?: SeriesType_enum | null;
};
export type EditSeriesModalMutation$variables = {
  seriesId: string;
  update: Series_set_input;
};
export type EditSeriesModalMutation$data = {
  readonly update_Series_by_pk: {
    readonly Creator: {
      readonly username: string;
    };
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"EditSeriesModal_Series" | "SeriesMetadataContext_Series">;
  } | null;
};
export type EditSeriesModalMutation = {
  response: EditSeriesModalMutation$data;
  variables: EditSeriesModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "seriesId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "update"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "_set",
    "variableName": "update"
  },
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "seriesId"
      }
    ],
    "kind": "ObjectValue",
    "name": "pk_columns"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
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
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "EditSeriesModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "update_Series_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "EditSeriesModal_Series"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SeriesMetadataContext_Series"
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
    "name": "EditSeriesModalMutation",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Series",
        "kind": "LinkedField",
        "name": "update_Series_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
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
            "name": "mint",
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
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "AvatarPhoto",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "storagePath",
                "storageKey": null
              },
              (v4/*: any*/)
            ],
            "storageKey": null
          },
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
            "kind": "ScalarField",
            "name": "description",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Photo",
            "kind": "LinkedField",
            "name": "CoverPhoto",
            "plural": false,
            "selections": [
              (v4/*: any*/)
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "b7a60430d98235c70298d7e3bd84ec84",
    "id": null,
    "metadata": {},
    "name": "EditSeriesModalMutation",
    "operationKind": "mutation",
    "text": "mutation EditSeriesModalMutation(\n  $seriesId: String!\n  $update: Series_set_input!\n) {\n  update_Series_by_pk(pk_columns: {id: $seriesId}, _set: $update) {\n    slug\n    Creator {\n      username\n    }\n    ...EditSeriesModal_Series\n    ...SeriesMetadataContext_Series\n  }\n}\n\nfragment EditSeriesModal_Series on Series {\n  id\n  mint\n  avatarPhotoId\n  coverPhotoId\n  AvatarPhoto {\n    storagePath\n  }\n}\n\nfragment SeriesMetadataContext_Series on Series {\n  name\n  description\n  slug\n  AvatarPhoto {\n    photoUrl\n  }\n  CoverPhoto {\n    photoUrl\n  }\n}\n"
  }
};
})();

(node as any).hash = "7647261994cd734a918375606a85c7aa";

export default node;
