/**
 * @generated SignedSource<<fc33d64bb2012f939be20a760be35278>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type DiscordAuthConnectModal_User$data = {
  readonly DiscordAuth: {
    readonly hasConnectedDiscordAccount: boolean;
    readonly hasJoinedDiscordServer: boolean | null;
    readonly id: string;
  } | null;
  readonly id: string;
  readonly isWhitelisted: boolean;
  readonly " $fragmentType": "DiscordAuthConnectModal_User";
};
export type DiscordAuthConnectModal_User$key = {
  readonly " $data"?: DiscordAuthConnectModal_User$data;
  readonly " $fragmentSpreads": FragmentRefs<"DiscordAuthConnectModal_User">;
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
  "name": "DiscordAuthConnectModal_User",
  "selections": [
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isWhitelisted",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "DiscordAuth",
      "kind": "LinkedField",
      "name": "DiscordAuth",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasConnectedDiscordAccount",
          "storageKey": null
        },
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "hasJoinedDiscordServer",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
})();

(node as any).hash = "4fa463296e4d3faf9e27c1f6c2a645ff";

export default node;
