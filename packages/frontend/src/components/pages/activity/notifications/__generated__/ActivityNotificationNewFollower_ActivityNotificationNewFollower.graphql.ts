/**
 * @generated SignedSource<<48d4006d23067422efb5ad21ef3e297c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ActivityNotificationNewFollower_ActivityNotificationNewFollower$data = {
  readonly sender: {
    readonly ProfilePhoto: {
      readonly photoUrl: string;
    } | null;
    readonly username: string;
  } | null;
  readonly timeCreated: string;
  readonly " $fragmentType": "ActivityNotificationNewFollower_ActivityNotificationNewFollower";
};
export type ActivityNotificationNewFollower_ActivityNotificationNewFollower$key = {
  readonly " $data"?: ActivityNotificationNewFollower_ActivityNotificationNewFollower$data;
  readonly " $fragmentSpreads": FragmentRefs<"ActivityNotificationNewFollower_ActivityNotificationNewFollower">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ActivityNotificationNewFollower_ActivityNotificationNewFollower",
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
  "type": "ActivityNotificationNewFollower",
  "abstractKey": null
};

(node as any).hash = "3ed8801245ebc4a52a2a66f980d5242b";

export default node;
