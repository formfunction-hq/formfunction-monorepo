/**
 * @generated SignedSource<<6dbe31b25a87f5ab1579eed1155e2831>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type LinkWithIconForLink_Link$data = {
  readonly href: string;
  readonly text: string;
  readonly " $fragmentType": "LinkWithIconForLink_Link";
};
export type LinkWithIconForLink_Link$key = {
  readonly " $data"?: LinkWithIconForLink_Link$data;
  readonly " $fragmentSpreads": FragmentRefs<"LinkWithIconForLink_Link">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "LinkWithIconForLink_Link",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "Link",
  "abstractKey": null
};

(node as any).hash = "6e997d2a905e4a7e3d4fa4c6ee304d48";

export default node;
