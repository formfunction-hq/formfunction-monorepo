/**
 * @generated SignedSource<<77d1f2079f0e65e7a0a0be06c86bec67>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type PostLink_IPost$data = {
  readonly link: {
    readonly href: string;
    readonly " $fragmentSpreads": FragmentRefs<"LinkWithIconForLink_Link">;
  } | null;
  readonly " $fragmentType": "PostLink_IPost";
};
export type PostLink_IPost$key = {
  readonly " $data"?: PostLink_IPost$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostLink_IPost">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostLink_IPost",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Link",
      "kind": "LinkedField",
      "name": "link",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "href",
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "LinkWithIconForLink_Link"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
};

(node as any).hash = "aaed5e5a8e72bf6f2a264502958e4ea0";

export default node;
