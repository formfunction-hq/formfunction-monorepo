/**
 * @generated SignedSource<<5718841fe1e4d28f36b8a06269446ca3>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignGalleryModal_CampaignV2$data = {
  readonly galleryAssets: ReadonlyArray<{
    readonly contentType: string;
    readonly dimensions: {
      readonly height: number;
      readonly width: number;
    } | null;
    readonly downloadUrl: string;
    readonly id: string;
    readonly path: string;
  }> | null;
  readonly id: string;
  readonly youtubeVideoHref: string | null;
  readonly " $fragmentType": "CampaignGalleryModal_CampaignV2";
};
export type CampaignGalleryModal_CampaignV2$key = {
  readonly " $data"?: CampaignGalleryModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignGalleryModal_CampaignV2">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignGalleryModal_CampaignV2",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "AssetExpress",
      "kind": "LinkedField",
      "name": "galleryAssets",
      "plural": true,
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
          "kind": "ScalarField",
          "name": "downloadUrl",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "path",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetDimensions",
          "kind": "LinkedField",
          "name": "dimensions",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "height",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "width",
              "storageKey": null
            }
          ],
          "storageKey": null
        },
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "youtubeVideoHref",
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};
})();

(node as any).hash = "672b7480c5bc61ebad51164ac405a828";

export default node;
