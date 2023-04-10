/**
 * @generated SignedSource<<ad9b17296a5bdbc503f17564220a8edd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type UserForIdInput = {
  id: string;
};
export type UserContextQuery$variables = {
  input: UserForIdInput;
};
export type UserContextQuery$data = {
  readonly UserQueries: {
    readonly userForId: {
      readonly user: {
        readonly ProfilePhoto: {
          readonly photoUrl: string;
        } | null;
        readonly email: string | null;
        readonly hasCompletedSignup: boolean;
        readonly hasTakenCollectorSurvey2023: boolean | null;
        readonly hasTakenCreatorSurvey2023: boolean | null;
        readonly id: string;
        readonly isCollector: boolean;
        readonly isWhitelisted: boolean;
        readonly shouldBlurNsfwContent: boolean;
        readonly username: string;
      } | null;
    };
  };
};
export type UserContextQuery = {
  response: UserContextQuery$data;
  variables: UserContextQuery$variables;
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
  "name": "email",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isCollector",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "isWhitelisted",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasCompletedSignup",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasTakenCollectorSurvey2023",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "hasTakenCreatorSurvey2023",
  "storageKey": null
},
v10 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shouldBlurNsfwContent",
  "storageKey": null
},
v11 = {
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
    "name": "UserContextQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserQueriesQueryResponse",
        "kind": "LinkedField",
        "name": "UserQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserForIdResponse",
            "kind": "LinkedField",
            "name": "userForId",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PhotoExpress",
                    "kind": "LinkedField",
                    "name": "ProfilePhoto",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/)
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
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "UserContextQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "UserQueriesQueryResponse",
        "kind": "LinkedField",
        "name": "UserQueries",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v1/*: any*/),
            "concreteType": "UserForIdResponse",
            "kind": "LinkedField",
            "name": "userForId",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "user",
                "plural": false,
                "selections": [
                  (v2/*: any*/),
                  (v3/*: any*/),
                  (v4/*: any*/),
                  (v5/*: any*/),
                  (v6/*: any*/),
                  (v7/*: any*/),
                  (v8/*: any*/),
                  (v9/*: any*/),
                  (v10/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PhotoExpress",
                    "kind": "LinkedField",
                    "name": "ProfilePhoto",
                    "plural": false,
                    "selections": [
                      (v11/*: any*/),
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
      }
    ]
  },
  "params": {
    "cacheID": "e3b29f253e7967303af60d699dd2abb3",
    "id": null,
    "metadata": {},
    "name": "UserContextQuery",
    "operationKind": "query",
    "text": "query UserContextQuery(\n  $input: UserForIdInput!\n) {\n  UserQueries {\n    userForId(input: $input) {\n      user {\n        id\n        email\n        isCollector\n        isWhitelisted\n        username\n        hasCompletedSignup\n        hasTakenCollectorSurvey2023\n        hasTakenCreatorSurvey2023\n        shouldBlurNsfwContent\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "7d89c2ebb1413cb929c7f9ce89185476";

export default node;
