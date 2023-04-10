/**
 * @generated SignedSource<<4968920a4e0cc50fb88c123a40b92896>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSubmissionStatus_enum = "Approved" | "ApprovedWithoutVoting" | "Pending" | "Rejected" | "VoteActive" | "%future added value";
export type VoteReason_enum = "BreaksGuidelines" | "Duplicate" | "LowQuality" | "VoteFailed" | "%future added value";
export type VoteType_enum = "Approve" | "PrescreenApprove" | "PrescreenReject" | "Reject" | "ReportSubmission" | "Skip" | "Upvote" | "%future added value";
export type ArtistSubmission_bool_exp = {
  Assets?: Asset_bool_exp | null;
  User?: User_bool_exp | null;
  Votes?: Vote_bool_exp | null;
  _and?: ReadonlyArray<ArtistSubmission_bool_exp> | null;
  _not?: ArtistSubmission_bool_exp | null;
  _or?: ReadonlyArray<ArtistSubmission_bool_exp> | null;
  artProcess?: String_comparison_exp | null;
  artistStatement?: String_comparison_exp | null;
  discordHandle?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  instagramName?: String_comparison_exp | null;
  isCopyrightVerified?: Boolean_comparison_exp | null;
  status?: ArtistSubmissionStatus_enum_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  twitterName?: String_comparison_exp | null;
  userId?: String_comparison_exp | null;
  websiteUrl?: String_comparison_exp | null;
};
export type Asset_bool_exp = {
  _and?: ReadonlyArray<Asset_bool_exp> | null;
  _not?: Asset_bool_exp | null;
  _or?: ReadonlyArray<Asset_bool_exp> | null;
  artistSubmissionId?: uuid_comparison_exp | null;
  arweaveTxid?: String_comparison_exp | null;
  campaignGalleryAssetCampaignId?: uuid_comparison_exp | null;
  contentType?: String_comparison_exp | null;
  downloadUrl?: String_comparison_exp | null;
  downloadUrlDarkMode?: String_comparison_exp | null;
  height?: Int_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  path?: String_comparison_exp | null;
  pathDarkMode?: String_comparison_exp | null;
  postId?: uuid_comparison_exp | null;
  premintPreviewAssetCandyMachineId?: uuid_comparison_exp | null;
  userId?: String_comparison_exp | null;
  videoPlaybackId?: String_comparison_exp | null;
  width?: Int_comparison_exp | null;
};
export type uuid_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _in?: ReadonlyArray<string> | null;
  _is_null?: boolean | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nin?: ReadonlyArray<string> | null;
};
export type String_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _ilike?: string | null;
  _in?: ReadonlyArray<string> | null;
  _iregex?: string | null;
  _is_null?: boolean | null;
  _like?: string | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nilike?: string | null;
  _nin?: ReadonlyArray<string> | null;
  _niregex?: string | null;
  _nlike?: string | null;
  _nregex?: string | null;
  _nsimilar?: string | null;
  _regex?: string | null;
  _similar?: string | null;
};
export type Int_comparison_exp = {
  _eq?: number | null;
  _gt?: number | null;
  _gte?: number | null;
  _in?: ReadonlyArray<number> | null;
  _is_null?: boolean | null;
  _lt?: number | null;
  _lte?: number | null;
  _neq?: number | null;
  _nin?: ReadonlyArray<number> | null;
};
export type User_bool_exp = {
  ArtistSubmissions?: ArtistSubmission_bool_exp | null;
  CoverPhoto?: Photo_bool_exp | null;
  CreatorStory?: CreatorStory_bool_exp | null;
  DiscordAuth?: DiscordAuth_bool_exp | null;
  Followed?: UserFollows_bool_exp | null;
  Followers?: UserFollows_bool_exp | null;
  ProfilePhoto?: Photo_bool_exp | null;
  _and?: ReadonlyArray<User_bool_exp> | null;
  _not?: User_bool_exp | null;
  _or?: ReadonlyArray<User_bool_exp> | null;
  bio?: String_comparison_exp | null;
  coverPhotoId?: uuid_comparison_exp | null;
  discordHandle?: String_comparison_exp | null;
  displayName?: String_comparison_exp | null;
  email?: String_comparison_exp | null;
  emailBlocklist?: jsonb_comparison_exp | null;
  hasCompletedSignup?: Boolean_comparison_exp | null;
  hasTakenCollectorSurvey2023?: Boolean_comparison_exp | null;
  hasTakenCreatorSurvey2023?: Boolean_comparison_exp | null;
  hasUnseenActivity?: Boolean_comparison_exp | null;
  id?: String_comparison_exp | null;
  instagramName?: String_comparison_exp | null;
  isCollector?: Boolean_comparison_exp | null;
  isCollector2?: Boolean_comparison_exp | null;
  isWhitelisted?: Boolean_comparison_exp | null;
  profilePhotoId?: uuid_comparison_exp | null;
  seriesOrder?: jsonb_comparison_exp | null;
  shouldBlurNsfwContent?: Boolean_comparison_exp | null;
  shouldSeeDiscordOnboardingPrompt?: Boolean_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  twitterName?: String_comparison_exp | null;
  username?: String_comparison_exp | null;
  usernameLength?: Int_comparison_exp | null;
  websiteUrl?: String_comparison_exp | null;
};
export type Photo_bool_exp = {
  _and?: ReadonlyArray<Photo_bool_exp> | null;
  _not?: Photo_bool_exp | null;
  _or?: ReadonlyArray<Photo_bool_exp> | null;
  description?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  photoUrl?: String_comparison_exp | null;
  storagePath?: String_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  title?: String_comparison_exp | null;
  userId?: String_comparison_exp | null;
};
export type timestamptz_comparison_exp = {
  _eq?: string | null;
  _gt?: string | null;
  _gte?: string | null;
  _in?: ReadonlyArray<string> | null;
  _is_null?: boolean | null;
  _lt?: string | null;
  _lte?: string | null;
  _neq?: string | null;
  _nin?: ReadonlyArray<string> | null;
};
export type CreatorStory_bool_exp = {
  _and?: ReadonlyArray<CreatorStory_bool_exp> | null;
  _not?: CreatorStory_bool_exp | null;
  _or?: ReadonlyArray<CreatorStory_bool_exp> | null;
  colorScheme?: Int_comparison_exp | null;
  goals?: String_comparison_exp | null;
  headline?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  inspiration?: String_comparison_exp | null;
  process?: String_comparison_exp | null;
  userId?: String_comparison_exp | null;
};
export type DiscordAuth_bool_exp = {
  DiscordAuthToDiscordRoles?: DiscordAuthToDiscordRole_bool_exp | null;
  _and?: ReadonlyArray<DiscordAuth_bool_exp> | null;
  _not?: DiscordAuth_bool_exp | null;
  _or?: ReadonlyArray<DiscordAuth_bool_exp> | null;
  authorizationNonce?: String_comparison_exp | null;
  discordHandle?: String_comparison_exp | null;
  discordUserId?: String_comparison_exp | null;
  hasConnectedDiscordAccount?: Boolean_comparison_exp | null;
  hasJoinedDiscordServer?: Boolean_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  userId?: String_comparison_exp | null;
};
export type DiscordAuthToDiscordRole_bool_exp = {
  DiscordAuth?: DiscordAuth_bool_exp | null;
  DiscordRole?: DiscordRole_bool_exp | null;
  _and?: ReadonlyArray<DiscordAuthToDiscordRole_bool_exp> | null;
  _not?: DiscordAuthToDiscordRole_bool_exp | null;
  _or?: ReadonlyArray<DiscordAuthToDiscordRole_bool_exp> | null;
  discordAuthId?: uuid_comparison_exp | null;
  discordRoleId?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
};
export type DiscordRole_bool_exp = {
  _and?: ReadonlyArray<DiscordRole_bool_exp> | null;
  _not?: DiscordRole_bool_exp | null;
  _or?: ReadonlyArray<DiscordRole_bool_exp> | null;
  id?: String_comparison_exp | null;
  name?: String_comparison_exp | null;
};
export type Boolean_comparison_exp = {
  _eq?: boolean | null;
  _gt?: boolean | null;
  _gte?: boolean | null;
  _in?: ReadonlyArray<boolean> | null;
  _is_null?: boolean | null;
  _lt?: boolean | null;
  _lte?: boolean | null;
  _neq?: boolean | null;
  _nin?: ReadonlyArray<boolean> | null;
};
export type UserFollows_bool_exp = {
  Followed?: User_bool_exp | null;
  Follower?: User_bool_exp | null;
  _and?: ReadonlyArray<UserFollows_bool_exp> | null;
  _not?: UserFollows_bool_exp | null;
  _or?: ReadonlyArray<UserFollows_bool_exp> | null;
  followedId?: String_comparison_exp | null;
  followerId?: String_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
};
export type jsonb_comparison_exp = {
  _cast?: jsonb_cast_exp | null;
  _contained_in?: any | null;
  _contains?: any | null;
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _has_key?: string | null;
  _has_keys_all?: ReadonlyArray<string> | null;
  _has_keys_any?: ReadonlyArray<string> | null;
  _in?: ReadonlyArray<any> | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type jsonb_cast_exp = {
  String?: String_comparison_exp | null;
};
export type Vote_bool_exp = {
  ArtistSubmission?: ArtistSubmission_bool_exp | null;
  User?: User_bool_exp | null;
  _and?: ReadonlyArray<Vote_bool_exp> | null;
  _not?: Vote_bool_exp | null;
  _or?: ReadonlyArray<Vote_bool_exp> | null;
  artistSubmissionId?: uuid_comparison_exp | null;
  id?: uuid_comparison_exp | null;
  reason?: VoteReason_enum_comparison_exp | null;
  reportReasons?: jsonb_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  userId?: String_comparison_exp | null;
  voteType?: VoteType_enum_comparison_exp | null;
};
export type VoteReason_enum_comparison_exp = {
  _eq?: VoteReason_enum | null;
  _in?: ReadonlyArray<VoteReason_enum> | null;
  _is_null?: boolean | null;
  _neq?: VoteReason_enum | null;
  _nin?: ReadonlyArray<VoteReason_enum> | null;
};
export type VoteType_enum_comparison_exp = {
  _eq?: VoteType_enum | null;
  _in?: ReadonlyArray<VoteType_enum> | null;
  _is_null?: boolean | null;
  _neq?: VoteType_enum | null;
  _nin?: ReadonlyArray<VoteType_enum> | null;
};
export type ArtistSubmissionStatus_enum_comparison_exp = {
  _eq?: ArtistSubmissionStatus_enum | null;
  _in?: ReadonlyArray<ArtistSubmissionStatus_enum> | null;
  _is_null?: boolean | null;
  _neq?: ArtistSubmissionStatus_enum | null;
  _nin?: ReadonlyArray<ArtistSubmissionStatus_enum> | null;
};
export type PrescreenPageQuery$variables = {
  where: ArtistSubmission_bool_exp;
};
export type PrescreenPageQuery$data = {
  readonly ArtistSubmission: ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentSpreads": FragmentRefs<"PrescreenSubmissionCardButtons_ArtistSubmission" | "SubmissionCard_ArtistSubmission">;
  }>;
};
export type PrescreenPageQuery = {
  response: PrescreenPageQuery$data;
  variables: PrescreenPageQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "where"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "where",
    "variableName": "where"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "PrescreenPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSubmission",
        "kind": "LinkedField",
        "name": "ArtistSubmission",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "SubmissionCard_ArtistSubmission"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "PrescreenSubmissionCardButtons_ArtistSubmission"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "PrescreenPageQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "ArtistSubmission",
        "kind": "LinkedField",
        "name": "ArtistSubmission",
        "plural": true,
        "selections": [
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "artistStatement",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "instagramName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "twitterName",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "websiteUrl",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "User",
            "plural": false,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Asset",
            "kind": "LinkedField",
            "name": "Assets",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "contentType",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "downloadUrl",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "path",
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
    "cacheID": "507fb5a8dd9573992b90ab0a88abdec1",
    "id": null,
    "metadata": {},
    "name": "PrescreenPageQuery",
    "operationKind": "query",
    "text": "query PrescreenPageQuery(\n  $where: ArtistSubmission_bool_exp!\n) {\n  ArtistSubmission(where: $where) {\n    id\n    ...SubmissionCard_ArtistSubmission\n    ...PrescreenSubmissionCardButtons_ArtistSubmission\n  }\n}\n\nfragment PrescreenSubmissionCardButtons_ArtistSubmission on ArtistSubmission {\n  id\n}\n\nfragment SubmissionCardAssets_ArtistSubmission on ArtistSubmission {\n  id\n  Assets {\n    id\n    contentType\n    downloadUrl\n    path\n  }\n}\n\nfragment SubmissionCard_ArtistSubmission on ArtistSubmission {\n  id\n  artistStatement\n  instagramName\n  twitterName\n  websiteUrl\n  User {\n    id\n    username\n  }\n  ...SubmissionCardAssets_ArtistSubmission\n}\n"
  }
};
})();

(node as any).hash = "5b55f6c0660fcbeb2c404992cf93165d";

export default node;
