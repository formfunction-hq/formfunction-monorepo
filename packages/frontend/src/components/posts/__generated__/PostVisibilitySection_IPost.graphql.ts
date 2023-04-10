/**
 * @generated SignedSource<<c935e6cb958bbf9032fe32fc6506bee4>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
export type PostVisibilityExpress_enum = "CampaignSupportersOnly" | "Public" | "%future added value";
import { FragmentRefs } from "relay-runtime";
export type PostVisibilitySection_IPost$data = {
  readonly visibility: PostVisibilityExpress_enum;
  readonly visibilityFundingTiers: ReadonlyArray<{
    readonly title?: string;
  }> | null;
  readonly " $fragmentType": "PostVisibilitySection_IPost";
};
export type PostVisibilitySection_IPost$key = {
  readonly " $data"?: PostVisibilitySection_IPost$data;
  readonly " $fragmentSpreads": FragmentRefs<"PostVisibilitySection_IPost">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "PostVisibilitySection_IPost",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "visibility",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "visibilityFundingTiers",
      "plural": true,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "title",
              "storageKey": null
            }
          ],
          "type": "ICampaignFundingTier",
          "abstractKey": "__isICampaignFundingTier"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "IPost",
  "abstractKey": "__isIPost"
};

(node as any).hash = "1608955d2f20964773c839472b2ad1ae";

export default node;
