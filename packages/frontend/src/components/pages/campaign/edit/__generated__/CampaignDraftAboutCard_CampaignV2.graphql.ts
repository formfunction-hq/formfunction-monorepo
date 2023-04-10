/**
 * @generated SignedSource<<1c913aa8d7d091e15443506ce6af0753>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignDraftAboutCard_CampaignV2$data = {
  readonly about: {
    readonly campaign: string | null;
    readonly contactInfo: string | null;
    readonly creator: string | null;
    readonly risksAndChallenges: string | null;
    readonly timeline: string | null;
  };
  readonly " $fragmentType": "CampaignDraftAboutCard_CampaignV2";
};
export type CampaignDraftAboutCard_CampaignV2$key = {
  readonly " $data"?: CampaignDraftAboutCard_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignDraftAboutCard_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignDraftAboutCard_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignAbout",
      "kind": "LinkedField",
      "name": "about",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "campaign",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "contactInfo",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "creator",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "risksAndChallenges",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "timeline",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignV2",
  "abstractKey": null
};

(node as any).hash = "1d1d6087d68694b29750e1298ba36360";

export default node;
