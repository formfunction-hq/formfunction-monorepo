/**
 * @generated SignedSource<<0d8ae97e5b911779e1e39eaf7012f74d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type SettleSaleModalContent_MetadataAccount$data = {
  readonly contentType: string;
  readonly nft: {
    readonly Owner: {
      readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
    } | null;
  };
  readonly offchainData: {
    readonly image: string;
  };
  readonly " $fragmentType": "SettleSaleModalContent_MetadataAccount";
};
export type SettleSaleModalContent_MetadataAccount$key = {
  readonly " $data"?: SettleSaleModalContent_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"SettleSaleModalContent_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "SettleSaleModalContent_MetadataAccount",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "contentType",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "MetadataOffchain",
      "kind": "LinkedField",
      "name": "offchainData",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "image",
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
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "Owner",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtistPillButtonForUserExpress_UserExpress"
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

(node as any).hash = "c06e6b0fa78d77dec700579be54dadeb";

export default node;
