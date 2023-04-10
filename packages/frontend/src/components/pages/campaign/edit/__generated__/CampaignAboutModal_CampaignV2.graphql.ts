/**
 * @generated SignedSource<<38282f1f6612563f032577ee52f72d4b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignAboutModal_CampaignV2$data = {
  readonly about: {
    readonly campaign: string | null;
    readonly contactInfo: string | null;
    readonly creator: string | null;
    readonly risksAndChallenges: string | null;
    readonly timeline: string | null;
  };
  readonly id: string;
  readonly " $fragmentType": "CampaignAboutModal_CampaignV2";
};
export type CampaignAboutModal_CampaignV2$key = {
  readonly " $data"?: CampaignAboutModal_CampaignV2$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignAboutModal_CampaignV2">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignAboutModal_CampaignV2",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
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

(node as any).hash = "ca3e140632b2043757f082182029155d";

export default node;
