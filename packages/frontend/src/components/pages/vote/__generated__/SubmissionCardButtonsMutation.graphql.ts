/**
 * @generated SignedSource<<89a7bae2e99b619f1b75d3d6d9fb058d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
export type ArtistSubmissionStatus_enum = "Approved" | "ApprovedWithoutVoting" | "Pending" | "Rejected" | "VoteActive" | "%future added value";
export type ArtistSubmission_constraint = "ArtistSubmission_pkey" | "%future added value";
export type ArtistSubmission_update_column = "artProcess" | "artistStatement" | "discordHandle" | "id" | "instagramName" | "isCopyrightVerified" | "status" | "timeCreated" | "twitterName" | "userId" | "websiteUrl" | "%future added value";
export type Asset_constraint = "Asset_pkey" | "%future added value";
export type Asset_update_column = "artistSubmissionId" | "arweaveTxid" | "campaignGalleryAssetCampaignId" | "contentType" | "downloadUrl" | "downloadUrlDarkMode" | "height" | "id" | "path" | "pathDarkMode" | "postId" | "premintPreviewAssetCandyMachineId" | "userId" | "videoPlaybackId" | "width" | "%future added value";
export type CreatorStory_constraint = "CreatorStory_pkey" | "CreatorStory_userId_key" | "%future added value";
export type CreatorStory_update_column = "colorScheme" | "goals" | "headline" | "id" | "inspiration" | "process" | "userId" | "%future added value";
export type DiscordAuthToDiscordRole_constraint = "DiscordAuthToDiscordRole_id_key" | "DiscordAuthToDiscordRole_pkey" | "%future added value";
export type DiscordAuthToDiscordRole_update_column = "discordAuthId" | "discordRoleId" | "id" | "timeCreated" | "%future added value";
export type DiscordAuth_constraint = "DiscordAuth_authorizationNonce_key" | "DiscordAuth_discordUserId_key" | "DiscordAuth_pkey" | "DiscordAuth_userId_key" | "%future added value";
export type DiscordAuth_update_column = "authorizationNonce" | "discordHandle" | "discordUserId" | "hasConnectedDiscordAccount" | "hasJoinedDiscordServer" | "id" | "timeCreated" | "userId" | "%future added value";
export type DiscordRole_constraint = "DiscordRole_name_key" | "DiscordRole_pkey" | "%future added value";
export type DiscordRole_update_column = "id" | "name" | "%future added value";
export type Photo_constraint = "Photo_pkey" | "%future added value";
export type Photo_update_column = "description" | "id" | "photoUrl" | "storagePath" | "timeCreated" | "title" | "userId" | "%future added value";
export type UserFollows_constraint = "UserFollows_followedId_followerId_key" | "UserFollows_pkey" | "%future added value";
export type UserFollows_update_column = "followedId" | "followerId" | "id" | "timeCreated" | "%future added value";
export type User_constraint = "User_coverPhotoId_key" | "User_email_key" | "User_pkey" | "User_profilePhotoId_key" | "User_username_key" | "%future added value";
export type User_update_column = "bio" | "coverPhotoId" | "discordHandle" | "displayName" | "email" | "emailBlocklist" | "hasCompletedSignup" | "hasTakenCollectorSurvey2023" | "hasTakenCreatorSurvey2023" | "hasUnseenActivity" | "id" | "instagramName" | "isCollector2" | "isWhitelisted" | "profilePhotoId" | "seriesOrder" | "shouldBlurNsfwContent" | "shouldSeeDiscordOnboardingPrompt" | "timeCreated" | "twitterName" | "username" | "websiteUrl" | "%future added value";
export type VoteReason_enum = "BreaksGuidelines" | "Duplicate" | "LowQuality" | "VoteFailed" | "%future added value";
export type VoteType_enum = "Approve" | "PrescreenApprove" | "PrescreenReject" | "Reject" | "ReportSubmission" | "Skip" | "Upvote" | "%future added value";
export type Vote_constraint = "Vote_pkey" | "%future added value";
export type Vote_update_column = "artistSubmissionId" | "id" | "reason" | "reportReasons" | "timeCreated" | "userId" | "voteType" | "%future added value";
export type Vote_insert_input = {
  ArtistSubmission?: ArtistSubmission_obj_rel_insert_input | null;
  User?: User_obj_rel_insert_input | null;
  artistSubmissionId?: string | null;
  id?: string | null;
  reason?: VoteReason_enum | null;
  reportReasons?: any | null;
  timeCreated?: string | null;
  userId?: string | null;
  voteType?: VoteType_enum | null;
};
export type ArtistSubmission_obj_rel_insert_input = {
  data: ArtistSubmission_insert_input;
  on_conflict?: ArtistSubmission_on_conflict | null;
};
export type ArtistSubmission_insert_input = {
  Assets?: Asset_arr_rel_insert_input | null;
  User?: User_obj_rel_insert_input | null;
  Votes?: Vote_arr_rel_insert_input | null;
  artProcess?: string | null;
  artistStatement?: string | null;
  discordHandle?: string | null;
  id?: string | null;
  instagramName?: string | null;
  isCopyrightVerified?: boolean | null;
  status?: ArtistSubmissionStatus_enum | null;
  timeCreated?: string | null;
  twitterName?: string | null;
  userId?: string | null;
  websiteUrl?: string | null;
};
export type Asset_arr_rel_insert_input = {
  data: ReadonlyArray<Asset_insert_input>;
  on_conflict?: Asset_on_conflict | null;
};
export type Asset_insert_input = {
  artistSubmissionId?: string | null;
  arweaveTxid?: string | null;
  campaignGalleryAssetCampaignId?: string | null;
  contentType?: string | null;
  downloadUrl?: string | null;
  downloadUrlDarkMode?: string | null;
  height?: number | null;
  id?: string | null;
  path?: string | null;
  pathDarkMode?: string | null;
  postId?: string | null;
  premintPreviewAssetCandyMachineId?: string | null;
  userId?: string | null;
  videoPlaybackId?: string | null;
  width?: number | null;
};
export type Asset_on_conflict = {
  constraint: Asset_constraint;
  update_columns: ReadonlyArray<Asset_update_column>;
  where?: Asset_bool_exp | null;
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
export type User_obj_rel_insert_input = {
  data: User_insert_input;
  on_conflict?: User_on_conflict | null;
};
export type User_insert_input = {
  ArtistSubmissions?: ArtistSubmission_arr_rel_insert_input | null;
  CoverPhoto?: Photo_obj_rel_insert_input | null;
  CreatorStory?: CreatorStory_obj_rel_insert_input | null;
  DiscordAuth?: DiscordAuth_obj_rel_insert_input | null;
  Followed?: UserFollows_arr_rel_insert_input | null;
  Followers?: UserFollows_arr_rel_insert_input | null;
  ProfilePhoto?: Photo_obj_rel_insert_input | null;
  bio?: string | null;
  coverPhotoId?: string | null;
  discordHandle?: string | null;
  displayName?: string | null;
  email?: string | null;
  emailBlocklist?: any | null;
  hasCompletedSignup?: boolean | null;
  hasTakenCollectorSurvey2023?: boolean | null;
  hasTakenCreatorSurvey2023?: boolean | null;
  hasUnseenActivity?: boolean | null;
  id?: string | null;
  instagramName?: string | null;
  isCollector2?: boolean | null;
  isWhitelisted?: boolean | null;
  profilePhotoId?: string | null;
  seriesOrder?: any | null;
  shouldBlurNsfwContent?: boolean | null;
  shouldSeeDiscordOnboardingPrompt?: boolean | null;
  timeCreated?: string | null;
  twitterName?: string | null;
  username?: string | null;
  websiteUrl?: string | null;
};
export type ArtistSubmission_arr_rel_insert_input = {
  data: ReadonlyArray<ArtistSubmission_insert_input>;
  on_conflict?: ArtistSubmission_on_conflict | null;
};
export type ArtistSubmission_on_conflict = {
  constraint: ArtistSubmission_constraint;
  update_columns: ReadonlyArray<ArtistSubmission_update_column>;
  where?: ArtistSubmission_bool_exp | null;
};
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
export type Photo_obj_rel_insert_input = {
  data: Photo_insert_input;
  on_conflict?: Photo_on_conflict | null;
};
export type Photo_insert_input = {
  description?: string | null;
  id?: string | null;
  photoUrl?: string | null;
  storagePath?: string | null;
  timeCreated?: string | null;
  title?: string | null;
  userId?: string | null;
};
export type Photo_on_conflict = {
  constraint: Photo_constraint;
  update_columns: ReadonlyArray<Photo_update_column>;
  where?: Photo_bool_exp | null;
};
export type CreatorStory_obj_rel_insert_input = {
  data: CreatorStory_insert_input;
  on_conflict?: CreatorStory_on_conflict | null;
};
export type CreatorStory_insert_input = {
  colorScheme?: number | null;
  goals?: string | null;
  headline?: string | null;
  id?: string | null;
  inspiration?: string | null;
  process?: string | null;
  userId?: string | null;
};
export type CreatorStory_on_conflict = {
  constraint: CreatorStory_constraint;
  update_columns: ReadonlyArray<CreatorStory_update_column>;
  where?: CreatorStory_bool_exp | null;
};
export type DiscordAuth_obj_rel_insert_input = {
  data: DiscordAuth_insert_input;
  on_conflict?: DiscordAuth_on_conflict | null;
};
export type DiscordAuth_insert_input = {
  DiscordAuthToDiscordRoles?: DiscordAuthToDiscordRole_arr_rel_insert_input | null;
  authorizationNonce?: string | null;
  discordHandle?: string | null;
  discordUserId?: string | null;
  hasConnectedDiscordAccount?: boolean | null;
  hasJoinedDiscordServer?: boolean | null;
  id?: string | null;
  timeCreated?: string | null;
  userId?: string | null;
};
export type DiscordAuthToDiscordRole_arr_rel_insert_input = {
  data: ReadonlyArray<DiscordAuthToDiscordRole_insert_input>;
  on_conflict?: DiscordAuthToDiscordRole_on_conflict | null;
};
export type DiscordAuthToDiscordRole_insert_input = {
  DiscordAuth?: DiscordAuth_obj_rel_insert_input | null;
  DiscordRole?: DiscordRole_obj_rel_insert_input | null;
  discordAuthId?: string | null;
  discordRoleId?: string | null;
  id?: string | null;
  timeCreated?: string | null;
};
export type DiscordRole_obj_rel_insert_input = {
  data: DiscordRole_insert_input;
  on_conflict?: DiscordRole_on_conflict | null;
};
export type DiscordRole_insert_input = {
  id?: string | null;
  name?: string | null;
};
export type DiscordRole_on_conflict = {
  constraint: DiscordRole_constraint;
  update_columns: ReadonlyArray<DiscordRole_update_column>;
  where?: DiscordRole_bool_exp | null;
};
export type DiscordAuthToDiscordRole_on_conflict = {
  constraint: DiscordAuthToDiscordRole_constraint;
  update_columns: ReadonlyArray<DiscordAuthToDiscordRole_update_column>;
  where?: DiscordAuthToDiscordRole_bool_exp | null;
};
export type DiscordAuth_on_conflict = {
  constraint: DiscordAuth_constraint;
  update_columns: ReadonlyArray<DiscordAuth_update_column>;
  where?: DiscordAuth_bool_exp | null;
};
export type UserFollows_arr_rel_insert_input = {
  data: ReadonlyArray<UserFollows_insert_input>;
  on_conflict?: UserFollows_on_conflict | null;
};
export type UserFollows_insert_input = {
  Followed?: User_obj_rel_insert_input | null;
  Follower?: User_obj_rel_insert_input | null;
  followedId?: string | null;
  followerId?: string | null;
  id?: string | null;
  timeCreated?: string | null;
};
export type UserFollows_on_conflict = {
  constraint: UserFollows_constraint;
  update_columns: ReadonlyArray<UserFollows_update_column>;
  where?: UserFollows_bool_exp | null;
};
export type User_on_conflict = {
  constraint: User_constraint;
  update_columns: ReadonlyArray<User_update_column>;
  where?: User_bool_exp | null;
};
export type Vote_arr_rel_insert_input = {
  data: ReadonlyArray<Vote_insert_input>;
  on_conflict?: Vote_on_conflict | null;
};
export type Vote_on_conflict = {
  constraint: Vote_constraint;
  update_columns: ReadonlyArray<Vote_update_column>;
  where?: Vote_bool_exp | null;
};
export type SubmissionCardButtonsMutation$variables = {
  object: Vote_insert_input;
};
export type SubmissionCardButtonsMutation$data = {
  readonly insert_Vote_one: {
    readonly id: string;
  } | null;
};
export type SubmissionCardButtonsMutation = {
  response: SubmissionCardButtonsMutation$data;
  variables: SubmissionCardButtonsMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "object"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "object",
        "variableName": "object"
      }
    ],
    "concreteType": "Vote",
    "kind": "LinkedField",
    "name": "insert_Vote_one",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "SubmissionCardButtonsMutation",
    "selections": (v1/*: any*/),
    "type": "mutation_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SubmissionCardButtonsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "3d014973abe2f8f3b3e525f8dc8110b8",
    "id": null,
    "metadata": {},
    "name": "SubmissionCardButtonsMutation",
    "operationKind": "mutation",
    "text": "mutation SubmissionCardButtonsMutation(\n  $object: Vote_insert_input!\n) {\n  insert_Vote_one(object: $object) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "84128e214bb86bf2efc2f1fc0710d4a6";

export default node;
