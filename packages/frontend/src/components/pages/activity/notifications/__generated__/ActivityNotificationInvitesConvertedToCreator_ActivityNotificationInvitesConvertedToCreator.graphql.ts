/**
 * @generated SignedSource<<d55c4af8045b3f329ca7e9bcb1f0a323>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator$data = {
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator";
};
export type ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator$key = {
  readonly " $data"?: ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationInvitesConvertedToCreator_ActivityNotificationInvitesConvertedToCreator",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "UserExpress",
      "kind": "LinkedField",
      "name": "sender",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "username",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "concreteType": "PhotoExpress",
          "kind": "LinkedField",
          "name": "ProfilePhoto",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "photoUrl",
              "storageKey": null
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
      "kind": "ScalarField",
      "name": "timeCreated",
      "storageKey": null
    }
  ],
  "type": "ActivityNotificationInvitesConvertedToCreator",
  "abstractKey": null
};

(node as any).hash = "e76e512d76903e6c9067e82891a74bf5";

export default node;
