/**
 * @generated SignedSource<<e25cbffab70c481aba5eea07054bcbb6>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type RequestStatusExpress_enum = "Approved" | "Pending" | "Rejected" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftCollaboratorCard_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
      readonly share: number;
      readonly status: RequestStatusExpress_enum;
      readonly user: {
        readonly id: string;
        readonly username: string;
      } | null;
    }> | null;
    readonly name: string;
  };
  readonly id: string;
  readonly nft: {
    readonly CandyMachine: {
      readonly __typename: "CandyMachineExpress";
    } | null;
    readonly Creator: {
      readonly ProfilePhoto: {
        readonly photoUrl: string;
      } | null;
      readonly username: string;
    } | null;
    readonly creatorId: string;
  };
  readonly " $fragmentSpreads": FragmentRefs<"CollaboratorApprovalModal_MetadataAccount">;
  readonly " $fragmentType": "NftCollaboratorCard_MetadataAccount";
};
export type NftCollaboratorCard_MetadataAccount$key = {
  readonly " $data"?: NftCollaboratorCard_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftCollaboratorCard_MetadataAccount">;
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
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftCollaboratorCard_MetadataAccount",
  "selections": [
    (v0/*: any*/),
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
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "status",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "UserExpress",
              "kind": "LinkedField",
              "name": "user",
              "plural": false,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/)
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
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
          "concreteType": "CandyMachineExpress",
          "kind": "LinkedField",
          "name": "CandyMachine",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "__typename",
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
          "name": "Creator",
          "plural": false,
          "selections": [
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
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollaboratorApprovalModal_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};
})();

(node as any).hash = "2f269d714c3de2f8ca76b4422ce6c907";

export default node;
