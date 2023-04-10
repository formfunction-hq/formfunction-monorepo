/**
 * @generated SignedSource<<330071450f9b7055848931cdb4a64339>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type NftOfferForActivity_NftOfferForUser$data = {
  readonly expirationDate: string;
  readonly isValid: boolean;
  readonly metadataAccount: {
    readonly " $fragmentSpreads": FragmentRefs<"NftAssetForMetadataAccount_MetadataAccount" | "useNftLinkForMetadataAccount_MetadataAccount">;
  };
  readonly transaction: {
    readonly From: {
      readonly id: string;
    } | null;
    readonly " $fragmentSpreads": FragmentRefs<"NftOfferGeneric_NftTransactionExpress">;
  };
  readonly " $fragmentType": "NftOfferForActivity_NftOfferForUser";
};
export type NftOfferForActivity_NftOfferForUser$key = {
  readonly " $data"?: NftOfferForActivity_NftOfferForUser$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftOfferForActivity_NftOfferForUser">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftOfferForActivity_NftOfferForUser",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "expirationDate",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isValid",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataAccount",
      "kind": "LinkedField",
      "name": "metadataAccount",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useNftLinkForMetadataAccount_MetadataAccount"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftAssetForMetadataAccount_MetadataAccount"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "NftTransactionExpress",
      "kind": "LinkedField",
      "name": "transaction",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "From",
          "plural": false,
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
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "NftOfferGeneric_NftTransactionExpress"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "NftOfferForUser",
  "abstractKey": null
};

(node as any).hash = "05597eb6f9a6d56f577025cc24cc728b";

export default node;
