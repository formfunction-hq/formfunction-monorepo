/**
 * @generated SignedSource<<0fb49791321e0f8e590a6b02a8f70b42>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type NftDisclosureTypeExpress_enum = "AiArt" | "Derivative" | "Nsfw" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type NftInfoDisclosures_MetadataAccount$data = {
  readonly nft: {
    readonly disclosures: ReadonlyArray<{
      readonly details: string | null;
      readonly type: NftDisclosureTypeExpress_enum;
    }> | null;
  };
  readonly " $fragmentType": "NftInfoDisclosures_MetadataAccount";
};
export type NftInfoDisclosures_MetadataAccount$key = {
  readonly " $data"?: NftInfoDisclosures_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"NftInfoDisclosures_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "NftInfoDisclosures_MetadataAccount",
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
          "concreteType": "NftDisclosureExpress",
          "kind": "LinkedField",
          "name": "disclosures",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "details",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "type",
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

(node as any).hash = "bd959671a2322cc8dd7bb31f49a7a989";

export default node;
