/**
 * @generated SignedSource<<401984cecaa3c03134bcb365d1d5c3cf>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut$data = {
  readonly action: {
    readonly href?: string;
  } | null;
  readonly candyMachineInfo: {
    readonly asset: {
      readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAssetForAssetExpress_AssetExpress">;
    };
    readonly name: string;
  };
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut";
};
export type ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut$key = {
  readonly " $data"?: ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationOwnerGenerativeMintSoldOut_ActivityNotificationOwnerGenerativeMintSoldOut",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ActivityNotificationCandyMachineInfo",
      "kind": "LinkedField",
      "name": "candyMachineInfo",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "name",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "AssetExpress",
          "kind": "LinkedField",
          "name": "asset",
          "plural": false,
          "selections": [
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "ActivityNotificationAssetForAssetExpress_AssetExpress"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "action",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "href",
              "storageKey": null
            }
          ],
          "type": "ActivityNotificationLinkAction",
          "abstractKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "timeCreated",
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationOwnerGenerativeMintSoldOut",
  "abstractKey": null
};

(node as any).hash = "489a8fb27797b0da2ef60c212b8d5b37";

export default node;
