/**
 * @generated SignedSource<<e2ecf4b50f461dd68dbbcb4b8e11b61d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal$data = {
  readonly currency: {
    readonly decimals: number;
    readonly shortSymbol: string | null;
    readonly symbol: string;
  };
  readonly currentAmount: number;
  readonly goalAmount: number;
  readonly " $fragmentType": "ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal";
};
export type ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal$key = {
  readonly " $data"?: ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal$data;
  readonly " $fragmentSpreads": FragmentRefs<"ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ProfileCampaignCardMonetaryGoal_CampaignMonetaryGoal",
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

(node as any).hash = "8e7c714cc94c7ccb1720a09a01ff208b";

export default node;
