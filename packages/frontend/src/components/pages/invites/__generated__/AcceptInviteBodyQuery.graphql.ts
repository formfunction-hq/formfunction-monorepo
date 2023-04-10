/**
 * @generated SignedSource<<66a3ef274c6948c38bba8603f45d19be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
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
export type AcceptInviteBodyQuery$variables = {
  where: CreatorInvite_bool_exp;
};
export type AcceptInviteBodyQuery$data = {
  readonly CreatorInvite: ReadonlyArray<{
    readonly inviteLinkExpirationTime: string | null;
    readonly receiverEmail: string | null;
    readonly timeAccepted: string | null;
  }>;
};
export type AcceptInviteBodyQuery = {
  response: AcceptInviteBodyQuery$data;
  variables: AcceptInviteBodyQuery$variables;
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
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "where",
        "variableName": "where"
      }
    ],
    "concreteType": "CreatorInvite",
    "kind": "LinkedField",
    "name": "CreatorInvite",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "inviteLinkExpirationTime",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "timeAccepted",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "receiverEmail",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "AcceptInviteBodyQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "AcceptInviteBodyQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "45d4ddebe082d5729a7c79fca028aa09",
    "id": null,
    "metadata": {},
    "name": "AcceptInviteBodyQuery",
    "operationKind": "query",
    "text": "query AcceptInviteBodyQuery(\n  $where: CreatorInvite_bool_exp!\n) {\n  CreatorInvite(where: $where) {\n    inviteLinkExpirationTime\n    timeAccepted\n    receiverEmail\n  }\n}\n"
  }
};
})();

(node as any).hash = "4e63e6013b699bf05b3be548ac5012c7";

export default node;
