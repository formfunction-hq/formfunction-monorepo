/**
 * @generated SignedSource<<5a99513950ae795ac25665dc68cd906e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type EditFundingTierModal_CampaignFundingTierStandard$data = {
  readonly benefits: ReadonlyArray<{
    readonly description: string;
  }> | null;
  readonly description: string;
  readonly id: string;
  readonly title: string;
  readonly " $fragmentType": "EditFundingTierModal_CampaignFundingTierStandard";
};
export type EditFundingTierModal_CampaignFundingTierStandard$key = {
  readonly " $data"?: EditFundingTierModal_CampaignFundingTierStandard$data;
  readonly " $fragmentSpreads": FragmentRefs<"EditFundingTierModal_CampaignFundingTierStandard">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "EditFundingTierModal_CampaignFundingTierStandard",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "CampaignBenefitExpress",
      "kind": "LinkedField",
      "name": "benefits",
      "plural": true,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    }
  ],
  "type": "CampaignFundingTierStandard",
  "abstractKey": null
};
})();

(node as any).hash = "dd7a1800d5446dbdb79f4a1046a3f80d";

export default node;
