/**
 * @generated SignedSource<<5b7b83f34d343cda80df2f16559bebaf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListingContext_MetadataAccount$data = {
  readonly data: {
    readonly creators: ReadonlyArray<{
      readonly address: string;
    }> | null;
  };
  readonly nft: {
    readonly creatorId: string;
  };
  readonly primarySaleHappened: boolean;
  readonly tags: ReadonlyArray<string>;
  readonly " $fragmentType": "ListingContext_MetadataAccount";
};
export type ListingContext_MetadataAccount$key = {
  readonly " $data"?: ListingContext_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListingContext_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListingContext_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "primarySaleHappened",
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
        }
      ],
      "storageKey": null
    },
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
            }
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
      "name": "tags",
      "storageKey": null
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "a993efe3dbc7b5f76073eea809d4aa6b";

export default node;
