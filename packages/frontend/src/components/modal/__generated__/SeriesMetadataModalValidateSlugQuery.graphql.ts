/**
 * @generated SignedSource<<52ea13ca4fb5a3d41f7cdfeb90dca645>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type SeriesMetadataModalValidateSlugQuery$variables = {
  seriesSlug: string;
  userId?: string | null;
};
export type SeriesMetadataModalValidateSlugQuery$data = {
  readonly Series: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type SeriesMetadataModalValidateSlugQuery = {
  response: SeriesMetadataModalValidateSlugQuery$data;
  variables: SeriesMetadataModalValidateSlugQuery$variables;
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
  "name": "userId"
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "fields": [
          {
            "fields": [
              {
                "fields": [
                  {
                    "kind": "Variable",
                    "name": "_eq",
                    "variableName": "userId"
                  }
                ],
                "kind": "ObjectValue",
                "name": "creatorId"
              },
              {
                "fields": [
                  {
                    "kind": "Variable",
                    "name": "_eq",
                    "variableName": "seriesSlug"
                  }
                ],
                "kind": "ObjectValue",
                "name": "slug"
              }
            ],
            "kind": "ObjectValue",
            "name": "_and"
          }
        ],
        "kind": "ObjectValue",
        "name": "where"
      }
    ],
    "concreteType": "Series",
    "kind": "LinkedField",
    "name": "Series",
    "plural": true,
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
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "SeriesMetadataModalValidateSlugQuery",
    "selections": (v2/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "SeriesMetadataModalValidateSlugQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "108882cf69294a467efb6e7324d7ad1c",
    "id": null,
    "metadata": {},
    "name": "SeriesMetadataModalValidateSlugQuery",
    "operationKind": "query",
    "text": "query SeriesMetadataModalValidateSlugQuery(\n  $userId: String\n  $seriesSlug: String!\n) {\n  Series(where: {_and: {creatorId: {_eq: $userId}, slug: {_eq: $seriesSlug}}}) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "797403e682c655c58b8bd17a01c2510a";

export default node;
