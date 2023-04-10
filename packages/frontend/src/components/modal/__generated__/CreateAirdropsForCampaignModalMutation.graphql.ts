/**
 * @generated SignedSource<<28c5c94df978d179cb41d21e004dddc7>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type AirdropTypeExpress_enum = "Claim" | "Gift" | "%future added value";
export type PostVisibilityExpress_enum = "CampaignSupportersOnly" | "Public" | "%future added value";
export type CreateAirdropsInput = {
  masterEditionMint: string;
  toAddresses: ReadonlyArray<string>;
  type: AirdropTypeExpress_enum;
};
export type CreatePostBaseForCampaignInput = {
  airdropMasterEditionMint?: string | null;
  campaignSlug: string;
  creatorId?: string | null;
  creatorUsername?: string | null;
  postInput: CreatePostBaseInput;
};
export type CreatePostBaseInput = {
  assets?: ReadonlyArray<AssetInput> | null;
  body?: string | null;
  link?: string | null;
  title: string;
  visibility: PostVisibilityExpress_enum;
  visibilityFundingTierIds?: ReadonlyArray<string> | null;
};
export type AssetInput = {
  arweaveTxid?: string | null;
  contentType: string;
  dimensions?: AssetDimensionsInput | null;
  downloadUrl: string;
  path: string;
};
export type AssetDimensionsInput = {
  height: number;
  width: number;
};
export type CreateAirdropsForCampaignModalMutation$variables = {
  input: CreateAirdropsInput;
  postInput: CreatePostBaseForCampaignInput;
};
export type CreateAirdropsForCampaignModalMutation$data = {
  readonly AirdropMutations: {
    readonly createAirdrops: {
      readonly airdrops: ReadonlyArray<{
        readonly id: string;
      }>;
    };
  };
  readonly PostNamespace: {
    readonly createPostBaseForCampaign: {
      readonly post: {
        readonly __typename: string;
      };
    } | null;
  };
};
export type CreateAirdropsForCampaignModalMutation = {
  response: CreateAirdropsForCampaignModalMutation$data;
  variables: CreateAirdropsForCampaignModalMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "postInput"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
],
v2 = {
  "alias": null,
  "args": null,
  "concreteType": "AirdropMutationsMutationResponse",
  "kind": "LinkedField",
  "name": "AirdropMutations",
  "plural": false,
  "selections": [
    {
      "alias": null,
      "args": [
        {
          "kind": "Variable",
          "name": "input",
          "variableName": "input"
        }
      ],
      "concreteType": "CreateAirdropsResponse",
      "kind": "LinkedField",
      "name": "createAirdrops",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "AirdropExpress",
          "kind": "LinkedField",
          "name": "airdrops",
          "plural": true,
          "selections": (v1/*: any*/),
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "storageKey": null
},
v3 = [
  {
    "kind": "Variable",
    "name": "input",
    "variableName": "postInput"
  }
],
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateAirdropsForCampaignModalMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "CreatePostBaseForCampaignResponse",
            "kind": "LinkedField",
            "name": "createPostBaseForCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "post",
                "plural": false,
                "selections": [
                  (v4/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateAirdropsForCampaignModalMutation",
    "selections": [
      (v2/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "PostsNamespaceMutationResponse",
        "kind": "LinkedField",
        "name": "PostNamespace",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": (v3/*: any*/),
            "concreteType": "CreatePostBaseForCampaignResponse",
            "kind": "LinkedField",
            "name": "createPostBaseForCampaign",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": null,
                "kind": "LinkedField",
                "name": "post",
                "plural": false,
                "selections": [
                  (v4/*: any*/),
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "PostTextOnly",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "PostWithAirdrop",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "PostWithPoll",
                    "abstractKey": null
                  },
                  {
                    "kind": "InlineFragment",
                    "selections": (v1/*: any*/),
                    "type": "PostWithSingleAsset",
                    "abstractKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "631d75bcfa790786500cdb26742a7b8f",
    "id": null,
    "metadata": {},
    "name": "CreateAirdropsForCampaignModalMutation",
    "operationKind": "mutation",
    "text": "mutation CreateAirdropsForCampaignModalMutation(\n  $input: CreateAirdropsInput!\n  $postInput: CreatePostBaseForCampaignInput!\n) {\n  AirdropMutations {\n    createAirdrops(input: $input) {\n      airdrops {\n        id\n      }\n    }\n  }\n  PostNamespace {\n    createPostBaseForCampaign(input: $postInput) {\n      post {\n        __typename\n        ... on PostTextOnly {\n          id\n        }\n        ... on PostWithAirdrop {\n          id\n        }\n        ... on PostWithPoll {\n          id\n        }\n        ... on PostWithSingleAsset {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();

(node as any).hash = "8b34b28f815e94f6a4943bef9a22cdf2";

export default node;
