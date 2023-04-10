/**
 * @generated SignedSource<<d9bb8378685c070eadfa464f55e216e2>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo$data = {
  readonly candyMachine: {
    readonly CreatorAuthority: {
      readonly id: string;
      readonly " $fragmentSpreads": FragmentRefs<"ArtistPillButtonForUserExpress_UserExpress">;
    };
    readonly antiBotProtectionEnabled: boolean;
    readonly id: string;
    readonly publicKey: string;
    readonly totalAmountMinted: number;
    readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineMintPhase_CandyMachineExpress" | "useCandyMachineMintPrice_CandyMachineExpress">;
  };
  readonly id: string;
  readonly viewerAmountMinted: number | null;
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
  readonly " $fragmentType": "MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo";
};
export type MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo$key = {
  readonly " $data"?: MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
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
  "name": "MintGenerativeSeriesModal_CampaignSectionWithGenerativeMintsCandyMachineInfo",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "concreteType": "CandyMachineExpress",
      "kind": "LinkedField",
      "name": "candyMachine",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "antiBotProtectionEnabled",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "publicKey",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "totalAmountMinted",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "UserExpress",
          "kind": "LinkedField",
          "name": "CreatorAuthority",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ArtistPillButtonForUserExpress_UserExpress"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useCandyMachineMintPhase_CandyMachineExpress"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "useCandyMachineMintPrice_CandyMachineExpress"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "viewerAmountMinted",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo"
    }
  ],
  "type": "CampaignSectionWithGenerativeMintsCandyMachineInfo",
  "abstractKey": null
};
})();

(node as any).hash = "d88abaa96ecfbe1999d94c47bb53d048";

export default node;
