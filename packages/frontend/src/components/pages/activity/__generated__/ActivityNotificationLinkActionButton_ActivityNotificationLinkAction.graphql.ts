/**
 * @generated SignedSource<<9fc77f6bcdbf3c78ea6230b202d2c445>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationLinkActionButton_ActivityNotificationLinkAction$data = {
  readonly href: string;
  readonly text: string;
  readonly " $fragmentType": "ActivityNotificationLinkActionButton_ActivityNotificationLinkAction";
};
export type ActivityNotificationLinkActionButton_ActivityNotificationLinkAction$key = {
  readonly " $data"?: ActivityNotificationLinkActionButton_ActivityNotificationLinkAction$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationLinkActionButton_ActivityNotificationLinkAction">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationLinkActionButton_ActivityNotificationLinkAction",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "href",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "text",
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationLinkAction",
  "abstractKey": null
};

(node as any).hash = "d504151541c88a440d6599cee191520b";

export default node;
