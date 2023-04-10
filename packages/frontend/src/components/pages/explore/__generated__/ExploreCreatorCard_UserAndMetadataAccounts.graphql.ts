/**
 * @generated SignedSource<<23ad2d558886e06b9055e95333f07fdf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ExploreCreatorCard_UserAndMetadataAccounts$data = {
  readonly metadataAccounts: ReadonlyArray<{
    readonly " $fragmentSpreads": FragmentRefs<"ExploreCardNftAsset_MetadataAccount">;
  }>;
  readonly user: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly bio: string | null;
    readonly displayName: string | null;
    readonly username: string;
  };
  readonly " $fragmentType": "ExploreCreatorCard_UserAndMetadataAccounts";
};
export type ExploreCreatorCard_UserAndMetadataAccounts$key = {
  readonly " $data"?: ExploreCreatorCard_UserAndMetadataAccounts$data;
  readonly " $fragmentSpreads": FragmentRefs<"ExploreCreatorCard_UserAndMetadataAccounts">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ExploreCreatorCard_UserAndMetadataAccounts",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "user",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "bio",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "displayName",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
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
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccount",
      "kind": "LinkedField",
      "name": "metadataAccounts",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ExploreCardNftAsset_MetadataAccount"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "UserAndMetadataAccounts",
  "abstractKey": null
};

(node as any).hash = "ba492e730f159a03217a8c600bca4906";

export default node;
