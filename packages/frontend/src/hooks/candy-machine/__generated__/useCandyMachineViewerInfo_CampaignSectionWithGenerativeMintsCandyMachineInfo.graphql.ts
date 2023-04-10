/**
 * @generated SignedSource<<0f7b4705ccba3f5ecf5d4e4f9f55550c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$data = {
  readonly candyMachine: {
    readonly limitPerAddress: number;
    readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineIsSoldOut_CandyMachineExpress" | "useCandyMachineMintPhase_CandyMachineExpress">;
  };
  readonly isViewerOmniMinter: boolean | null;
  readonly viewerAllowlistInfo: {
    readonly __typename: "CandyMachineMerkleAllowlistInfoForViewerExpress";
    readonly amountAllowed: number;
    readonly amountMinted: number;
    readonly merkleRootIndexForProof: number;
    readonly proof: string;
  } | {
    readonly __typename: "CandyMachineTokenAllowlistInfoForViewer";
    readonly allowlistTokenAccount: string | null;
    readonly allowlistTokenAmount: number;
    readonly allowlistTokenMint: string;
    readonly amountMinted: number;
  } | {
    // This will never be '%other', but we need some
    // value in case none of the concrete values match.
    readonly __typename: "%other";
  } | null;
  readonly viewerAmountMinted: number | null;
  readonly " $fragmentType": "useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo";
};
export type useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$key = {
  readonly " $data"?: useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo$data;
  readonly " $fragmentSpreads": FragmentRefs<"useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo">;
};

const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amountMinted",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "useCandyMachineViewerInfo_CampaignSectionWithGenerativeMintsCandyMachineInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "CandyMachineExpress",
      "kind": "LinkedField",
      "name": "candyMachine",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "limitPerAddress",
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
          "name": "useCandyMachineIsSoldOut_CandyMachineExpress"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isViewerOmniMinter",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "viewerAllowlistInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__typename",
          "storageKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "amountAllowed",
              "storageKey": null
            },
            (v0/*: any*/),
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "merkleRootIndexForProof",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "proof",
              "storageKey": null
            }
          ],
          "type": "CandyMachineMerkleAllowlistInfoForViewerExpress",
          "abstractKey": null
        },
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "allowlistTokenAccount",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "allowlistTokenMint",
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "allowlistTokenAmount",
              "storageKey": null
            },
            (v0/*: any*/)
          ],
          "type": "CandyMachineTokenAllowlistInfoForViewer",
          "abstractKey": null
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
    }
  ],
  "type": "CampaignSectionWithGenerativeMintsCandyMachineInfo",
  "abstractKey": null
};
})();

(node as any).hash = "fe178e3f4cafe180480480643a65fbc4";

export default node;
