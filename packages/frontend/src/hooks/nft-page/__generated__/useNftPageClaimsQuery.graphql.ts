/**
 * @generated SignedSource<<ca51e344dcdeaf482bb3c00064031ac6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useNftPageClaimsQuery$variables = {
  auctionNftId: string;
  userId: string;
};
export type useNftPageClaimsQuery$data = {
  readonly Claim_by_pk: {
    readonly NftTransaction: {
      readonly timeCreated: string;
    } | null;
    readonly claimTransactionId: string | null;
    readonly proof: string | null;
    readonly timeCreated: string;
    readonly " $fragmentSpreads": FragmentRefs<"ClaimPnftModal_Claim">;
  } | null;
};
export type useNftPageClaimsQuery = {
  response: useNftPageClaimsQuery$data;
  variables: useNftPageClaimsQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "auctionNftId"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "auctionNftId",
    "variableName": "auctionNftId"
  },
  {
    "kind": "Variable",
    "name": "userId",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "claimTransactionId",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "proof",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "timeCreated",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "concreteType": "NftTransaction",
  "kind": "LinkedField",
  "name": "NftTransaction",
  "plural": false,
  "selections": [
    (v4/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "useNftPageClaimsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Claim",
        "kind": "LinkedField",
        "name": "Claim_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "ClaimPnftModal_Claim"
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
    "name": "useNftPageClaimsQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Claim",
        "kind": "LinkedField",
        "name": "Claim_by_pk",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
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
    ]
  },
  "params": {
    "cacheID": "dbd212586e4ae1d84246e54c78291901",
    "id": null,
    "metadata": {},
    "name": "useNftPageClaimsQuery",
    "operationKind": "query",
    "text": "query useNftPageClaimsQuery(\n  $auctionNftId: String!\n  $userId: String!\n) {\n  Claim_by_pk(auctionNftId: $auctionNftId, userId: $userId) {\n    claimTransactionId\n    proof\n    timeCreated\n    NftTransaction {\n      timeCreated\n    }\n    ...ClaimPnftModal_Claim\n  }\n}\n\nfragment ClaimPnftModal_Claim on Claim {\n  id\n  proof\n}\n"
  }
};
})();

(node as any).hash = "2bfec95aab31b2fa5e29ff982942bf74";

export default node;
