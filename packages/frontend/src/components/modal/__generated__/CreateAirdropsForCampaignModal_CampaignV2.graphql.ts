/**
 * @generated SignedSource<<a469d0493664848c2258e7632b58a1a2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CreateAirdropsForCampaignModal_CampaignV2$data = {
  readonly creator: {
    readonly id: string;
  };
  readonly slug: string;
  readonly " $fragmentType": "CreateAirdropsForCampaignModal_CampaignV2";
};
export type CreateAirdropsForCampaignModal_CampaignV2$key = {
  readonly " $data"?: CreateAirdropsForCampaignModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CreateAirdropsForCampaignModal_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreateAirdropsForCampaignModal_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
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

(node as any).hash = "cd72930be8e2550b8ea0576ce51e027b";

export default node;
