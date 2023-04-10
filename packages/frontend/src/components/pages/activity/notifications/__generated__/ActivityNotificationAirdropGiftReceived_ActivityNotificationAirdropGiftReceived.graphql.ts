/**
 * @generated SignedSource<<db817848adbd3c3fee0ed4c98f021e2e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived$data = {
  readonly action: {
    readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived";
};
export type ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived$key = {
  readonly " $data"?: ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationAirdropGiftReceived_ActivityNotificationAirdropGiftReceived",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": null,
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
  "type": "ActivityNotificationAirdropGiftReceived",
  "abstractKey": null
};

(node as any).hash = "579a8665c2fbbcd5c0276a04c92a445d";

export default node;
