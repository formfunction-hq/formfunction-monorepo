/**
 * @generated SignedSource<<55d3c2d25292066dd222e82614daea87>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite$data = {
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite";
};
export type ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite$key = {
  readonly " $data"?: ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationInvitesInviteeAcceptedInvite_ActivityNotificationInvitesInviteeAcceptedInvite",
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
  "type": "ActivityNotificationInvitesInviteeAcceptedInvite",
  "abstractKey": null
};

(node as any).hash = "32c835cba229d1cd84157d751642c0e2";

export default node;
