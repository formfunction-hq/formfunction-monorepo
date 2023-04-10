/**
 * @generated SignedSource<<deeb84ac825c4207ccfa12f659fd54fe>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useUnlockableCtaType_MetadataAccount$data = {
  readonly nft: {
    readonly creatorId: string;
  };
  readonly " $fragmentType": "useUnlockableCtaType_MetadataAccount";
};
export type useUnlockableCtaType_MetadataAccount$key = {
  readonly " $data"?: useUnlockableCtaType_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"useUnlockableCtaType_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useUnlockableCtaType_MetadataAccount",
  "selections": [
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
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "858bce3659effd2aa18f16df8df3b9ec";

export default node;
