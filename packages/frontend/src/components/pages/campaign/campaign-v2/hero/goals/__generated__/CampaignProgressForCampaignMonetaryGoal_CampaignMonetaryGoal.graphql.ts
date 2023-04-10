/**
 * @generated SignedSource<<2386a859f5fba38a67cb284769d9277e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal$data = {
  readonly currency: {
    readonly decimals: number;
    readonly shortSymbol: string | null;
    readonly symbol: string;
  };
  readonly currentAmount: number;
  readonly goalAmount: number;
  readonly " $fragmentType": "CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal";
};
export type CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal$key = {
  readonly " $data"?: CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal$data;
  readonly " $fragmentSpreads": FragmentRefs<"CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CampaignProgressForCampaignMonetaryGoal_CampaignMonetaryGoal",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "goalAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "currentAmount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CurrencyExpress",
      "kind": "LinkedField",
      "name": "currency",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "decimals",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "shortSymbol",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "symbol",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CampaignMonetaryGoal",
  "abstractKey": null
};

(node as any).hash = "ff3696d9bdee3e7c5c077bbbc5dfa086";

export default node;
