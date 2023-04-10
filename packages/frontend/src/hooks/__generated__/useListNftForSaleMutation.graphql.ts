/**
 * @generated SignedSource<<5b1c198940c0533f88e5f6743b78a7e8>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Mutation } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ArtistSubmissionStatus_enum = "Approved" | "ApprovedWithoutVoting" | "Pending" | "Rejected" | "VoteActive" | "%future added value";
export type ArtistSubmission_constraint = "ArtistSubmission_pkey" | "%future added value";
export type ArtistSubmission_update_column = "artProcess" | "artistStatement" | "discordHandle" | "id" | "instagramName" | "isCopyrightVerified" | "status" | "timeCreated" | "twitterName" | "userId" | "websiteUrl" | "%future added value";
export type Asset_constraint = "Asset_pkey" | "%future added value";
export type Asset_update_column = "artistSubmissionId" | "arweaveTxid" | "campaignGalleryAssetCampaignId" | "contentType" | "downloadUrl" | "downloadUrlDarkMode" | "height" | "id" | "path" | "pathDarkMode" | "postId" | "premintPreviewAssetCandyMachineId" | "userId" | "videoPlaybackId" | "width" | "%future added value";
export type CreatorStory_constraint = "CreatorStory_pkey" | "CreatorStory_userId_key" | "%future added value";
export type CreatorStory_update_column = "colorScheme" | "goals" | "headline" | "id" | "inspiration" | "process" | "userId" | "%future added value";
export type CurrencyNameExpress_enum = "Ash" | "Bonk" | "FamousFoxFederation" | "Particles" | "SkeletonCrew" | "Solana" | "UsdCoin" | "%future added value";
export type DiscordAuthToDiscordRole_constraint = "DiscordAuthToDiscordRole_id_key" | "DiscordAuthToDiscordRole_pkey" | "%future added value";
export type DiscordAuthToDiscordRole_update_column = "discordAuthId" | "discordRoleId" | "id" | "timeCreated" | "%future added value";
export type DiscordAuth_constraint = "DiscordAuth_authorizationNonce_key" | "DiscordAuth_discordUserId_key" | "DiscordAuth_pkey" | "DiscordAuth_userId_key" | "%future added value";
export type DiscordAuth_update_column = "authorizationNonce" | "discordHandle" | "discordUserId" | "hasConnectedDiscordAccount" | "hasJoinedDiscordServer" | "id" | "timeCreated" | "userId" | "%future added value";
export type DiscordRole_constraint = "DiscordRole_name_key" | "DiscordRole_pkey" | "%future added value";
export type DiscordRole_update_column = "id" | "name" | "%future added value";
export type NftStatus_enum = "AirdropCompleted" | "AirdropInProgress" | "Auction" | "Burned" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingScheduled" | "Owned" | "OwnedStoppedMintingForEditions" | "SoldOutEditions" | "%future added value";
export type NftTransactionTypeExpress_enum = "AuctionWon" | "Bid" | "Burned" | "ChangePriceForEditions" | "ClaimedPnft" | "HolaplexRedeemBid" | "HolaplexRedeemFullRightsTransferBid" | "HolaplexRedeemPrintingV2Bid" | "Imported" | "Listed" | "ListedEditions" | "ListedInstantSale" | "ListingCancelled" | "Minted" | "Offer" | "OfferCancelled" | "Refunded" | "Sold" | "SoldAcceptedOffer" | "SoldEditionPrimary" | "SoldGenerativeMint" | "SoldInstantSale" | "StoppedMintingForEditions" | "Transferred" | "%future added value";
export type Nft_constraint = "Nft_metadataId_key" | "Nft_mint_key" | "Nft_pkey" | "%future added value";
export type Nft_update_column = "auctionCount" | "campaignFundingTierId" | "creatorId" | "edition" | "hasBeenSold" | "id" | "isImported" | "isMasterEdition" | "isPnft" | "masterEdition" | "masterEditionMint" | "maxSupply" | "metadataId" | "mint" | "ownerId" | "priceLastSoldCurrencyId" | "priceLastSoldForInLamports" | "seriesId" | "seriesRarityBasisPoints" | "seriesRarityRanking" | "standardEdition" | "status" | "timeCreated" | "timeLastEditionSoldPrimary" | "%future added value";
export type Photo_constraint = "Photo_pkey" | "%future added value";
export type Photo_update_column = "description" | "id" | "photoUrl" | "storagePath" | "timeCreated" | "title" | "userId" | "%future added value";
export type Tag_constraint = "Tag_pkey" | "Tag_value_key" | "%future added value";
export type Tag_update_column = "id" | "value" | "%future added value";
export type UnlockableCategory = "DigitalDownload" | "Merch" | "Other" | "PhysicalOriginal" | "PhysicalPrint" | "%future added value";
export type UserFollows_constraint = "UserFollows_followedId_followerId_key" | "UserFollows_pkey" | "%future added value";
export type UserFollows_update_column = "followedId" | "followerId" | "id" | "timeCreated" | "%future added value";
export type User_constraint = "User_coverPhotoId_key" | "User_email_key" | "User_pkey" | "User_profilePhotoId_key" | "User_username_key" | "%future added value";
export type User_update_column = "bio" | "coverPhotoId" | "discordHandle" | "displayName" | "email" | "emailBlocklist" | "hasCompletedSignup" | "hasTakenCollectorSurvey2023" | "hasTakenCreatorSurvey2023" | "hasUnseenActivity" | "id" | "instagramName" | "isCollector2" | "isWhitelisted" | "profilePhotoId" | "seriesOrder" | "shouldBlurNsfwContent" | "shouldSeeDiscordOnboardingPrompt" | "timeCreated" | "twitterName" | "username" | "websiteUrl" | "%future added value";
export type VoteReason_enum = "BreaksGuidelines" | "Duplicate" | "LowQuality" | "VoteFailed" | "%future added value";
export type VoteType_enum = "Approve" | "PrescreenApprove" | "PrescreenReject" | "Reject" | "ReportSubmission" | "Skip" | "Upvote" | "%future added value";
export type Vote_constraint = "Vote_pkey" | "%future added value";
export type Vote_update_column = "artistSubmissionId" | "id" | "reason" | "reportReasons" | "timeCreated" | "userId" | "voteType" | "%future added value";
export type NftToTag_bool_exp = {
  Nft?: Nft_bool_exp | null;
  Tag?: Tag_bool_exp | null;
  _and?: ReadonlyArray<NftToTag_bool_exp> | null;
  _not?: NftToTag_bool_exp | null;
  _or?: ReadonlyArray<NftToTag_bool_exp> | null;
  id?: uuid_comparison_exp | null;
  nftId?: String_comparison_exp | null;
  tagId?: uuid_comparison_exp | null;
};
export type Nft_bool_exp = {
  Creator?: User_bool_exp | null;
  _and?: ReadonlyArray<Nft_bool_exp> | null;
  _not?: Nft_bool_exp | null;
  _or?: ReadonlyArray<Nft_bool_exp> | null;
  auctionCount?: Int_comparison_exp | null;
  campaignFundingTierId?: uuid_comparison_exp | null;
  creatorId?: String_comparison_exp | null;
  edition?: Int_comparison_exp | null;
  hasBeenSold?: Boolean_comparison_exp | null;
  id?: String_comparison_exp | null;
  isImported?: Boolean_comparison_exp | null;
  isMasterEdition?: Boolean_comparison_exp | null;
  isPnft?: Boolean_comparison_exp | null;
  masterEdition?: String_comparison_exp | null;
  masterEditionMint?: String_comparison_exp | null;
  maxSupply?: Int_comparison_exp | null;
  metadataId?: String_comparison_exp | null;
  mint?: String_comparison_exp | null;
  ownerId?: String_comparison_exp | null;
  priceLastSoldCurrencyId?: uuid_comparison_exp | null;
  priceLastSoldForInLamports?: bigint_comparison_exp | null;
  seriesId?: String_comparison_exp | null;
  seriesRarityBasisPoints?: numeric_comparison_exp | null;
  seriesRarityRanking?: Int_comparison_exp | null;
  standardEdition?: String_comparison_exp | null;
  status?: NftStatus_enum_comparison_exp | null;
  timeCreated?: timestamptz_comparison_exp | null;
  timeLastEditionSoldPrimary?: timestamptz_comparison_exp | null;
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
export type VoteType_enum_comparison_exp = {
  _eq?: VoteType_enum | null;
  _in?: ReadonlyArray<VoteType_enum> | null;
  _is_null?: boolean | null;
  _neq?: VoteType_enum | null;
  _nin?: ReadonlyArray<VoteType_enum> | null;
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
export type ArtistSubmissionStatus_enum_comparison_exp = {
  _eq?: ArtistSubmissionStatus_enum | null;
  _in?: ReadonlyArray<ArtistSubmissionStatus_enum> | null;
  _is_null?: boolean | null;
  _neq?: ArtistSubmissionStatus_enum | null;
  _nin?: ReadonlyArray<ArtistSubmissionStatus_enum> | null;
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
export type bigint_comparison_exp = {
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
export type numeric_comparison_exp = {
  _eq?: any | null;
  _gt?: any | null;
  _gte?: any | null;
  _in?: ReadonlyArray<any> | null;
  _is_null?: boolean | null;
  _lt?: any | null;
  _lte?: any | null;
  _neq?: any | null;
  _nin?: ReadonlyArray<any> | null;
};
export type NftStatus_enum_comparison_exp = {
  _eq?: NftStatus_enum | null;
  _in?: ReadonlyArray<NftStatus_enum> | null;
  _is_null?: boolean | null;
  _neq?: NftStatus_enum | null;
  _nin?: ReadonlyArray<NftStatus_enum> | null;
};
export type Tag_bool_exp = {
  _and?: ReadonlyArray<Tag_bool_exp> | null;
  _not?: Tag_bool_exp | null;
  _or?: ReadonlyArray<Tag_bool_exp> | null;
  id?: uuid_comparison_exp | null;
  value?: String_comparison_exp | null;
  valueLength?: Int_comparison_exp | null;
};
export type NftToTag_insert_input = {
  Nft?: Nft_obj_rel_insert_input | null;
  Tag?: Tag_obj_rel_insert_input | null;
  id?: string | null;
  nftId?: string | null;
  tagId?: string | null;
};
export type Nft_obj_rel_insert_input = {
  data: Nft_insert_input;
  on_conflict?: Nft_on_conflict | null;
};
export type Nft_insert_input = {
  Creator?: User_obj_rel_insert_input | null;
  auctionCount?: number | null;
  campaignFundingTierId?: string | null;
  creatorId?: string | null;
  edition?: number | null;
  hasBeenSold?: boolean | null;
  id?: string | null;
  isImported?: boolean | null;
  isMasterEdition?: boolean | null;
  isPnft?: boolean | null;
  masterEdition?: string | null;
  masterEditionMint?: string | null;
  maxSupply?: number | null;
  metadataId?: string | null;
  mint?: string | null;
  ownerId?: string | null;
  priceLastSoldCurrencyId?: string | null;
  priceLastSoldForInLamports?: number | null;
  seriesId?: string | null;
  seriesRarityBasisPoints?: any | null;
  seriesRarityRanking?: number | null;
  standardEdition?: string | null;
  status?: NftStatus_enum | null;
  timeCreated?: string | null;
  timeLastEditionSoldPrimary?: string | null;
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
export type Vote_arr_rel_insert_input = {
  data: ReadonlyArray<Vote_insert_input>;
  on_conflict?: Vote_on_conflict | null;
};
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
export type ArtistSubmission_on_conflict = {
  constraint: ArtistSubmission_constraint;
  update_columns: ReadonlyArray<ArtistSubmission_update_column>;
  where?: ArtistSubmission_bool_exp | null;
};
export type Vote_on_conflict = {
  constraint: Vote_constraint;
  update_columns: ReadonlyArray<Vote_update_column>;
  where?: Vote_bool_exp | null;
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
export type Nft_on_conflict = {
  constraint: Nft_constraint;
  update_columns: ReadonlyArray<Nft_update_column>;
  where?: Nft_bool_exp | null;
};
export type Tag_obj_rel_insert_input = {
  data: Tag_insert_input;
  on_conflict?: Tag_on_conflict | null;
};
export type Tag_insert_input = {
  id?: string | null;
  value?: string | null;
};
export type Tag_on_conflict = {
  constraint: Tag_constraint;
  update_columns: ReadonlyArray<Tag_update_column>;
  where?: Tag_bool_exp | null;
};
export type InsertNftTransactionUpdateNftInput = {
  antiBotProtectionEnabled?: boolean | null;
  auctionDurationInSeconds?: number | null;
  editionBuyLimitPerAddress?: number | null;
  insertUnlockableInput?: InsertUnlockableInput | null;
  pnftIdForAuction?: string | null;
  scheduledAuctionTime?: string | null;
  tickSizeConstantInLamports?: number | null;
  timeExtensionDurationInSeconds?: number | null;
};
export type InsertUnlockableInput = {
  asset: AssetInput;
  unlockable: UnlockableInput;
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
export type UnlockableInput = {
  activationPriceInLamports?: number | null;
  category: UnlockableCategory;
  description?: string | null;
  id: string;
  name: string;
};
export type UnlockableWinnerUserEmailInput = {
  viewerId?: string | null;
};
export type useListNftForSaleMutation$variables = {
  connections: ReadonlyArray<string>;
  creator: string;
  currencyName: CurrencyNameExpress_enum;
  deleteFilter: NftToTag_bool_exp;
  lister: string;
  listingType: NftTransactionTypeExpress_enum;
  mint: string;
  nftToTagObjects: ReadonlyArray<NftToTag_insert_input>;
  price: number;
  txid: string;
  unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput;
  updateNftInput: InsertNftTransactionUpdateNftInput;
};
export type useListNftForSaleMutation$data = {
  readonly delete_NftToTag: {
    readonly returning: ReadonlyArray<{
      readonly nftId: string;
      readonly tagId: string;
    }>;
  } | null;
  readonly insertNftTransaction: {
    readonly transaction: {
      readonly " $fragmentSpreads": FragmentRefs<"NftTransaction_NftTransactionExpress">;
    };
    readonly updatedMetadataAccount: {
      readonly " $fragmentSpreads": FragmentRefs<"NftPageContent_MetadataAccount">;
    };
  };
  readonly insert_NftToTag: {
    readonly returning: ReadonlyArray<{
      readonly nftId: string;
      readonly tagId: string;
    }>;
  } | null;
};
export type useListNftForSaleMutation = {
  response: useListNftForSaleMutation$data;
  variables: useListNftForSaleMutation$variables;
};

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "connections"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "creator"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "currencyName"
},
v3 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "deleteFilter"
},
v4 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "lister"
},
v5 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "listingType"
},
v6 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "mint"
},
v7 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "nftToTagObjects"
},
v8 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "price"
},
v9 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "txid"
},
v10 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "unlockableWinnerUserEmailInput"
},
v11 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "updateNftInput"
},
v12 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "NftToTag",
    "kind": "LinkedField",
    "name": "returning",
    "plural": true,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "nftId",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "tagId",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
],
v13 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "where",
      "variableName": "deleteFilter"
    }
  ],
  "concreteType": "NftToTag_mutation_response",
  "kind": "LinkedField",
  "name": "delete_NftToTag",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v14 = {
  "alias": null,
  "args": [
    {
      "kind": "Variable",
      "name": "objects",
      "variableName": "nftToTagObjects"
    }
  ],
  "concreteType": "NftToTag_mutation_response",
  "kind": "LinkedField",
  "name": "insert_NftToTag",
  "plural": false,
  "selections": (v12/*: any*/),
  "storageKey": null
},
v15 = [
  {
    "fields": [
      {
        "kind": "Variable",
        "name": "creatorId",
        "variableName": "creator"
      },
      {
        "kind": "Variable",
        "name": "currencyName",
        "variableName": "currencyName"
      },
      {
        "kind": "Variable",
        "name": "fromUserId",
        "variableName": "lister"
      },
      {
        "kind": "Variable",
        "name": "mint",
        "variableName": "mint"
      },
      {
        "kind": "Variable",
        "name": "price",
        "variableName": "price"
      },
      {
        "kind": "Variable",
        "name": "toUserId",
        "variableName": "lister"
      },
      {
        "kind": "Variable",
        "name": "txid",
        "variableName": "txid"
      },
      {
        "kind": "Variable",
        "name": "type",
        "variableName": "listingType"
      },
      {
        "kind": "Variable",
        "name": "updateNftInput",
        "variableName": "updateNftInput"
      }
    ],
    "kind": "ObjectValue",
    "name": "input"
  }
],
v16 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "edition",
  "storageKey": null
},
v17 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "maxSupply",
  "storageKey": null
},
v18 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "amount",
  "storageKey": null
},
v19 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "decimals",
  "storageKey": null
},
v20 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v21 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "symbol",
  "storageKey": null
},
v22 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "shortSymbol",
  "storageKey": null
},
v23 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v24 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "type",
  "storageKey": null
},
v25 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v26 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "photoUrl",
  "storageKey": null
},
v27 = {
  "alias": null,
  "args": null,
  "concreteType": "PhotoExpress",
  "kind": "LinkedField",
  "name": "ProfilePhoto",
  "plural": false,
  "selections": [
    (v26/*: any*/),
    (v20/*: any*/)
  ],
  "storageKey": null
},
v28 = [
  (v25/*: any*/),
  (v27/*: any*/),
  (v20/*: any*/)
],
v29 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "contentType",
  "storageKey": null
},
v30 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "videoPlaybackId",
  "storageKey": null
},
v31 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v32 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "downloadUrl",
  "storageKey": null
},
v33 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "status",
  "storageKey": null
},
v34 = [
  (v20/*: any*/),
  (v26/*: any*/)
],
v35 = [
  (v20/*: any*/),
  (v25/*: any*/),
  (v27/*: any*/)
],
v36 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v37 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "mint",
  "storageKey": null
},
v38 = [
  (v18/*: any*/),
  {
    "alias": null,
    "args": null,
    "concreteType": "CurrencyExpress",
    "kind": "LinkedField",
    "name": "currencyInfo",
    "plural": false,
    "selections": [
      (v19/*: any*/),
      (v20/*: any*/),
      (v21/*: any*/),
      (v22/*: any*/)
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v10/*: any*/),
      (v11/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "useListNftForSaleMutation",
    "selections": [
      (v13/*: any*/),
      (v14/*: any*/),
      {
        "alias": null,
        "args": (v15/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NftTransaction_NftTransactionExpress"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "NftPageContent_MetadataAccount"
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v2/*: any*/),
      (v1/*: any*/),
      (v3/*: any*/),
      (v4/*: any*/),
      (v5/*: any*/),
      (v6/*: any*/),
      (v7/*: any*/),
      (v8/*: any*/),
      (v9/*: any*/),
      (v11/*: any*/),
      (v10/*: any*/)
    ],
    "kind": "Operation",
    "name": "useListNftForSaleMutation",
    "selections": [
      (v13/*: any*/),
      (v14/*: any*/),
      {
        "alias": null,
        "args": (v15/*: any*/),
        "concreteType": "InsertNftTransactionResponse",
        "kind": "LinkedField",
        "name": "insertNftTransaction",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "NftTransactionExpress",
            "kind": "LinkedField",
            "name": "transaction",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "auctionCount",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "comment",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "fromAddress",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NftTransactionNftInfo",
                "kind": "LinkedField",
                "name": "nftInfo",
                "plural": false,
                "selections": [
                  (v16/*: any*/),
                  (v17/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Price",
                "kind": "LinkedField",
                "name": "price",
                "plural": false,
                "selections": [
                  (v18/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CurrencyExpress",
                    "kind": "LinkedField",
                    "name": "currencyInfo",
                    "plural": false,
                    "selections": [
                      (v19/*: any*/),
                      (v20/*: any*/),
                      (v21/*: any*/),
                      (v22/*: any*/),
                      (v23/*: any*/)
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
                "name": "source",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "timeCreated",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "toAddress",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "txid",
                "storageKey": null
              },
              (v24/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "usdPrice",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "From",
                "plural": false,
                "selections": (v28/*: any*/),
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UserExpress",
                "kind": "LinkedField",
                "name": "To",
                "plural": false,
                "selections": (v28/*: any*/),
                "storageKey": null
              },
              (v20/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "filters": null,
            "handle": "prependNode",
            "key": "",
            "kind": "LinkedHandle",
            "name": "transaction",
            "handleArgs": [
              {
                "kind": "Variable",
                "name": "connections",
                "variableName": "connections"
              },
              {
                "kind": "Literal",
                "name": "edgeTypeName",
                "value": "NftTransactionsEdge"
              }
            ]
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "MetadataAccount",
            "kind": "LinkedField",
            "name": "updatedMetadataAccount",
            "plural": false,
            "selections": [
              (v20/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "assetHeight",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "assetWidth",
                "storageKey": null
              },
              (v29/*: any*/),
              (v30/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "MetadataOffchain",
                "kind": "LinkedField",
                "name": "offchainData",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "image",
                    "storageKey": null
                  },
                  {
                    "alias": "listingCardImage",
                    "args": null,
                    "kind": "ScalarField",
                    "name": "image",
                    "storageKey": null
                  },
                  (v31/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "AssetExpress",
                "kind": "LinkedField",
                "name": "nonstandardAsset",
                "plural": false,
                "selections": [
                  (v29/*: any*/),
                  (v32/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssetDarkModeInfo",
                    "kind": "LinkedField",
                    "name": "darkModeInfo",
                    "plural": false,
                    "selections": [
                      (v32/*: any*/)
                    ],
                    "storageKey": null
                  },
                  (v30/*: any*/),
                  (v20/*: any*/)
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "NftExpress",
                "kind": "LinkedField",
                "name": "nft",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "creatorId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "ownerId",
                    "storageKey": null
                  },
                  (v33/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "SeriesExpress",
                    "kind": "LinkedField",
                    "name": "Series",
                    "plural": false,
                    "selections": [
                      (v20/*: any*/),
                      (v24/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "slug",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhotoExpress",
                        "kind": "LinkedField",
                        "name": "AvatarPhoto",
                        "plural": false,
                        "selections": (v34/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "Creator",
                        "plural": false,
                        "selections": [
                          (v25/*: any*/),
                          (v20/*: any*/)
                        ],
                        "storageKey": null
                      },
                      (v23/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Creator",
                    "plural": false,
                    "selections": (v35/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftDisclosureExpress",
                    "kind": "LinkedField",
                    "name": "disclosures",
                    "plural": true,
                    "selections": [
                      (v24/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "details",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "CandyMachineExpress",
                    "kind": "LinkedField",
                    "name": "CandyMachine",
                    "plural": false,
                    "selections": [
                      (v36/*: any*/),
                      (v20/*: any*/),
                      (v17/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isImported",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "masterEditionMint",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "Owner",
                    "plural": false,
                    "selections": [
                      (v25/*: any*/),
                      (v20/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "PhotoExpress",
                        "kind": "LinkedField",
                        "name": "ProfilePhoto",
                        "plural": false,
                        "selections": (v34/*: any*/),
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isMasterEdition",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isPnft",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxSupplyOnchain",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "maxSupplyOfMasterEdition",
                    "storageKey": null
                  },
                  (v16/*: any*/),
                  (v17/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "numberOfStandardEditionsMinted",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionEndTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionHoldingPeriodEndTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "isOffPlatform",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceV2",
                    "plural": false,
                    "selections": [
                      (v18/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "CurrencyExpress",
                        "kind": "LinkedField",
                        "name": "currencyInfo",
                        "plural": false,
                        "selections": [
                          (v19/*: any*/),
                          (v20/*: any*/),
                          (v21/*: any*/),
                          (v22/*: any*/),
                          (v23/*: any*/),
                          (v37/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceLastSoldV2",
                    "plural": false,
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "scheduledAuctionTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionDurationInSeconds",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "timeExtensionDurationInSeconds",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "TickSizeInfo",
                    "kind": "LinkedField",
                    "name": "tickSizeInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "tickSizeConstantInLamports",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "antiBotProtectionEnabled",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "editionAllowlistEnabled",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "editionPublicSaleStartTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "editionBuyLimitPerAddress",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "EditionPriceInfo",
                    "kind": "LinkedField",
                    "name": "editionPriceInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "allowlistPriceInFullDecimals",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceFunctionType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "priceParams",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "startingPriceInLamports",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "seriesRarityRanking",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "editionAllowlistSaleStartTime",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": null,
                    "kind": "LinkedField",
                    "name": "CampaignFundingTier",
                    "plural": false,
                    "selections": [
                      (v36/*: any*/),
                      (v20/*: any*/),
                      {
                        "kind": "InlineFragment",
                        "selections": [
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "CampaignBenefitExpress",
                            "kind": "LinkedField",
                            "name": "benefits",
                            "plural": true,
                            "selections": [
                              (v31/*: any*/),
                              (v20/*: any*/)
                            ],
                            "storageKey": null
                          }
                        ],
                        "type": "CampaignFundingTierStandard",
                        "abstractKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "auctionWinnerId",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "pnftIdForAuction",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "priceLastListedV2",
                    "plural": false,
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UserExpress",
                    "kind": "LinkedField",
                    "name": "AuctionWinner",
                    "plural": false,
                    "selections": (v28/*: any*/),
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "MetadataAccountData",
                "kind": "LinkedField",
                "name": "data",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "MetadataCreator",
                    "kind": "LinkedField",
                    "name": "creators",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "address",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "share",
                        "storageKey": null
                      },
                      (v33/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": (v35/*: any*/),
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "requestId",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v23/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "sellerFeeBasisPoints",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "NftAttribute",
                    "kind": "LinkedField",
                    "name": "attributes",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "traitType",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "value",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              (v37/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "primarySaleHappened",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "videoPreviewPlaybackId",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "numberOfBidsForCurrentAuction",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "tags",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "UnlockableExpress",
                "kind": "LinkedField",
                "name": "unlockable",
                "plural": false,
                "selections": [
                  (v36/*: any*/),
                  (v20/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "Price",
                    "kind": "LinkedField",
                    "name": "activationPrice",
                    "plural": false,
                    "selections": (v38/*: any*/),
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "activationPriceInLamports",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "category",
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "AssetExpress",
                    "kind": "LinkedField",
                    "name": "asset",
                    "plural": false,
                    "selections": [
                      (v29/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "path",
                        "storageKey": null
                      },
                      (v20/*: any*/)
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "UnlockableWinnerExpress",
                    "kind": "LinkedField",
                    "name": "unlockableWinners",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasBuyerDismissedShareInfoCta",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": [
                          {
                            "kind": "Variable",
                            "name": "input",
                            "variableName": "unlockableWinnerUserEmailInput"
                          }
                        ],
                        "kind": "ScalarField",
                        "name": "userEmail",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "userId",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasCreatorDismissedSeeInfoCta",
                        "storageKey": null
                      },
                      (v20/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "UserExpress",
                        "kind": "LinkedField",
                        "name": "user",
                        "plural": false,
                        "selections": [
                          (v20/*: any*/),
                          (v25/*: any*/)
                        ],
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v31/*: any*/),
                  (v23/*: any*/)
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
    "cacheID": "9dd68aec18f63e3391244ccd1c45f969",
    "id": null,
    "metadata": {},
    "name": "useListNftForSaleMutation",
    "operationKind": "mutation",
    "text": "mutation useListNftForSaleMutation(\n  $currencyName: CurrencyNameExpress_enum!\n  $creator: String!\n  $deleteFilter: NftToTag_bool_exp!\n  $lister: String!\n  $listingType: NftTransactionTypeExpress_enum!\n  $mint: String!\n  $nftToTagObjects: [NftToTag_insert_input!]!\n  $price: bigint!\n  $txid: String!\n  $updateNftInput: InsertNftTransactionUpdateNftInput!\n  $unlockableWinnerUserEmailInput: UnlockableWinnerUserEmailInput!\n) {\n  delete_NftToTag(where: $deleteFilter) {\n    returning {\n      nftId\n      tagId\n    }\n  }\n  insert_NftToTag(objects: $nftToTagObjects) {\n    returning {\n      nftId\n      tagId\n    }\n  }\n  insertNftTransaction(input: {creatorId: $creator, currencyName: $currencyName, fromUserId: $lister, mint: $mint, price: $price, toUserId: $lister, txid: $txid, type: $listingType, updateNftInput: $updateNftInput}) {\n    transaction {\n      ...NftTransaction_NftTransactionExpress\n      id\n    }\n    updatedMetadataAccount {\n      ...NftPageContent_MetadataAccount\n      id\n    }\n  }\n}\n\nfragment AcceptOfferModal_MetadataAccount on MetadataAccount {\n  id\n  mint\n  data {\n    name\n    creators {\n      address\n    }\n  }\n  nft {\n    priceV2 {\n      amount\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    status\n    creatorId\n    ownerId\n    id\n  }\n  ...SettleSaleModalContent_MetadataAccount\n  ...useSettleSale_MetadataAccount\n}\n\nfragment AddToAllowlistModal_MetadataAccount on MetadataAccount {\n  mint\n}\n\nfragment ArtistPillButtonForUserExpress_UserExpress on UserExpress {\n  username\n  ProfilePhoto {\n    photoUrl\n    id\n  }\n}\n\nfragment AssetForAssetExpress_AssetExpress on AssetExpress {\n  contentType\n  downloadUrl\n  darkModeInfo {\n    downloadUrl\n  }\n  videoPlaybackId\n}\n\nfragment AuctionSettingsModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    priceV2 {\n      ...useGetCurrencyConfigForPrice_Price\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    auctionDurationInSeconds\n    scheduledAuctionTime\n    timeExtensionDurationInSeconds\n    tickSizeInfo {\n      tickSizeConstantInLamports\n    }\n    id\n  }\n}\n\nfragment BidModal_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    name\n  }\n  nft {\n    CampaignFundingTier {\n      __typename\n      ...CampaignBenefitsSection_CampaignFundingTierStandard\n      id\n    }\n    priceV2 {\n      amount\n      currencyInfo {\n        decimals\n        name\n        id\n      }\n      ...useGetCurrencyConfigForPrice_Price\n      ...useAuctionHouseSdkForPrice_Price\n      ...useNftPriceSymbol_Price\n    }\n    auctionEndTime\n    auctionWinnerId\n    creatorId\n    ownerId\n    status\n    tickSizeInfo {\n      tickSizeConstantInLamports\n    }\n    id\n  }\n  numberOfBidsForCurrentAuction\n  ...ListingCardForMetadata_MetadataAccount\n  ...useUnlockablePurchaseMessage_MetadataAccount\n}\n\nfragment BurnModal_MetadataAccount on MetadataAccount {\n  mint\n}\n\nfragment BuyEditionModalPriceInput_Price on Price {\n  currencyInfo {\n    name\n    id\n  }\n  ...PriceWithSymbol_Price\n  ...useGetCurrencyConfigForPrice_Price\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment BuyEditionModal_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  nft {\n    editionPublicSaleStartTime\n    editionBuyLimitPerAddress\n    editionPriceInfo {\n      allowlistPriceInFullDecimals\n      priceFunctionType\n    }\n    priceV2 {\n      amount\n      currencyInfo {\n        decimals\n        id\n      }\n      ...BuyEditionModalPriceInput_Price\n      ...useFormattedNftPrice_Price\n    }\n    id\n  }\n  ...useBuyEdition_MetadataAccount\n  ...BuyNowGenericModalForMetadataAccount_MetadataAccount\n}\n\nfragment BuyNowGenericModalForMetadataAccount_MetadataAccount on MetadataAccount {\n  data {\n    name\n  }\n  nft {\n    CampaignFundingTier {\n      __typename\n      ...CampaignBenefitsSection_CampaignFundingTierStandard\n      id\n    }\n    priceV2 {\n      ...BuyNowGenericModal_Price\n    }\n    id\n  }\n  ...ListingCardForMetadata_MetadataAccount\n}\n\nfragment BuyNowGenericModal_Price on Price {\n  currencyInfo {\n    name\n    id\n  }\n  ...PriceWithSymbol_Price\n  ...useFormattedNftPrice_Price\n}\n\nfragment BuyNowModal_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    creators {\n      address\n    }\n  }\n  nft {\n    auctionWinnerId\n    creatorId\n    priceV2 {\n      amount\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    ownerId\n    id\n  }\n  ...useSettleSale_MetadataAccount\n  ...BuyNowGenericModalForMetadataAccount_MetadataAccount\n  ...useUnlockablePurchaseMessage_MetadataAccount\n}\n\nfragment CampaignBenefitsSection_CampaignFundingTierStandard on CampaignFundingTierStandard {\n  benefits {\n    description\n    id\n  }\n}\n\nfragment CancelListingModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    creatorId\n    priceV2 {\n      amount\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    status\n    id\n  }\n}\n\nfragment CancelOfferModal_MetadataAccount on MetadataAccount {\n  id\n  mint\n}\n\nfragment ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount on MetadataAccount {\n  nft {\n    priceV2 {\n      amount\n      currencyInfo {\n        decimals\n        id\n      }\n      ...useGetCurrencyConfigForPrice_Price\n    }\n    id\n  }\n  ...useChangePriceForEditions_MetadataAccount\n}\n\nfragment ChangePriceForEditionsLinearPrice_MetadataAccount on MetadataAccount {\n  nft {\n    priceV2 {\n      currencyInfo {\n        decimals\n        id\n      }\n      ...useGetCurrencyConfigForPrice_Price\n    }\n    editionPriceInfo {\n      priceParams\n      startingPriceInLamports\n    }\n    id\n  }\n  ...useChangePriceForEditions_MetadataAccount\n}\n\nfragment ChangePriceForEditionsModalContent_MetadataAccount on MetadataAccount {\n  ...ChangePriceForEditionsConstantOrMinimumPrice_MetadataAccount\n  ...ChangePriceForEditionsLinearPrice_MetadataAccount\n}\n\nfragment ChangePriceForEditionsModal_MetadataAccount on MetadataAccount {\n  ...ChangePriceForEditionsModalContent_MetadataAccount\n}\n\nfragment ChangePriceModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    creatorId\n    priceV2 {\n      amount\n      currencyInfo {\n        decimals\n        id\n      }\n      ...useAuctionHouseSdkForPrice_Price\n      ...useGetCurrencyConfigForPrice_Price\n    }\n    status\n    scheduledAuctionTime\n    id\n  }\n}\n\nfragment ClaimPnftModal_AuctionNft_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n}\n\nfragment CollaboratorApprovalModal_MetadataAccount on MetadataAccount {\n  id\n  mint\n  data {\n    creators {\n      address\n      requestId\n    }\n    name\n  }\n  nft {\n    id\n    creatorId\n    Creator {\n      id\n      username\n    }\n  }\n  ...ListingCardForMetadata_MetadataAccount\n}\n\nfragment CrossmintButtonWrapper_MetadataAccount on MetadataAccount {\n  mint\n  primarySaleHappened\n  nft {\n    ownerId\n    priceV2 {\n      currencyInfo {\n        name\n        id\n      }\n    }\n    status\n    id\n  }\n  unlockable {\n    __typename\n    id\n  }\n  ...CrossmintModal_MetadataAccount\n}\n\nfragment CrossmintButton_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    creators {\n      address\n    }\n    name\n  }\n  nft {\n    ownerId\n    priceV2 {\n      amount\n    }\n    id\n  }\n  offchainData {\n    description\n    image\n  }\n}\n\nfragment CrossmintModal_MetadataAccount on MetadataAccount {\n  ...CrossmintButton_MetadataAccount\n}\n\nfragment DeleteModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment EditTagsModal_MetadataAccount on MetadataAccount {\n  mint\n  tags\n}\n\nfragment GenerativeKindLabel_MetadataAccount on MetadataAccount {\n  nft {\n    CandyMachine {\n      maxSupply\n      id\n    }\n    Series {\n      ...useSeriesLinkRelativeForSeriesExpress_SeriesExpress\n      id\n    }\n    id\n  }\n}\n\nfragment HowAuctionsWorkButton_MetadataAccount on MetadataAccount {\n  ...HowAuctionsWorkModal_MetadataAccount\n}\n\nfragment HowAuctionsWorkModal_MetadataAccount on MetadataAccount {\n  nft {\n    auctionDurationInSeconds\n    timeExtensionDurationInSeconds\n    priceV2 {\n      currencyInfo {\n        decimals\n        shortSymbol\n        symbol\n        id\n      }\n    }\n    tickSizeInfo {\n      tickSizeConstantInLamports\n    }\n    id\n  }\n}\n\nfragment ListEditionsConstantOrMinimumPrice_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  ...useListEditionsForSale_MetadataAccount\n}\n\nfragment ListEditionsLinearPrice_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  ...useListEditionsForSale_MetadataAccount\n}\n\nfragment ListEditionsModalContent_MetadataAccount on MetadataAccount {\n  ...ListEditionsConstantOrMinimumPrice_MetadataAccount\n  ...ListEditionsLinearPrice_MetadataAccount\n}\n\nfragment ListEditionsModal_MetadataAccount on MetadataAccount {\n  ...ListEditionsModalContent_MetadataAccount\n}\n\nfragment ListNftButton_MetadataAccount on MetadataAccount {\n  ...ListNftModal_MetadataAccount\n  ...ListNftContextProvider_MetadataAccount\n}\n\nfragment ListNftContextProvider_MetadataAccount on MetadataAccount {\n  ...ListingContext_MetadataAccount\n}\n\nfragment ListNftForAuctionSteps_MetadataAccount on MetadataAccount {\n  ...ListNftForAuction_MetadataAccount\n  ...ListNftForAuctionWithPnft_MetadataAccount\n  ...ListNftForAuctionWithUnlockable_MetadataAccount\n}\n\nfragment ListNftForAuctionWithPnft_MetadataAccount on MetadataAccount {\n  mint\n  ...useListNftForSale_MetadataAccount\n}\n\nfragment ListNftForAuctionWithUnlockable_MetadataAccount on MetadataAccount {\n  ...useListNftForSale_MetadataAccount\n}\n\nfragment ListNftForAuction_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  ...useListNftForSale_MetadataAccount\n}\n\nfragment ListNftForInstantSaleSteps_MetadataAccount on MetadataAccount {\n  ...ListNftForInstantSale_MetadataAccount\n  ...ListNftForInstantSaleWithUnlockable_MetadataAccount\n}\n\nfragment ListNftForInstantSaleWithUnlockable_MetadataAccount on MetadataAccount {\n  ...useListNftForSale_MetadataAccount\n}\n\nfragment ListNftForInstantSale_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  ...useListNftForSale_MetadataAccount\n}\n\nfragment ListNftModal_MetadataAccount on MetadataAccount {\n  ...useNftKind_MetadataAccount\n  ...ListEditionsModal_MetadataAccount\n  ...ListOneOfOneModal_MetadataAccount\n}\n\nfragment ListOneOfOneModalContent_MetadataAccount on MetadataAccount {\n  ...ListNftForAuctionSteps_MetadataAccount\n  ...ListNftForInstantSaleSteps_MetadataAccount\n}\n\nfragment ListOneOfOneModal_MetadataAccount on MetadataAccount {\n  ...ListOneOfOneModalContent_MetadataAccount\n}\n\nfragment ListingCardForMetadata_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  contentType\n  primarySaleHappened\n  videoPlaybackId\n  videoPreviewPlaybackId\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n        id\n      }\n    }\n  }\n  offchainData {\n    listingCardImage: image\n  }\n  nft {\n    creatorId\n    isImported\n    status\n    Creator {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...ListingCardNftKindPill_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftOtherInfo_MetadataAccount\n}\n\nfragment ListingCardNftKindPill_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment ListingContext_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  nft {\n    creatorId\n    id\n  }\n  data {\n    creators {\n      address\n    }\n  }\n  tags\n}\n\nfragment MakeAnOfferModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    CampaignFundingTier {\n      __typename\n      ...CampaignBenefitsSection_CampaignFundingTierStandard\n      id\n    }\n    auctionWinnerId\n    creatorId\n    ownerId\n    status\n    priceV2 {\n      currencyInfo {\n        name\n        id\n      }\n    }\n    id\n  }\n  primarySaleHappened\n  data {\n    creators {\n      address\n    }\n  }\n  ...ListingCardForMetadata_MetadataAccount\n  ...useUnlockablePurchaseMessage_MetadataAccount\n}\n\nfragment MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount on MetadataAccount {\n  ...useEditionSupply_MetadataAccount\n}\n\nfragment MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount on MetadataAccount {\n  nft {\n    status\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n}\n\nfragment NftActionButton_MetadataAccount on MetadataAccount {\n  id\n  nft {\n    id\n    editionAllowlistEnabled\n    editionAllowlistSaleStartTime\n    editionPublicSaleStartTime\n    isOffPlatform\n    ownerId\n    status\n  }\n  numberOfBidsForCurrentAuction\n  ...MakeAnOfferModal_MetadataAccount\n  ...HowAuctionsWorkButton_MetadataAccount\n  ...BidModal_MetadataAccount\n  ...BuyEditionModal_MetadataAccount\n  ...BuyNowModal_MetadataAccount\n  ...ListNftButton_MetadataAccount\n  ...NftTimeExtensionInfo_MetadataAccount\n  ...SettleModal_MetadataAccount\n  ...CancelOfferModal_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftAllowlistInfo_MetadataAccount on MetadataAccount {\n  nft {\n    editionAllowlistEnabled\n    editionAllowlistSaleStartTime\n    editionPublicSaleStartTime\n    ownerId\n    status\n    id\n  }\n}\n\nfragment NftAttributes_MetadataAccount on MetadataAccount {\n  data {\n    attributes {\n      traitType\n      value\n    }\n  }\n  nft {\n    seriesRarityRanking\n    CandyMachine {\n      maxSupply\n      id\n    }\n    id\n  }\n}\n\nfragment NftCollaboratorCard_MetadataAccount on MetadataAccount {\n  id\n  data {\n    creators {\n      address\n      share\n      status\n      user {\n        id\n        username\n      }\n    }\n    name\n  }\n  nft {\n    creatorId\n    CandyMachine {\n      __typename\n      id\n    }\n    Creator {\n      username\n      ProfilePhoto {\n        photoUrl\n        id\n      }\n      id\n    }\n    id\n  }\n  ...CollaboratorApprovalModal_MetadataAccount\n}\n\nfragment NftEllipsisShadowButton_MetadataAccount on MetadataAccount {\n  ...NftOptions_MetadataAccount\n  ...NftOptionsModals_MetadataAccount\n  ...OtherNftBottomDrawer_MetadataAccount\n}\n\nfragment NftInfoDisclosures_MetadataAccount on MetadataAccount {\n  nft {\n    disclosures {\n      details\n      type\n    }\n    id\n  }\n}\n\nfragment NftInfo_MetadataAccount on MetadataAccount {\n  id\n  nft {\n    id\n    creatorId\n    Creator {\n      id\n      username\n      ProfilePhoto {\n        id\n        photoUrl\n      }\n    }\n    Owner {\n      id\n      username\n      ProfilePhoto {\n        id\n        photoUrl\n      }\n    }\n    ownerId\n    status\n  }\n  data {\n    name\n    creators {\n      address\n      share\n      status\n      user {\n        id\n        username\n        ProfilePhoto {\n          photoUrl\n          id\n        }\n      }\n    }\n  }\n  offchainData {\n    description\n  }\n  ...NftAllowlistInfo_MetadataAccount\n  ...CrossmintButtonWrapper_MetadataAccount\n  ...NftTransaction_MetadataAccount\n  ...NftEllipsisShadowButton_MetadataAccount\n  ...NftInfoDisclosures_MetadataAccount\n  ...NftListedEllipsisShadowButton_MetadataAccount\n  ...NftPrice_MetadataAccount\n  ...NftActionButton_MetadataAccount\n  ...NftOffer_MetadataAccount\n  ...NftKindLabel_MetadataAccount\n  ...PnftInfo_MetadataAccount\n  ...useNftKind_MetadataAccount\n  ...NftPageUnlockableInfo_MetadataAccount\n  ...UnlockableModalContainer_MetadataAccount\n}\n\nfragment NftKindLabel_MetadataAccount on MetadataAccount {\n  ...useNftKind_MetadataAccount\n  ...GenerativeKindLabel_MetadataAccount\n  ...MasterEditionWithNonzeroSupplyKindLabel_MetadataAccount\n  ...MasterEditionWithUnlimitedSupplyKindLabel_MetadataAccount\n  ...PnftStandardEditionKindLabel_MetadataAccount\n  ...StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount\n  ...StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount\n}\n\nfragment NftLeftInfoEditionInfo_MetadataAccount on MetadataAccount {\n  nft {\n    antiBotProtectionEnabled\n    editionAllowlistEnabled\n    editionPublicSaleStartTime\n    editionBuyLimitPerAddress\n    status\n    id\n  }\n  ...NftLeftInfoEditionPriceLine_MetadataAccount\n  ...useEditionSupply_MetadataAccount\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftLeftInfoEditionPriceLine_MetadataAccount on MetadataAccount {\n  nft {\n    editionAllowlistEnabled\n    editionPublicSaleStartTime\n    priceV2 {\n      ...useNftPriceSymbol_Price\n      currencyInfo {\n        decimals\n        id\n      }\n    }\n    editionPriceInfo {\n      allowlistPriceInFullDecimals\n      priceFunctionType\n      priceParams\n      startingPriceInLamports\n    }\n    id\n  }\n}\n\nfragment NftLeftInfo_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    name\n    sellerFeeBasisPoints\n  }\n  nft {\n    auctionDurationInSeconds\n    status\n    timeExtensionDurationInSeconds\n    priceV2 {\n      ...useNftPriceSymbol_Price\n      currencyInfo {\n        decimals\n        id\n      }\n    }\n    tickSizeInfo {\n      tickSizeConstantInLamports\n    }\n    Series {\n      name\n      slug\n      type\n      AvatarPhoto {\n        photoUrl\n        id\n      }\n      Creator {\n        username\n        id\n      }\n      id\n    }\n    id\n  }\n  ...NftLeftInfoEditionInfo_MetadataAccount\n  ...NftTags_MetadataAccount\n  ...NftAttributes_MetadataAccount\n}\n\nfragment NftListedEllipsisShadowButton_MetadataAccount on MetadataAccount {\n  ...NftListedOptions_MetadataAccount\n  ...NftListedOptionsModals_MetadataAccount\n}\n\nfragment NftListedOptionsModals_MetadataAccount on MetadataAccount {\n  ...AddToAllowlistModal_MetadataAccount\n  ...AuctionSettingsModal_MetadataAccount\n  ...EditTagsModal_MetadataAccount\n  ...CancelListingModal_MetadataAccount\n  ...ChangePriceModal_MetadataAccount\n  ...ChangePriceForEditionsModal_MetadataAccount\n  ...RefreshMetadataModal_MetadataAccount\n  ...StopMintingModal_MetadataAccount\n  ...DeleteModal_MetadataAccount\n}\n\nfragment NftListedOptions_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    CampaignFundingTier {\n      __typename\n      id\n    }\n    creatorId\n    ownerId\n    isOffPlatform\n    maxSupply\n    editionAllowlistEnabled\n    numberOfStandardEditionsMinted\n    status\n    id\n  }\n}\n\nfragment NftOffer_MetadataAccount on MetadataAccount {\n  ...AcceptOfferModal_MetadataAccount\n  ...CancelOfferModal_MetadataAccount\n}\n\nfragment NftOptionsModals_MetadataAccount on MetadataAccount {\n  ...BurnModal_MetadataAccount\n  ...RefreshMetadataModal_MetadataAccount\n  ...TransferModal_MetadataAccount\n  ...DeleteModal_MetadataAccount\n}\n\nfragment NftOptions_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    CampaignFundingTier {\n      __typename\n      id\n    }\n    creatorId\n    isOffPlatform\n    numberOfStandardEditionsMinted\n    ownerId\n    status\n    id\n  }\n}\n\nfragment NftOtherInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    isOffPlatform\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n}\n\nfragment NftPageContent_MetadataAccount on MetadataAccount {\n  id\n  assetHeight\n  assetWidth\n  contentType\n  videoPlaybackId\n  offchainData {\n    image\n  }\n  nonstandardAsset {\n    ...AssetForAssetExpress_AssetExpress\n    id\n  }\n  nft {\n    creatorId\n    ownerId\n    status\n    Series {\n      id\n      type\n      ...NftPageNextInThisSeriesSection_SeriesExpress\n    }\n    Creator {\n      id\n      username\n    }\n    ...useDoesNftHaveDisclosure_NftExpress\n    id\n  }\n  ...NftCollaboratorCard_MetadataAccount\n  ...NftLeftInfo_MetadataAccount\n  ...NftPageContext_MetadataAccount\n  ...NftInfo_MetadataAccount\n  ...OtherNftBottomDrawer_MetadataAccount\n  ...OwnedNftBottomDrawer_MetadataAccount\n  ...NftPageUnlockableSection_MetadataAccount\n}\n\nfragment NftPageContext_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionHoldingPeriodEndTime\n    id\n  }\n}\n\nfragment NftPageNextInThisSeriesSection_SeriesExpress on SeriesExpress {\n  id\n  slug\n  type\n  AvatarPhoto {\n    id\n    photoUrl\n  }\n  Creator {\n    username\n    id\n  }\n}\n\nfragment NftPageUnlockableInfo_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  nft {\n    creatorId\n    id\n  }\n  unlockable {\n    category\n    asset {\n      contentType\n      path\n      id\n    }\n    unlockableWinners {\n      ...UnlockableLabel_UnlockableWinnerExpress\n      ...useUnlockableCtaType_UnlockableWinnerExpress\n      id\n    }\n    id\n  }\n  ...useNftKind_MetadataAccount\n  ...UnlockableLabel_MetadataAccount\n  ...useUnlockableCtaType_MetadataAccount\n}\n\nfragment NftPageUnlockableSection_MetadataAccount on MetadataAccount {\n  id\n  primarySaleHappened\n  nft {\n    status\n    id\n  }\n  unlockable {\n    activationPrice {\n      ...useFormattedNftPrice_Price\n      ...useNftPriceSymbol_Price\n    }\n    category\n    description\n    name\n    asset {\n      contentType\n      path\n      id\n    }\n    ...UnlockableTinyLabel_UnlockableExpress\n    id\n  }\n}\n\nfragment NftPrice_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    auctionWinnerId\n    maxSupply\n    numberOfStandardEditionsMinted\n    priceV2 {\n      ...PriceWithSymbol_Price\n    }\n    priceLastSoldV2 {\n      ...PriceWithSymbol_Price\n    }\n    scheduledAuctionTime\n    status\n    id\n  }\n  numberOfBidsForCurrentAuction\n  ...useNftKind_MetadataAccount\n}\n\nfragment NftTags_MetadataAccount on MetadataAccount {\n  tags\n}\n\nfragment NftTimeExtensionInfo_MetadataAccount on MetadataAccount {\n  nft {\n    auctionEndTime\n    timeExtensionDurationInSeconds\n    id\n  }\n}\n\nfragment NftTransaction_MetadataAccount on MetadataAccount {\n  ...useNftKindNullable_MetadataAccount\n}\n\nfragment NftTransaction_NftTransactionExpress on NftTransactionExpress {\n  auctionCount\n  comment\n  fromAddress\n  nftInfo {\n    edition\n    maxSupply\n  }\n  price {\n    ...PriceWithSymbol_Price\n    ...useFormattedNftPrice_Price\n    currencyInfo {\n      name\n      id\n    }\n  }\n  source\n  timeCreated\n  toAddress\n  txid\n  type\n  usdPrice\n  From {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n  To {\n    username\n    ProfilePhoto {\n      photoUrl\n      id\n    }\n    id\n  }\n}\n\nfragment OtherNftBottomDrawer_MetadataAccount on MetadataAccount {\n  ...NftOptions_MetadataAccount\n  ...NftOptionsModals_MetadataAccount\n}\n\nfragment OwnedNftBottomDrawer_MetadataAccount on MetadataAccount {\n  ...NftListedOptions_MetadataAccount\n  ...NftListedOptionsModals_MetadataAccount\n}\n\nfragment PnftInfo_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  nft {\n    pnftIdForAuction\n    id\n  }\n  ...ClaimPnftModal_AuctionNft_MetadataAccount\n}\n\nfragment PnftStandardEditionKindLabel_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    id\n  }\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment PriceWithSymbolText_Price on Price {\n  ...useFormattedNftPrice_Price\n  ...useNftPriceSymbol_Price\n}\n\nfragment PriceWithSymbol_Price on Price {\n  ...PriceWithSymbolText_Price\n}\n\nfragment RefreshMetadataModal_MetadataAccount on MetadataAccount {\n  mint\n}\n\nfragment SettleModal_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    creators {\n      address\n    }\n    name\n  }\n  nft {\n    auctionWinnerId\n    creatorId\n    ownerId\n    priceV2 {\n      amount\n      currencyInfo {\n        name\n        id\n      }\n      ...useAuctionHouseSdkForPrice_Price\n      ...useFormattedNftPrice_Price\n      ...useNftPriceSymbol_Price\n    }\n    priceLastListedV2 {\n      amount\n      ...useFormattedNftPrice_Price\n      ...useNftPriceSymbol_Price\n    }\n    AuctionWinner {\n      ...SettleSaleModalContent_UserExpress\n      id\n    }\n    id\n  }\n  ...useSettleSale_MetadataAccount\n  ...SettleSaleModalContent_MetadataAccount\n}\n\nfragment SettleSaleModalContent_MetadataAccount on MetadataAccount {\n  contentType\n  offchainData {\n    image\n  }\n  nft {\n    Owner {\n      ...ArtistPillButtonForUserExpress_UserExpress\n      id\n    }\n    id\n  }\n}\n\nfragment SettleSaleModalContent_UserExpress on UserExpress {\n  ...ArtistPillButtonForUserExpress_UserExpress\n}\n\nfragment StandardEditionPrintNonzeroSupplyKindLabel_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment StandardEditionPrintUnlimitedSupplyKindLabel_MetadataAccount on MetadataAccount {\n  nft {\n    edition\n    isImported\n    id\n  }\n  ...useEditionSupply_MetadataAccount\n  ...useNftLinkForMetadataAccount_MetadataAccount\n}\n\nfragment StopMintingModal_MetadataAccount on MetadataAccount {\n  ...useStopMintingForEditions_MetadataAccount\n}\n\nfragment TransferModal_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    creatorId\n    ownerId\n    id\n  }\n}\n\nfragment UnlockableDetailsModalContent_MetadataAccount on MetadataAccount {\n  unlockable {\n    category\n    description\n    name\n    asset {\n      contentType\n      path\n      id\n    }\n    ...UnlockableTinyLabel_UnlockableExpress\n    id\n  }\n  ...UnlockableDetailsModalCtaLabel_MetadataAccount\n}\n\nfragment UnlockableDetailsModalCtaLabel_MetadataAccount on MetadataAccount {\n  nft {\n    Creator {\n      id\n      username\n    }\n    id\n  }\n  unlockable {\n    unlockableWinners {\n      hasBuyerDismissedShareInfoCta\n      hasCreatorDismissedSeeInfoCta\n      userEmail(input: $unlockableWinnerUserEmailInput)\n      user {\n        id\n        username\n      }\n      id\n    }\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment UnlockableLabel_MetadataAccount on MetadataAccount {\n  data {\n    name\n  }\n  nft {\n    creatorId\n    Creator {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment UnlockableLabel_UnlockableWinnerExpress on UnlockableWinnerExpress {\n  hasBuyerDismissedShareInfoCta\n  userEmail(input: $unlockableWinnerUserEmailInput)\n  userId\n}\n\nfragment UnlockableModalContainer_MetadataAccount on MetadataAccount {\n  unlockable {\n    unlockableWinners {\n      userEmail(input: $unlockableWinnerUserEmailInput)\n      id\n    }\n    id\n  }\n  ...useNftKind_MetadataAccount\n  ...UnlockableShareInfoModalContent_MetadataAccount\n  ...UnlockableSeeInfoModalContent_MetadataAccount\n  ...UnlockableDetailsModalContent_MetadataAccount\n}\n\nfragment UnlockableSeeInfoModalContent_MetadataAccount on MetadataAccount {\n  data {\n    name\n  }\n  unlockable {\n    id\n    asset {\n      contentType\n      path\n      id\n    }\n    unlockableWinners {\n      hasCreatorDismissedSeeInfoCta\n      userEmail(input: $unlockableWinnerUserEmailInput)\n      user {\n        id\n        username\n      }\n      id\n    }\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment UnlockableShareInfoModalContent_MetadataAccount on MetadataAccount {\n  data {\n    name\n  }\n  nft {\n    Creator {\n      username\n      id\n    }\n    id\n  }\n  unlockable {\n    id\n    unlockableWinners {\n      hasBuyerDismissedShareInfoCta\n      userEmail(input: $unlockableWinnerUserEmailInput)\n      id\n    }\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment UnlockableTinyLabel_UnlockableExpress on UnlockableExpress {\n  activationPrice {\n    ...useFormattedNftPrice_Price\n    ...useNftPriceSymbol_Price\n  }\n}\n\nfragment useAuctionHouseSdkForPrice_Price on Price {\n  currencyInfo {\n    name\n    id\n  }\n}\n\nfragment useBuyEdition_MetadataAccount on MetadataAccount {\n  mint\n  data {\n    creators {\n      address\n    }\n  }\n  nft {\n    antiBotProtectionEnabled\n    creatorId\n    editionBuyLimitPerAddress\n    ownerId\n    priceV2 {\n      amount\n      currencyInfo {\n        name\n        id\n      }\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    id\n  }\n}\n\nfragment useChangePriceForEditions_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    editionAllowlistEnabled\n    editionAllowlistSaleStartTime\n    editionPublicSaleStartTime\n    editionPriceInfo {\n      allowlistPriceInFullDecimals\n    }\n    priceV2 {\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    id\n  }\n}\n\nfragment useDoesNftHaveDisclosure_NftExpress on NftExpress {\n  disclosures {\n    type\n  }\n}\n\nfragment useEditionSupply_MetadataAccount on MetadataAccount {\n  nft {\n    maxSupply\n    maxSupplyOfMasterEdition\n    numberOfStandardEditionsMinted\n    id\n  }\n  ...useNftKind_MetadataAccount\n}\n\nfragment useFormattedNftPrice_Price on Price {\n  amount\n  currencyInfo {\n    decimals\n    id\n  }\n}\n\nfragment useGetCurrencyConfigForCurrencyExpress_CurrencyExpress on CurrencyExpress {\n  decimals\n  symbol\n  shortSymbol\n  name\n  mint\n}\n\nfragment useGetCurrencyConfigForPrice_Price on Price {\n  currencyInfo {\n    ...useGetCurrencyConfigForCurrencyExpress_CurrencyExpress\n    id\n  }\n}\n\nfragment useListEditionsForSale_MetadataAccount on MetadataAccount {\n  mint\n  tags\n}\n\nfragment useListNftForSale_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    creatorId\n    id\n  }\n  tags\n}\n\nfragment useNftKindNullable_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftKind_MetadataAccount on MetadataAccount {\n  nft {\n    isMasterEdition\n    isPnft\n    maxSupplyOnchain\n    maxSupplyOfMasterEdition\n    CandyMachine {\n      __typename\n      id\n    }\n    id\n  }\n}\n\nfragment useNftLinkForMetadataAccount_MetadataAccount on MetadataAccount {\n  assetHeight\n  assetWidth\n  mint\n  nft {\n    masterEditionMint\n    Creator {\n      username\n      id\n    }\n    Owner {\n      username\n      id\n    }\n    id\n  }\n}\n\nfragment useNftPriceSymbol_Price on Price {\n  currencyInfo {\n    symbol\n    shortSymbol\n    id\n  }\n}\n\nfragment useSeriesLinkRelativeForSeriesExpress_SeriesExpress on SeriesExpress {\n  slug\n  type\n  Creator {\n    username\n    id\n  }\n}\n\nfragment useSettleSale_MetadataAccount on MetadataAccount {\n  id\n  primarySaleHappened\n  nft {\n    creatorId\n    ownerId\n    pnftIdForAuction\n    id\n  }\n  unlockable {\n    id\n    activationPriceInLamports\n  }\n}\n\nfragment useStopMintingForEditions_MetadataAccount on MetadataAccount {\n  mint\n  nft {\n    creatorId\n    priceV2 {\n      ...useAuctionHouseSdkForPrice_Price\n    }\n    id\n  }\n}\n\nfragment useUnlockableCtaType_MetadataAccount on MetadataAccount {\n  nft {\n    creatorId\n    id\n  }\n}\n\nfragment useUnlockableCtaType_UnlockableWinnerExpress on UnlockableWinnerExpress {\n  hasBuyerDismissedShareInfoCta\n  hasCreatorDismissedSeeInfoCta\n  userEmail(input: $unlockableWinnerUserEmailInput)\n  userId\n}\n\nfragment useUnlockablePurchaseMessage_MetadataAccount on MetadataAccount {\n  primarySaleHappened\n  unlockable {\n    activationPrice {\n      ...useFormattedNftPrice_Price\n      ...useNftPriceSymbol_Price\n    }\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "705bd6c109214291e03d1f1fad85d0fe";

export default node;
