/**
 * @generated SignedSource<<f7ac3172f8d0695704e110348dca076b>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest, Query } from 'relay-runtime';
export type order_by = "asc" | "asc_nulls_first" | "asc_nulls_last" | "desc" | "desc_nulls_first" | "desc_nulls_last" | "%future added value";
export type Series_order_by = {
  AvatarPhoto?: Photo_order_by | null;
  CoverPhoto?: Photo_order_by | null;
  Creator?: User_order_by | null;
  Nfts_aggregate?: Nft_aggregate_order_by | null;
  avatarPhotoId?: order_by | null;
  coverPhotoId?: order_by | null;
  creatorId?: order_by | null;
  description?: order_by | null;
  id?: order_by | null;
  logoAsset?: Asset_order_by | null;
  logoAssetId?: order_by | null;
  mint?: order_by | null;
  name?: order_by | null;
  nameLength?: order_by | null;
  nftOrder?: order_by | null;
  slug?: order_by | null;
  timeCreated?: order_by | null;
  timeLastAddedTo?: order_by | null;
  type?: order_by | null;
};
export type Photo_order_by = {
  description?: order_by | null;
  id?: order_by | null;
  photoUrl?: order_by | null;
  storagePath?: order_by | null;
  timeCreated?: order_by | null;
  title?: order_by | null;
  userId?: order_by | null;
};
export type User_order_by = {
  ArtistSubmissions_aggregate?: ArtistSubmission_aggregate_order_by | null;
  CoverPhoto?: Photo_order_by | null;
  CreatorStory?: CreatorStory_order_by | null;
  DiscordAuth?: DiscordAuth_order_by | null;
  Followed_aggregate?: UserFollows_aggregate_order_by | null;
  Followers_aggregate?: UserFollows_aggregate_order_by | null;
  ProfilePhoto?: Photo_order_by | null;
  bio?: order_by | null;
  coverPhotoId?: order_by | null;
  discordHandle?: order_by | null;
  displayName?: order_by | null;
  email?: order_by | null;
  emailBlocklist?: order_by | null;
  hasCompletedSignup?: order_by | null;
  hasTakenCollectorSurvey2023?: order_by | null;
  hasTakenCreatorSurvey2023?: order_by | null;
  hasUnseenActivity?: order_by | null;
  id?: order_by | null;
  instagramName?: order_by | null;
  isCollector?: order_by | null;
  isCollector2?: order_by | null;
  isWhitelisted?: order_by | null;
  profilePhotoId?: order_by | null;
  seriesOrder?: order_by | null;
  shouldBlurNsfwContent?: order_by | null;
  shouldSeeDiscordOnboardingPrompt?: order_by | null;
  timeCreated?: order_by | null;
  twitterName?: order_by | null;
  username?: order_by | null;
  usernameLength?: order_by | null;
  websiteUrl?: order_by | null;
};
export type ArtistSubmission_aggregate_order_by = {
  count?: order_by | null;
  max?: ArtistSubmission_max_order_by | null;
  min?: ArtistSubmission_min_order_by | null;
};
export type ArtistSubmission_max_order_by = {
  artProcess?: order_by | null;
  artistStatement?: order_by | null;
  discordHandle?: order_by | null;
  id?: order_by | null;
  instagramName?: order_by | null;
  timeCreated?: order_by | null;
  twitterName?: order_by | null;
  userId?: order_by | null;
  websiteUrl?: order_by | null;
};
export type ArtistSubmission_min_order_by = {
  artProcess?: order_by | null;
  artistStatement?: order_by | null;
  discordHandle?: order_by | null;
  id?: order_by | null;
  instagramName?: order_by | null;
  timeCreated?: order_by | null;
  twitterName?: order_by | null;
  userId?: order_by | null;
  websiteUrl?: order_by | null;
};
export type CreatorStory_order_by = {
  colorScheme?: order_by | null;
  goals?: order_by | null;
  headline?: order_by | null;
  id?: order_by | null;
  inspiration?: order_by | null;
  process?: order_by | null;
  userId?: order_by | null;
};
export type DiscordAuth_order_by = {
  DiscordAuthToDiscordRoles_aggregate?: DiscordAuthToDiscordRole_aggregate_order_by | null;
  authorizationNonce?: order_by | null;
  discordHandle?: order_by | null;
  discordUserId?: order_by | null;
  hasConnectedDiscordAccount?: order_by | null;
  hasJoinedDiscordServer?: order_by | null;
  id?: order_by | null;
  timeCreated?: order_by | null;
  userId?: order_by | null;
};
export type DiscordAuthToDiscordRole_aggregate_order_by = {
  count?: order_by | null;
  max?: DiscordAuthToDiscordRole_max_order_by | null;
  min?: DiscordAuthToDiscordRole_min_order_by | null;
};
export type DiscordAuthToDiscordRole_max_order_by = {
  discordAuthId?: order_by | null;
  discordRoleId?: order_by | null;
  id?: order_by | null;
  timeCreated?: order_by | null;
};
export type DiscordAuthToDiscordRole_min_order_by = {
  discordAuthId?: order_by | null;
  discordRoleId?: order_by | null;
  id?: order_by | null;
  timeCreated?: order_by | null;
};
export type UserFollows_aggregate_order_by = {
  count?: order_by | null;
  max?: UserFollows_max_order_by | null;
  min?: UserFollows_min_order_by | null;
};
export type UserFollows_max_order_by = {
  followedId?: order_by | null;
  followerId?: order_by | null;
  id?: order_by | null;
  timeCreated?: order_by | null;
};
export type UserFollows_min_order_by = {
  followedId?: order_by | null;
  followerId?: order_by | null;
  id?: order_by | null;
  timeCreated?: order_by | null;
};
export type Nft_aggregate_order_by = {
  avg?: Nft_avg_order_by | null;
  count?: order_by | null;
  max?: Nft_max_order_by | null;
  min?: Nft_min_order_by | null;
  stddev?: Nft_stddev_order_by | null;
  stddev_pop?: Nft_stddev_pop_order_by | null;
  stddev_samp?: Nft_stddev_samp_order_by | null;
  sum?: Nft_sum_order_by | null;
  var_pop?: Nft_var_pop_order_by | null;
  var_samp?: Nft_var_samp_order_by | null;
  variance?: Nft_variance_order_by | null;
};
export type Nft_avg_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_max_order_by = {
  auctionCount?: order_by | null;
  campaignFundingTierId?: order_by | null;
  creatorId?: order_by | null;
  edition?: order_by | null;
  id?: order_by | null;
  masterEdition?: order_by | null;
  masterEditionMint?: order_by | null;
  maxSupply?: order_by | null;
  metadataId?: order_by | null;
  mint?: order_by | null;
  ownerId?: order_by | null;
  priceLastSoldCurrencyId?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesId?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
  standardEdition?: order_by | null;
  timeCreated?: order_by | null;
  timeLastEditionSoldPrimary?: order_by | null;
};
export type Nft_min_order_by = {
  auctionCount?: order_by | null;
  campaignFundingTierId?: order_by | null;
  creatorId?: order_by | null;
  edition?: order_by | null;
  id?: order_by | null;
  masterEdition?: order_by | null;
  masterEditionMint?: order_by | null;
  maxSupply?: order_by | null;
  metadataId?: order_by | null;
  mint?: order_by | null;
  ownerId?: order_by | null;
  priceLastSoldCurrencyId?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesId?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
  standardEdition?: order_by | null;
  timeCreated?: order_by | null;
  timeLastEditionSoldPrimary?: order_by | null;
};
export type Nft_stddev_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_stddev_pop_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_stddev_samp_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_sum_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_var_pop_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_var_samp_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Nft_variance_order_by = {
  auctionCount?: order_by | null;
  edition?: order_by | null;
  maxSupply?: order_by | null;
  priceLastSoldForInLamports?: order_by | null;
  seriesRarityBasisPoints?: order_by | null;
  seriesRarityRanking?: order_by | null;
};
export type Asset_order_by = {
  artistSubmissionId?: order_by | null;
  arweaveTxid?: order_by | null;
  campaignGalleryAssetCampaignId?: order_by | null;
  contentType?: order_by | null;
  downloadUrl?: order_by | null;
  downloadUrlDarkMode?: order_by | null;
  height?: order_by | null;
  id?: order_by | null;
  path?: order_by | null;
  pathDarkMode?: order_by | null;
  postId?: order_by | null;
  premintPreviewAssetCandyMachineId?: order_by | null;
  userId?: order_by | null;
  videoPlaybackId?: order_by | null;
  width?: order_by | null;
};
export type SeriesOrderByQuery$variables = {
  seriesOrderBy?: ReadonlyArray<Series_order_by> | null;
};
export type SeriesOrderByQuery$data = {
  readonly Series: ReadonlyArray<{
    readonly id: string;
  }>;
};
export type SeriesOrderByQuery = {
  response: SeriesOrderByQuery$data;
  variables: SeriesOrderByQuery$variables;
};

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "seriesOrderBy"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "order_by",
        "variableName": "seriesOrderBy"
      }
    ],
    "concreteType": "Series",
    "kind": "LinkedField",
    "name": "Series",
    "plural": true,
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
    "name": "SeriesOrderByQuery",
    "selections": (v1/*: any*/),
    "type": "query_root",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SeriesOrderByQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "e12ddeee6778f99af0165f469170381e",
    "id": null,
    "metadata": {},
    "name": "SeriesOrderByQuery",
    "operationKind": "query",
    "text": "query SeriesOrderByQuery(\n  $seriesOrderBy: [Series_order_by!]\n) {\n  Series(order_by: $seriesOrderBy) {\n    id\n  }\n}\n"
  }
};
})();

(node as any).hash = "1f0db9acbf916d61a2b4e631b0531ea2";

export default node;
