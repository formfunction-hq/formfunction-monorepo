/**
 * @generated SignedSource<<e6a96e00ca525e9f410d204bb221a990>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UnlockableLabel_MetadataAccount$data = {
  readonly data: {
    readonly name: string;
  };
  readonly nft: {
    readonly Creator: {
      readonly username: string;
    } | null;
    readonly creatorId: string;
  };
  readonly " $fragmentType": "UnlockableLabel_MetadataAccount";
};
export type UnlockableLabel_MetadataAccount$key = {
  readonly " $data"?: UnlockableLabel_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"UnlockableLabel_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UnlockableLabel_MetadataAccount",
  "selections": [
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
          "concreteType": "UserExpress",
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
        }
      ],
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "4775bacd81d4478ca8284db4cb3371d5";

export default node;
