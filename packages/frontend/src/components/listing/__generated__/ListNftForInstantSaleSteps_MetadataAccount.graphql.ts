/**
 * @generated SignedSource<<bd465747dc23161f888483a999f12f25>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ListNftForInstantSaleSteps_MetadataAccount$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForInstantSaleWithUnlockable_MetadataAccount" | "ListNftForInstantSale_MetadataAccount">;
  readonly " $fragmentType": "ListNftForInstantSaleSteps_MetadataAccount";
};
export type ListNftForInstantSaleSteps_MetadataAccount$key = {
  readonly " $data"?: ListNftForInstantSaleSteps_MetadataAccount$data;
  readonly " $fragmentSpreads": FragmentRefs<"ListNftForInstantSaleSteps_MetadataAccount">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ListNftForInstantSaleSteps_MetadataAccount",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForInstantSale_MetadataAccount"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ListNftForInstantSaleWithUnlockable_MetadataAccount"
    }
  ],
  "type": "MetadataAccount",
  "abstractKey": null
};

(node as any).hash = "d08cd44efe9295b9e7e635784ed538fa";

export default node;
