/**
 * @generated SignedSource<<272d9db5f5bec4aa7e9e12d416d99e8a>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreatorInviteIssueReason_enum = "AdvocateProgram" | "%future added value";
export type CreatorInvite_bool_exp = {
  _and?: ReadonlyArray<CreatorInvite_bool_exp> | null;
  _not?: CreatorInvite_bool_exp | null;
  _or?: ReadonlyArray<CreatorInvite_bool_exp> | null;
  expirationTime?: timestamptz_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  inviteLinkExpirationTime?: timestamptz_comparison_exp | null;
  inviteLinkTimeCreated?: timestamptz_comparison_exp | null;
  inviteLinkToken?: String_comparison_exp | null;
  issueReason?: CreatorInviteIssueReason_enum_comparison_exp | null;
  ownerId?: String_comparison_exp | null;
  receiverEmail?: String_comparison_exp | null;
  receiverId?: String_comparison_exp | null;
  timeAccepted?: timestamptz_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
};
export type timestamptz_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _in?: ReadonlyArray<string> | null;
  _is_null?: boolean | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nin?: ReadonlyArray<string> | null;
};
export type uuid_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _in?: ReadonlyArray<string> | null;
  _is_null?: boolean | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nin?: ReadonlyArray<string> | null;
};
export type String_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: ReadonlyArray<string> | null;
  _iregex?: string | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: ReadonlyArray<string> | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
};
export type CreatorInviteIssueReason_enum_comparison_exp = {
  _eq?: CreatorInviteIssueReason_enum | null;
  _in?: ReadonlyArray<CreatorInviteIssueReason_enum> | null;
  _is_null?: boolean | null;
  _neq?: CreatorInviteIssueReason_enum | null;
  _nin?: ReadonlyArray<CreatorInviteIssueReason_enum> | null;
};
export type InvitesBodyQuery$variables = {
  where: CreatorInvite_bool_exp;
};
export type InvitesBodyQuery$data = {
  readonly CreatorInvite_aggregate: {
    readonly aggregate: {
      readonly count: number;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"InviteExistingUserAsCreatorBody_CreatorInvite_aggregate" | "InviteWithEmailBody_CreatorInvite_aggregate">;
  };
};
export type InvitesBodyQuery = {
  response: InvitesBodyQuery$data;
  variables: InvitesBodyQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "CreatorInvite_aggregate_fields",
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "InvitesBodyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatorInvite_aggregate",
        "kind": "LinkedField",
        "name": "CreatorInvite_aggregate",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InviteExistingUserAsCreatorBody_CreatorInvite_aggregate"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "InviteWithEmailBody_CreatorInvite_aggregate"
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
    "name": "InvitesBodyQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "CreatorInvite_aggregate",
        "kind": "LinkedField",
        "name": "CreatorInvite_aggregate",
        "plural": false,
        "selections": [
          (v2/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "ae8a1371b903b308662f78ad7cb2a6e8",
    "id": null,
    "metadata": {},
    "name": "InvitesBodyQuery",
    "operationKind": "query",
    "text": "query InvitesBodyQuery(\n  $where: CreatorInvite_bool_exp!\n) {\n  CreatorInvite_aggregate(where: $where) {\n    aggregate {\n      count\n    }\n    ...InviteExistingUserAsCreatorBody_CreatorInvite_aggregate\n    ...InviteWithEmailBody_CreatorInvite_aggregate\n  }\n}\n\nfragment InviteExistingUserAsCreatorBody_CreatorInvite_aggregate on CreatorInvite_aggregate {\n  aggregate {\n    count\n  }\n}\n\nfragment InviteWithEmailBody_CreatorInvite_aggregate on CreatorInvite_aggregate {\n  aggregate {\n    count\n  }\n}\n"
  }
};
})();

(node as any).hash = "c9fafe4d745abeeb70f3929f1eb16cc4";

export default node;
