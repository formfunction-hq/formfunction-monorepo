/**
 * @generated SignedSource<<28db770536c857ac43411db46d658181>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCanViewerEditCampaign_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
  };
  readonly " $fragmentType": "useCanViewerEditCampaign_CampaignV2";
};
export type useCanViewerEditCampaign_CampaignV2$key = {
  readonly " $data"?: useCanViewerEditCampaign_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCanViewerEditCampaign_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCanViewerEditCampaign_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "creator",
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
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "51d75b3e22d2d2676fd3c20547693b48";

export default node;
