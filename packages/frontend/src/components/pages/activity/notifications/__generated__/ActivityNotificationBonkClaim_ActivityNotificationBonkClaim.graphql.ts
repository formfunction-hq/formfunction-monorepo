/**
 * @generated SignedSource<<87414f747316c14e6b5c072293ad3db5>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationBonkClaim_ActivityNotificationBonkClaim$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationBonkClaim_ActivityNotificationBonkClaim";
};
export type ActivityNotificationBonkClaim_ActivityNotificationBonkClaim$key = {
  readonly " $data"?: ActivityNotificationBonkClaim_ActivityNotificationBonkClaim$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationBonkClaim_ActivityNotificationBonkClaim">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationBonkClaim_ActivityNotificationBonkClaim",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "ActivityNotificationLinkAction",
      "kind": "LinkedField",
      "name": "action",
      "plural": false,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ActivityNotificationLinkActionButton_ActivityNotificationLinkAction"
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
  "type": "ActivityNotificationBonkClaim",
  "abstractKey": null
};

(node as any).hash = "759e837e03084d90c6aef17744d28225";

export default node;
