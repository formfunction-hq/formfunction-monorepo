export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  uuid: string;
  timestamptz: Date;
  PublicKey: string;
  bigint: number;
  /** Enforces a maximum number of items that can be queried for */
  PaginationAmount: number;
};

export enum CampaignFundingTierTypeExpress_Enum {
  Gacha = 'Gacha',
  Standard = 'Standard'
}

export type CampaignV2 = {
  __typename: 'CampaignV2';
  about: CampaignAbout;
  category: CampaignCategoryExpress_Enum;
  colorScheme: CampaignColorSchemeExpress_Enum;
  creator: UserExpress;
  endTime?: Maybe<Scalars['timestamptz']>;
  fundingTierOrder?: Maybe<Array<Scalars['ID']>>;
  fundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
  galleryAssets?: Maybe<Array<AssetExpress>>;
  goal: CampaignGoal;
  /** How progress is marked on the campaign progress bar */
  goalProgressSymbol: Scalars['String'];
  id: Scalars['ID'];
  isViewerHolder?: Maybe<Scalars['Boolean']>;
  logoAsset?: Maybe<AssetExpress>;
  nftAssets: Array<NftAsset>;
  previewAsset: AssetExpress;
  slug: Scalars['String'];
  socialLinks?: Maybe<CampaignSocialLinks>;
  status: CampaignStatusExpress_Enum;
  /** A short description of the campaign */
  tagline: Scalars['String'];
  teamMembers?: Maybe<Array<CampaignTeamMemberExpress>>;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  youtubeVideoHref?: Maybe<Scalars['String']>;
};


export type CampaignV2NftAssetsArgs = {
  input: NftAssetsForCampaignInput;
};

export type CampaignAbout = {
  __typename: 'CampaignAbout';
  campaign?: Maybe<Scalars['String']>;
  contactInfo?: Maybe<Scalars['String']>;
  creator?: Maybe<Scalars['String']>;
  risksAndChallenges?: Maybe<Scalars['String']>;
  timeline?: Maybe<Scalars['String']>;
};

export enum CampaignCategoryExpress_Enum {
  Art = 'Art',
  Brand = 'Brand',
  Comics = 'Comics',
  Culture = 'Culture',
  DanceAndTheater = 'DanceAndTheater',
  Design = 'Design',
  Education = 'Education',
  Fashion = 'Fashion',
  FilmAndVideo = 'FilmAndVideo',
  Food = 'Food',
  Games = 'Games',
  Music = 'Music',
  Photography = 'Photography',
  Podcasts = 'Podcasts',
  Product = 'Product',
  Writing = 'Writing'
}

export enum CampaignColorSchemeExpress_Enum {
  AliceBlueSinopia = 'AliceBlueSinopia',
  AntiFlashWhiteDarkGunmetal = 'AntiFlashWhiteDarkGunmetal',
  BrightGrayMediumBlue = 'BrightGrayMediumBlue',
  CulturedCadmiumGreen = 'CulturedCadmiumGreen',
  GreenishGrayMidnightBlue = 'GreenishGrayMidnightBlue',
  SeashellMaximumRed = 'SeashellMaximumRed'
}

export type UserExpress = {
  __typename: 'UserExpress';
  CoverPhoto?: Maybe<PhotoExpress>;
  ProfilePhoto?: Maybe<PhotoExpress>;
  bio?: Maybe<Scalars['String']>;
  coverPhotoId?: Maybe<Scalars['uuid']>;
  discordHandle?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  hasCompletedSignup: Scalars['Boolean'];
  hasTakenCollectorSurvey2023?: Maybe<Scalars['Boolean']>;
  hasTakenCreatorSurvey2023?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  instagramName?: Maybe<Scalars['String']>;
  isCollector: Scalars['Boolean'];
  isWhitelisted: Scalars['Boolean'];
  profilePhotoId?: Maybe<Scalars['uuid']>;
  timeCreated: Scalars['timestamptz'];
  twitterName?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  websiteUrl?: Maybe<Scalars['String']>;
};

export type CampaignFundingTierExpress = CampaignFundingTierStandard;

export type CampaignFundingTierStandard = ICampaignFundingTier & {
  __typename: 'CampaignFundingTierStandard';
  benefits?: Maybe<Array<CampaignBenefitExpress>>;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  metadataAccounts?: Maybe<MetadataAccountsConnection>;
  nftOrder?: Maybe<Array<Scalars['String']>>;
};


export type CampaignFundingTierStandardMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
};

export type ICampaignFundingTier = {
  benefits?: Maybe<Array<CampaignBenefitExpress>>;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type CampaignBenefitExpress = {
  __typename: 'CampaignBenefitExpress';
  description: Scalars['String'];
  id: Scalars['ID'];
};

export type MetadataAccountsConnection = {
  __typename: 'MetadataAccountsConnection';
  edges: Array<MetadataAccountsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type MetadataAccountsEdge = {
  __typename: 'MetadataAccountsEdge';
  cursor: Scalars['String'];
  node: MetadataAccount;
};

export type MetadataAccount = IAccount & {
  __typename: 'MetadataAccount';
  accountInfo: AccountInfo;
  assetHeight?: Maybe<Scalars['Int']>;
  assetWidth?: Maybe<Scalars['Int']>;
  contentType: Scalars['String'];
  data: MetadataAccountData;
  editionNonce?: Maybe<Scalars['Int']>;
  highestBidInLamports?: Maybe<Scalars['bigint']>;
  id: Scalars['ID'];
  isMutable: Scalars['Boolean'];
  masterEdition?: Maybe<Scalars['String']>;
  mint: Scalars['PublicKey'];
  nft: NftExpress;
  nonstandardAsset?: Maybe<AssetExpress>;
  numberOfBidsForCurrentAuction?: Maybe<Scalars['Int']>;
  offchainData: MetadataOffchain;
  openBidStatus?: Maybe<OpenBidStatus>;
  primarySaleHappened: Scalars['Boolean'];
  standardEdition?: Maybe<Scalars['PublicKey']>;
  tags: Array<Scalars['String']>;
  timeCreated?: Maybe<Scalars['timestamptz']>;
  unlockable?: Maybe<UnlockableExpress>;
  updateAuthority: Scalars['PublicKey'];
  videoPlaybackId?: Maybe<Scalars['String']>;
  videoPreviewPlaybackId?: Maybe<Scalars['String']>;
};


export type MetadataAccountHighestBidInLamportsArgs = {
  userId: Scalars['String'];
};


export type MetadataAccountOpenBidStatusArgs = {
  userId: Scalars['String'];
};

export type IAccount = {
  accountInfo: AccountInfo;
};

export type AccountInfo = {
  __typename: 'AccountInfo';
  executable: Scalars['Boolean'];
  id: Scalars['ID'];
  lamports: Scalars['Int'];
  owner: Scalars['PublicKey'];
  pubkey: Scalars['PublicKey'];
};

export type MetadataAccountData = {
  __typename: 'MetadataAccountData';
  attributes?: Maybe<Array<NftAttribute>>;
  creators?: Maybe<Array<MetadataCreator>>;
  name: Scalars['String'];
  sellerFeeBasisPoints: Scalars['Int'];
  symbol: Scalars['String'];
  uri: Scalars['String'];
};

export type NftAttribute = {
  __typename: 'NftAttribute';
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export type MetadataCreator = {
  __typename: 'MetadataCreator';
  address: Scalars['PublicKey'];
  requestId?: Maybe<Scalars['String']>;
  share: Scalars['Int'];
  status: RequestStatusExpress_Enum;
  user?: Maybe<UserExpress>;
};

export enum RequestStatusExpress_Enum {
  Approved = 'Approved',
  Pending = 'Pending',
  Rejected = 'Rejected'
}

export type NftExpress = {
  __typename: 'NftExpress';
  AuctionWinner?: Maybe<UserExpress>;
  CampaignFundingTier?: Maybe<ICampaignFundingTier>;
  CandyMachine?: Maybe<CandyMachineExpress>;
  Creator?: Maybe<UserExpress>;
  Owner?: Maybe<UserExpress>;
  Series?: Maybe<SeriesExpress>;
  antiBotProtectionEnabled?: Maybe<Scalars['Boolean']>;
  auctionCount: Scalars['Int'];
  auctionDurationInSeconds: Scalars['Int'];
  auctionEndTime?: Maybe<Scalars['timestamptz']>;
  auctionHoldingPeriodEndTime?: Maybe<Scalars['timestamptz']>;
  auctionWinnerId?: Maybe<Scalars['String']>;
  creatorId: Scalars['String'];
  disclosures?: Maybe<Array<NftDisclosureExpress>>;
  edition?: Maybe<Scalars['Int']>;
  editionAllowlistEnabled: Scalars['Boolean'];
  editionAllowlistSaleStartTime?: Maybe<Scalars['timestamptz']>;
  editionBuyLimitPerAddress?: Maybe<Scalars['Int']>;
  editionPriceInfo?: Maybe<EditionPriceInfo>;
  editionPublicSaleStartTime?: Maybe<Scalars['timestamptz']>;
  id: Scalars['ID'];
  isAirdrop: Scalars['Boolean'];
  isImported: Scalars['Boolean'];
  isMasterEdition: Scalars['Boolean'];
  isOffPlatform: Scalars['Boolean'];
  isPnft: Scalars['Boolean'];
  isPnftDropActive?: Maybe<Scalars['Boolean']>;
  masterEditionMint?: Maybe<Scalars['PublicKey']>;
  /** This is the value for max supply that we want to display in the UI. Put another way, it is the user-facing max supply. It may differ from maxSupplyOnchain if the user stops minting before all editions are sold. */
  maxSupply?: Maybe<Scalars['Int']>;
  maxSupplyOfMasterEdition?: Maybe<Scalars['Int']>;
  /** The on-chain max supply value. This may differ from maxSupply if the user stops minting before all editions are sold. */
  maxSupplyOnchain?: Maybe<Scalars['Int']>;
  mint: Scalars['String'];
  /** If the NFT is a master edition, returns the number of editions printed from the master edition. If the NFT is a standard edition, returns the number of editions printed from its master edition. */
  numberOfStandardEditionsMinted?: Maybe<Scalars['Int']>;
  ownerId: Scalars['String'];
  pnftIdForAuction?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['bigint']>;
  priceLastListed?: Maybe<Scalars['bigint']>;
  priceLastListedV2?: Maybe<Price>;
  priceLastSoldForInLamports?: Maybe<Scalars['bigint']>;
  priceLastSoldV2?: Maybe<Price>;
  priceV2?: Maybe<Price>;
  scheduledAuctionTime?: Maybe<Scalars['timestamptz']>;
  seriesRarityRanking?: Maybe<Scalars['Int']>;
  status: NftStatusExpress_Enum;
  tickSizeInfo: TickSizeInfo;
  timeCreated: Scalars['timestamptz'];
  timeExtensionDurationInSeconds: Scalars['Int'];
};

/** Contains information necessary to display and allow minting of generative mints */
export type CandyMachineExpress = {
  __typename: 'CandyMachineExpress';
  /** Onchain Candy Machine authority */
  Authority: UserExpress;
  /** Representative authority to be the main creator of the NFTs */
  CreatorAuthority: UserExpress;
  Series: SeriesExpress;
  allowlistPrice?: Maybe<Price>;
  allowlistSaleStartTime?: Maybe<Scalars['timestamptz']>;
  antiBotProtectionEnabled: Scalars['Boolean'];
  id: Scalars['ID'];
  limitPerAddress: Scalars['Int'];
  maxSupply: Scalars['Int'];
  omniMintWallets: Array<Scalars['PublicKey']>;
  premintPrice?: Maybe<Price>;
  price: Price;
  publicKey: Scalars['String'];
  publicSaleEndTime: Scalars['timestamptz'];
  publicSaleStartTime: Scalars['timestamptz'];
  totalAmountMinted: Scalars['Int'];
};

export type SeriesExpress = {
  __typename: 'SeriesExpress';
  AvatarPhoto: PhotoExpress;
  CoverPhoto?: Maybe<PhotoExpress>;
  Creator: UserExpress;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mint: Scalars['String'];
  name: Scalars['String'];
  nftOrder?: Maybe<Array<Scalars['String']>>;
  slug: Scalars['String'];
  timeCreated: Scalars['timestamptz'];
  type: SeriesTypeExpress_Enum;
};

export enum SeriesTypeExpress_Enum {
  GenerativeMint = 'GenerativeMint',
  UserCurated = 'UserCurated'
}

export type Price = {
  __typename: 'Price';
  amount: Scalars['bigint'];
  currencyInfo: CurrencyExpress;
};

export type CurrencyExpress = {
  __typename: 'CurrencyExpress';
  decimals: Scalars['Int'];
  iconSrc?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  mint: Scalars['String'];
  name: CurrencyNameExpress_Enum;
  shortSymbol?: Maybe<Scalars['String']>;
  symbol: Scalars['String'];
};

export enum CurrencyNameExpress_Enum {
  Ash = 'Ash',
  Bonk = 'Bonk',
  FamousFoxFederation = 'FamousFoxFederation',
  Particles = 'Particles',
  SkeletonCrew = 'SkeletonCrew',
  Solana = 'Solana',
  UsdCoin = 'UsdCoin'
}

export type NftDisclosureExpress = {
  __typename: 'NftDisclosureExpress';
  details?: Maybe<Scalars['String']>;
  type: NftDisclosureTypeExpress_Enum;
};

export enum NftDisclosureTypeExpress_Enum {
  AiArt = 'AiArt',
  Derivative = 'Derivative',
  Nsfw = 'Nsfw'
}

export type EditionPriceInfo = {
  __typename: 'EditionPriceInfo';
  allowlistPriceInFullDecimals?: Maybe<Scalars['bigint']>;
  priceFunctionType: PriceFunctionTypeExpress_Enum;
  priceParams: Array<Scalars['Float']>;
  startingPriceInLamports: Scalars['bigint'];
};

export enum PriceFunctionTypeExpress_Enum {
  Constant = 'Constant',
  Linear = 'Linear',
  Minimum = 'Minimum'
}

export enum NftStatusExpress_Enum {
  AirdropCompleted = 'AirdropCompleted',
  AirdropInProgress = 'AirdropInProgress',
  Auction = 'Auction',
  Burned = 'Burned',
  Listed = 'Listed',
  ListedEditions = 'ListedEditions',
  ListedInstantSale = 'ListedInstantSale',
  ListingScheduled = 'ListingScheduled',
  Owned = 'Owned',
  OwnedStoppedMintingForEditions = 'OwnedStoppedMintingForEditions',
  SoldOutEditions = 'SoldOutEditions'
}

export type TickSizeInfo = {
  __typename: 'TickSizeInfo';
  tickSizeConstantInLamports?: Maybe<Scalars['bigint']>;
};

export type AssetExpress = {
  __typename: 'AssetExpress';
  contentType: Scalars['String'];
  darkModeInfo?: Maybe<AssetDarkModeInfo>;
  dimensions?: Maybe<AssetDimensions>;
  downloadUrl: Scalars['String'];
  id: Scalars['ID'];
  path: Scalars['String'];
  videoPlaybackId?: Maybe<Scalars['String']>;
};

export type AssetDarkModeInfo = {
  __typename: 'AssetDarkModeInfo';
  downloadUrl: Scalars['String'];
  path: Scalars['String'];
};

export type AssetDimensions = {
  __typename: 'AssetDimensions';
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type MetadataOffchain = {
  __typename: 'MetadataOffchain';
  _contentType: Scalars['String'];
  _isOffPlatform: Scalars['Boolean'];
  _mint: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  image: Scalars['String'];
};


export type MetadataOffchainImageArgs = {
  input?: InputMaybe<MetadataOffchainImageInput>;
};

export type MetadataOffchainImageInput = {
  height?: InputMaybe<Scalars['Int']>;
};

export enum OpenBidStatus {
  HighestBid = 'HighestBid',
  Outbid = 'Outbid',
  Refund = 'Refund',
  Won = 'Won'
}

export type UnlockableExpress = {
  __typename: 'UnlockableExpress';
  activationPrice?: Maybe<Price>;
  activationPriceInLamports?: Maybe<Scalars['bigint']>;
  asset: AssetExpress;
  category: UnlockableCategory;
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
  timeCreated: Scalars['timestamptz'];
  unlockableWinners?: Maybe<Array<UnlockableWinnerExpress>>;
};

export enum UnlockableCategory {
  DigitalDownload = 'DigitalDownload',
  Merch = 'Merch',
  Other = 'Other',
  PhysicalOriginal = 'PhysicalOriginal',
  PhysicalPrint = 'PhysicalPrint'
}

export type UnlockableWinnerExpress = {
  __typename: 'UnlockableWinnerExpress';
  hasBuyerDismissedShareInfoCta: Scalars['Boolean'];
  hasCreatorDismissedSeeInfoCta: Scalars['Boolean'];
  /** @deprecated Renamed the field to hasBuyerDismissedShareInfoCta. */
  hasUserDismissedPromptToShareInfo: Scalars['Boolean'];
  id: Scalars['ID'];
  timeCreated: Scalars['timestamptz'];
  user: UserExpress;
  /** Only the unlockable creator or winner can view this field. */
  userEmail?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};


export type UnlockableWinnerExpressUserEmailArgs = {
  input?: InputMaybe<UnlockableWinnerUserEmailInput>;
};

export type UnlockableWinnerUserEmailInput = {
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type PageInfo = {
  __typename: 'PageInfo';
  endCursor: Scalars['String'];
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor: Scalars['String'];
};

export type CampaignGoal = CampaignMonetaryGoal | CampaignSaleCountGoal;

export type CampaignMonetaryGoal = ICampaignGoal & {
  __typename: 'CampaignMonetaryGoal';
  currentAmount: Scalars['bigint'];
  goalAmount: Scalars['bigint'];
  currency: CurrencyExpress;
};

export type ICampaignGoal = {
  currentAmount: Scalars['bigint'];
  goalAmount: Scalars['bigint'];
};

export type CampaignSaleCountGoal = ICampaignGoal & {
  __typename: 'CampaignSaleCountGoal';
  currentAmount: Scalars['bigint'];
  goalAmount: Scalars['bigint'];
};

export type NftAsset = {
  __typename: 'NftAsset';
  asset: AssetExpress;
  nftInfo: NftAssetNftInfo;
};

export type NftAssetNftInfo = {
  __typename: 'NftAssetNftInfo';
  mint: Scalars['String'];
};

export type NftAssetsForCampaignInput = {
  first: Scalars['PaginationAmount'];
};

export type CampaignSocialLinks = {
  __typename: 'CampaignSocialLinks';
  discord?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  twitter?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
};

export enum CampaignStatusExpress_Enum {
  Approved = 'Approved',
  Concluded = 'Concluded',
  Draft = 'Draft',
  Pending = 'Pending',
  Published = 'Published',
  Rejected = 'Rejected'
}

export type CampaignTeamMemberExpress = {
  __typename: 'CampaignTeamMemberExpress';
  member: UserExpress;
  role: CampaignTeamMemberRoleExpress_Enum;
  status: RequestStatusExpress_Enum;
};

export enum CampaignTeamMemberRoleExpress_Enum {
  Admin = 'Admin',
  Creator = 'Creator',
  Member = 'Member'
}

export enum NotificationChannelExpress_Enum {
  ActivityFeed = 'ActivityFeed',
  Email = 'Email'
}

export enum NotificationTypeExpress_Enum {
  AirdropCompleted = 'AirdropCompleted',
  AirdropGiftReceived = 'AirdropGiftReceived',
  BidderAuctionAlmostOver = 'BidderAuctionAlmostOver',
  BidderAuctionExtended = 'BidderAuctionExtended',
  BidderAuctionSettled = 'BidderAuctionSettled',
  BidderClaimPnft = 'BidderClaimPnft',
  BidderClaimPnftReminder = 'BidderClaimPnftReminder',
  BidderLostAuction = 'BidderLostAuction',
  BidderOutbid = 'BidderOutbid',
  BidderWonAuction = 'BidderWonAuction',
  BonkClaim = 'BonkClaim',
  BuyerOfferAccepted = 'BuyerOfferAccepted',
  BuyerOfferExpired = 'BuyerOfferExpired',
  CampaignAddedAsTeamMember = 'CampaignAddedAsTeamMember',
  CampaignApproved = 'CampaignApproved',
  CampaignCommunityNewUpdateShared = 'CampaignCommunityNewUpdateShared',
  CampaignFollowersCampaignPublished = 'CampaignFollowersCampaignPublished',
  CampaignGoalReachedXPercent = 'CampaignGoalReachedXPercent',
  CampaignRejected = 'CampaignRejected',
  CampaignRejectedWithFeedback = 'CampaignRejectedWithFeedback',
  CollabRequest = 'CollabRequest',
  CreatorSecondarySale = 'CreatorSecondarySale',
  FollowerAuctionAlmostOver = 'FollowerAuctionAlmostOver',
  FollowerNewEditionsListed = 'FollowerNewEditionsListed',
  FollowerNewPieceListed = 'FollowerNewPieceListed',
  FollowerNewPieceListedSecondary = 'FollowerNewPieceListedSecondary',
  FollowerNewPieceScheduled = 'FollowerNewPieceScheduled',
  FollowerScheduledAuctionIsLive = 'FollowerScheduledAuctionIsLive',
  InviteReceived = 'InviteReceived',
  InvitesConvertedToCreator = 'InvitesConvertedToCreator',
  InvitesInviteeAcceptedInvite = 'InvitesInviteeAcceptedInvite',
  NewFollower = 'NewFollower',
  OwnerAuctionEnded = 'OwnerAuctionEnded',
  OwnerAuctionEndedNoBids = 'OwnerAuctionEndedNoBids',
  OwnerAuctionExtended = 'OwnerAuctionExtended',
  OwnerAuctionSettled = 'OwnerAuctionSettled',
  OwnerEditionSold = 'OwnerEditionSold',
  OwnerEditionsSoldOut = 'OwnerEditionsSoldOut',
  OwnerFirstBidReceived = 'OwnerFirstBidReceived',
  OwnerGenerativeMintSoldOut = 'OwnerGenerativeMintSoldOut',
  OwnerOfferReceived = 'OwnerOfferReceived',
  OwnerOtherBidReceived = 'OwnerOtherBidReceived',
  OwnerPieceSoldAsInstantSale = 'OwnerPieceSoldAsInstantSale',
  PnftDropClosed = 'PnftDropClosed',
  UnlockableDeclinedToSharedInfo = 'UnlockableDeclinedToSharedInfo',
  UnlockableInfoShared = 'UnlockableInfoShared',
  UnlockableShareInfo = 'UnlockableShareInfo',
  VotingApproved = 'VotingApproved',
  VotingBrokeGuidelines = 'VotingBrokeGuidelines',
  VotingDuplicate = 'VotingDuplicate',
  VotingRejected = 'VotingRejected'
}

export type PhotoExpress = {
  __typename: 'PhotoExpress';
  description?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  photoUrl: Scalars['String'];
  timeCreated: Scalars['timestamptz'];
  title?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
};

export type Query_Root = {
  __typename: 'query_root';
  /** Namespace field for campaign related queries. */
  CampaignsNamespace: CampaignsNamespaceQueryResponse;
  /** Query field that houses comment queries. */
  CommentQueries: CommentQueriesResponse;
  /** Query field that houses Formfunction Flashback queries. */
  FlashbackQueries: FlashbackQueriesResponse;
  /** Query field that houses queries for fetching holders with various criteria */
  HolderQueries: HolderQueriesResponse;
  /** Query field that houses NFT queries. */
  NftQueries: NftQueriesResponse;
  /** Namespace field for notification related queries. */
  NotificationsNamespace: NotificationsNamespaceResponse;
  /** Namespace field for Post queries. */
  PostsNamespace: PostsNamespaceQueryResponse;
  /** Namespace field for series queries. */
  SeriesNamespace: SeriesNamespaceResponse;
  /** Namespace field for Spotlight related queries. */
  SpotlightNamespace: SpotlightResponse;
  /** Namespace field for various creator/collector stats. */
  StatsNamespace: StatsNamespaceResponse;
  /** Query field for User queries. */
  UserQueries: UserQueriesQueryResponse;
  /** Returns all the attributes for an NFT series */
  attributesForSeries?: Maybe<AttributesForSeriesResponse>;
  bidToCancel?: Maybe<NftTransactionExpress>;
  campaignActivityForSlug: CampaignActivityForSlugResponse;
  campaignForSlug: CampaignForSlugResponse;
  campaignSectionsForSlug: CampaignSectionsForSlugResponse;
  campaignSectionsForSlugV2: CampaignSectionsForSlugV2Response;
  editionBuyerInfo: EditionBuyerInfoResponse;
  editionsForMasterEditionMint: EditionsForMasterEditionMintResponse;
  exchangeRate: ExchangeRateResponse;
  isOwnerValid: IsOwnerValidResponse;
  metadataAccountForMint?: Maybe<MetadataAccount>;
  metadataAccounts: Array<MetadataAccount>;
  metadataAccountsAvailableToAddToCampaign: MetadataAccountsAvailableToAddToCampaignResponse;
  metadataAccountsCollected: MetadataAccountsCollectedResponse;
  metadataAccountsCreated: MetadataAccountsCreatedResponse;
  metadataAccountsFeatured: Array<MetadataAccount>;
  metadataAccountsFeaturedEditions?: Maybe<MetadataAccountsFeaturedEditionsResponse>;
  metadataAccountsForAddress: MetadataAccountsForAddressResponse;
  metadataAccountsForAid: Array<MetadataAccount>;
  metadataAccountsForExplore: MetadataAccountsForExploreResponse;
  metadataAccountsForImport?: Maybe<MetadataAccountsForImportResponse>;
  metadataAccountsForSeries?: Maybe<MetadataAccountsForSeriesResponse>;
  metadataAccountsHiddenGems?: Maybe<MetadataAccountsHiddenGemsResponse>;
  nftOffers: NftOffersResponse;
  nftOffersForUser: NftOffersForUserResponse;
  nftPageExtras: NftPageExtrasResponse;
  nftTransactions: NftTransactionsResponse;
  /** Fetches the list of transactions that will be associated with an NFT once it is imported. Used so we can display a preview of these transactions to users */
  nftTransactionsForImport: NftTransactionsForImportResponse;
  openBids: Array<OpenBid>;
  /** This query returns a list of MetadataAccounts of all the NFTs which have listed the input masterEditionPnftId as a participation NFT in an auction. */
  pnftAuctionNfts: PnftAuctionNftsResponse;
  /** This is a convenience query which lets you fetch a pNFT MetadataAccount given the original auction NFT mint. */
  pnftInfo: PnftInfoResponse;
  refundableAmounts: RefundableAmountsResponse;
  test?: Maybe<NftStatusExpress_Enum>;
  test2?: Maybe<Scalars['String']>;
  /** To help test/debug behavior of long running queries */
  testSleep?: Maybe<Scalars['Int']>;
  usersFeatured: Array<UserAndMetadataAccounts>;
  usersForExplore: UsersForExploreResponse;
  walletViewer: Array<MetadataAccount>;
};


export type Query_RootAttributesForSeriesArgs = {
  input: AttributesForSeriesInput;
};


export type Query_RootBidToCancelArgs = {
  input: BidToCancelInput;
};


export type Query_RootCampaignForSlugArgs = {
  input: CampaignForSlugInput;
};


export type Query_RootCampaignSectionsForSlugArgs = {
  input: CampaignSectionsForSlugInput;
};


export type Query_RootCampaignSectionsForSlugV2Args = {
  input: CampaignSectionsForSlugV2Input;
};


export type Query_RootEditionBuyerInfoArgs = {
  input: EditionBuyerInfoInput;
};


export type Query_RootExchangeRateArgs = {
  input: ExchangeRateInput;
};


export type Query_RootIsOwnerValidArgs = {
  input: IsOwnerValidInput;
};


export type Query_RootMetadataAccountForMintArgs = {
  input: MetadataAccountForMintInput;
};


export type Query_RootMetadataAccountsArgs = {
  input: MetadataAccountsInput;
};


export type Query_RootMetadataAccountsFeaturedArgs = {
  input?: InputMaybe<MetadataAccountsFeaturedInput>;
};


export type Query_RootMetadataAccountsForAidArgs = {
  input?: InputMaybe<MetadataAccountsForAidInput>;
};


export type Query_RootMetadataAccountsForImportArgs = {
  input: MetadataAccountsForImportInput;
};


export type Query_RootNftPageExtrasArgs = {
  input: NftPageExtrasInput;
};


export type Query_RootNftTransactionsForImportArgs = {
  input: NftTransactionsForImportInput;
};


export type Query_RootOpenBidsArgs = {
  input: OpenBidsInput;
};


export type Query_RootPnftAuctionNftsArgs = {
  input: PnftAuctionNftsInput;
};


export type Query_RootPnftInfoArgs = {
  input: PnftInfoInput;
};


export type Query_RootRefundableAmountsArgs = {
  input: RefundableAmountsInput;
};


export type Query_RootTestSleepArgs = {
  seconds: Scalars['Int'];
};


export type Query_RootWalletViewerArgs = {
  input: WalletViewerInput;
};

export type CampaignsNamespaceQueryResponse = {
  __typename: 'CampaignsNamespaceQueryResponse';
  campaignForNft: CampaignForNftResponse;
  campaignFundingTiersForSlug: CampaignFundingTiersForSlugResponse;
  campaignHoldersForSlug: CampaignHoldersForSlugResponse;
  campaignV2ActivityForSlug: CampaignV2ActivityForSlugReponse;
  campaignV2ForSlug: CampaignV2ForSlugResponse;
  campaignsFeatured: CampaignsFeaturedResponse;
  campaignsForExplore: CampaignsForExploreResponse;
  campaignsForHero: CampaignsForHeroResponse;
  /** Name is a bit misleading—these are the campaigns the user has created */
  campaignsForUser: CampaignsForUserResponse;
  /** Campaigns the user is an active supporter of, i.e. campaigns the user is currently a part of (a user is part of a campaign if they hold one of the campaign's NFTs). A user is NOT an active supporter if they initially supported a campaign by buying an NFT, but later sold or transferred the NFT. */
  campaignsWhereUserIsActiveSupporter: CampaignsWhereUserIsActiveSupporterResponse;
};


export type CampaignsNamespaceQueryResponseCampaignForNftArgs = {
  input: CampaignForNftInput;
};


export type CampaignsNamespaceQueryResponseCampaignFundingTiersForSlugArgs = {
  input: CampaignFundingTiersForSlugInput;
};


export type CampaignsNamespaceQueryResponseCampaignV2ActivityForSlugArgs = {
  input: CampaignV2ActivityForSlugInput;
};


export type CampaignsNamespaceQueryResponseCampaignV2ForSlugArgs = {
  input: CampaignV2ForSlugInput;
};


export type CampaignsNamespaceQueryResponseCampaignsFeaturedArgs = {
  input: CampaignsFeaturedInput;
};


export type CampaignsNamespaceQueryResponseCampaignsForExploreArgs = {
  input: CampaignsForExploreInput;
};


export type CampaignsNamespaceQueryResponseCampaignsForUserArgs = {
  input: CampaignsForUserInput;
};


export type CampaignsNamespaceQueryResponseCampaignsWhereUserIsActiveSupporterArgs = {
  input: CampaignsWhereUserIsActiveSupporterInput;
};

export type CampaignForNftResponse = {
  __typename: 'CampaignForNftResponse';
  campaign?: Maybe<CampaignV2>;
  /** campaign may be null even if this is non-null, because exposing a campaign's goal currency has different permissions than exposing the campaign itself. For example, we want to restrict offer currencies when an NFT is part of a campaign, even if the campaign is not yet published. */
  campaignGoalCurrency?: Maybe<CurrencyExpress>;
};

export type CampaignForNftInput = {
  mint: Scalars['PublicKey'];
};

export type CampaignFundingTiersForSlugResponse = {
  __typename: 'CampaignFundingTiersForSlugResponse';
  campaignFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
};

export type CampaignFundingTiersForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignHoldersForSlugResponse = {
  __typename: 'CampaignHoldersForSlugResponse';
  holders: HolderConnection;
  holdersByFundingTier?: Maybe<Array<CampaignFundingTierHolders>>;
};


export type CampaignHoldersForSlugResponseHoldersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignHoldersForSlugInput;
};


export type CampaignHoldersForSlugResponseHoldersByFundingTierArgs = {
  input: CampaignHoldersForSlugInput;
};

export type HolderConnection = {
  __typename: 'HolderConnection';
  edges: Array<HolderEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type HolderEdge = {
  __typename: 'HolderEdge';
  cursor: Scalars['String'];
  node: Holder;
};

export type Holder = {
  __typename: 'Holder';
  user: UserExpress;
};

export type CampaignHoldersForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
  fundingTierIds?: InputMaybe<Array<Scalars['ID']>>;
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type CampaignFundingTierHolders = {
  __typename: 'CampaignFundingTierHolders';
  fundingTier: CampaignFundingTierExpress;
  holders: Array<Holder>;
};

export type CampaignV2ActivityForSlugReponse = {
  __typename: 'CampaignV2ActivityForSlugReponse';
  campaignActivity?: Maybe<NftTransactionsConnection>;
};


export type CampaignV2ActivityForSlugReponseCampaignActivityArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignV2ActivityForSlugInput;
};

export type NftTransactionsConnection = {
  __typename: 'NftTransactionsConnection';
  edges: Array<NftTransactionsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NftTransactionsEdge = {
  __typename: 'NftTransactionsEdge';
  cursor: Scalars['String'];
  node: NftTransactionExpress;
};

export type NftTransactionExpress = {
  __typename: 'NftTransactionExpress';
  Creator?: Maybe<UserExpress>;
  From?: Maybe<UserExpress>;
  To?: Maybe<UserExpress>;
  auctionCount: Scalars['Int'];
  comment?: Maybe<Scalars['String']>;
  creatorId: Scalars['String'];
  fromAddress: Scalars['String'];
  id: Scalars['ID'];
  ixIndex?: Maybe<Scalars['Int']>;
  ixInnerIndex?: Maybe<Scalars['Int']>;
  mint: Scalars['PublicKey'];
  nftInfo: NftTransactionNftInfo;
  price?: Maybe<Price>;
  priceInLamports?: Maybe<Scalars['bigint']>;
  source?: Maybe<NftTransactionSourceExpress_Enum>;
  timeCreated: Scalars['timestamptz'];
  toAddress: Scalars['String'];
  txid?: Maybe<Scalars['String']>;
  type: NftTransactionTypeExpress_Enum;
  usdPrice?: Maybe<Scalars['Float']>;
};

export type NftTransactionNftInfo = {
  __typename: 'NftTransactionNftInfo';
  assetHeight?: Maybe<Scalars['Int']>;
  assetWidth?: Maybe<Scalars['Int']>;
  edition?: Maybe<Scalars['Int']>;
  maxSupply?: Maybe<Scalars['Int']>;
  maxSupplyOfMasterEdition?: Maybe<Scalars['Int']>;
  mint: Scalars['String'];
  name: Scalars['String'];
};

export enum NftTransactionSourceExpress_Enum {
  ExchangeArt = 'ExchangeArt',
  Holaplex = 'Holaplex'
}

export enum NftTransactionTypeExpress_Enum {
  AuctionWon = 'AuctionWon',
  Bid = 'Bid',
  Burned = 'Burned',
  ChangePriceForEditions = 'ChangePriceForEditions',
  ClaimedPnft = 'ClaimedPnft',
  HolaplexRedeemBid = 'HolaplexRedeemBid',
  HolaplexRedeemFullRightsTransferBid = 'HolaplexRedeemFullRightsTransferBid',
  HolaplexRedeemPrintingV2Bid = 'HolaplexRedeemPrintingV2Bid',
  Imported = 'Imported',
  Listed = 'Listed',
  ListedEditions = 'ListedEditions',
  ListedInstantSale = 'ListedInstantSale',
  ListingCancelled = 'ListingCancelled',
  Minted = 'Minted',
  Offer = 'Offer',
  OfferCancelled = 'OfferCancelled',
  Refunded = 'Refunded',
  Sold = 'Sold',
  SoldAcceptedOffer = 'SoldAcceptedOffer',
  SoldEditionPrimary = 'SoldEditionPrimary',
  SoldGenerativeMint = 'SoldGenerativeMint',
  SoldInstantSale = 'SoldInstantSale',
  StoppedMintingForEditions = 'StoppedMintingForEditions',
  Transferred = 'Transferred'
}

export type CampaignV2ActivityForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignV2ForSlugResponse = {
  __typename: 'CampaignV2ForSlugResponse';
  campaign?: Maybe<CampaignV2>;
};

export type CampaignV2ForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignsFeaturedResponse = {
  __typename: 'CampaignsFeaturedResponse';
  campaigns: Array<CampaignV2>;
  featuredCategories: Array<CampaignCategoryExpress_Enum>;
};

export type CampaignsFeaturedInput = {
  /** If null or empty, no category filtering is applied. */
  categories?: InputMaybe<Array<CampaignCategoryExpress_Enum>>;
};

export type CampaignsForExploreResponse = {
  __typename: 'CampaignsForExploreResponse';
  campaigns?: Maybe<CampaignsConnection>;
};


export type CampaignsForExploreResponseCampaignsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignsForExploreInput;
};

export type CampaignsConnection = {
  __typename: 'CampaignsConnection';
  edges: Array<CampaignsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CampaignsEdge = {
  __typename: 'CampaignsEdge';
  cursor: Scalars['String'];
  node: CampaignV2;
};

export type CampaignsForExploreInput = {
  /** If null or empty, all categories are included. */
  categories?: InputMaybe<Array<CampaignCategoryExpress_Enum>>;
  sortOrder: CampaignSortOrder_Enum;
};

export enum CampaignSortOrder_Enum {
  Newest = 'Newest',
  Oldest = 'Oldest'
}

export type CampaignsForHeroResponse = {
  __typename: 'CampaignsForHeroResponse';
  campaigns: Array<CampaignV2>;
};

export type CampaignsForUserResponse = {
  __typename: 'CampaignsForUserResponse';
  campaigns?: Maybe<CampaignsConnection>;
};


export type CampaignsForUserResponseCampaignsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignsForUserInput;
};

export type CampaignsForUserInput = {
  /** One of userId and username must be non-null */
  userId?: InputMaybe<Scalars['ID']>;
  /** One of userId and username must be non-null */
  username?: InputMaybe<Scalars['String']>;
  /** A list of statuses to filter by. If null or empty, default filtering will be applied */
  statuses?: InputMaybe<Array<CampaignStatusExpress_Enum>>;
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type CampaignsWhereUserIsActiveSupporterResponse = {
  __typename: 'CampaignsWhereUserIsActiveSupporterResponse';
  campaigns?: Maybe<CampaignsConnection>;
};


export type CampaignsWhereUserIsActiveSupporterResponseCampaignsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignsWhereUserIsActiveSupporterInput;
};

export type CampaignsWhereUserIsActiveSupporterInput = {
  /** One of userId and username must be non-null */
  userId?: InputMaybe<Scalars['ID']>;
  /** One of userId and username must be non-null */
  username?: InputMaybe<Scalars['String']>;
  /** A list of statuses to filter by. If null or empty, default filtering will be applied */
  statuses?: InputMaybe<Array<CampaignStatusExpress_Enum>>;
};

export type CommentQueriesResponse = {
  __typename: 'CommentQueriesResponse';
  commentsForPost: CommentsForPostResponse;
};

export type CommentsForPostResponse = {
  __typename: 'CommentsForPostResponse';
  comments: CommentsConnection;
};


export type CommentsForPostResponseCommentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CommentsForPostInput;
};

export type CommentsConnection = {
  __typename: 'CommentsConnection';
  edges: Array<CommentsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CommentsEdge = {
  __typename: 'CommentsEdge';
  cursor: Scalars['String'];
  node: CommentExpress;
};

export type CommentExpress = {
  __typename: 'CommentExpress';
  comment: Scalars['String'];
  commenter: UserExpress;
  id: Scalars['ID'];
  timeCreated: Scalars['timestamptz'];
};

export type CommentsForPostInput = {
  postId: Scalars['ID'];
};

export type FlashbackQueriesResponse = {
  __typename: 'FlashbackQueriesResponse';
  flashbackForUsername: FlashbackForUsernameResponse;
  flashbackForViewer: FlashbackForViewerResponse;
};


export type FlashbackQueriesResponseFlashbackForUsernameArgs = {
  input: FlashbackForUsernameInput;
};


export type FlashbackQueriesResponseFlashbackForViewerArgs = {
  input: FlashbackForViewerInput;
};

export type FlashbackForUsernameResponse = {
  __typename: 'FlashbackForUsernameResponse';
  /** Null if viewer is not a user or if they are not an artist */
  artistStats?: Maybe<FlashbackArtistStats>;
  /** Null if viewer is not a user or if they have not collected any pieces */
  collectorStats?: Maybe<FlashbackCollectorStats>;
};

export type FlashbackArtistStats = {
  __typename: 'FlashbackArtistStats';
  numEditionsSold: Scalars['Int'];
  numOneOfOnesSold: Scalars['Int'];
  numPrimarySales: Scalars['Int'];
  /** Null if not in the top 100. 1-indexed */
  numSalesRank?: Maybe<Scalars['Int']>;
  numSecondarySales: Scalars['Int'];
  numUniqueCollectors: Scalars['Int'];
  soldNftAssets: Array<NftAsset>;
  topSellingPiece?: Maybe<MetadataAccount>;
  topSellingPiecePrice?: Maybe<Price>;
  totalIncomeInLamports: Scalars['bigint'];
  totalIncomeInUsd: Scalars['Float'];
  totalVolumeInLamports: Scalars['bigint'];
  totalVolumeInUsd: Scalars['Float'];
  uniqueCollectorsSample: Array<UserExpress>;
  /** Null if not in the top 100. 1-indexed */
  volumeRank?: Maybe<Scalars['Int']>;
};

export type FlashbackCollectorStats = {
  __typename: 'FlashbackCollectorStats';
  artistsSupportedSample: Array<UserExpress>;
  biggestSecondarySale?: Maybe<MetadataAccount>;
  biggestSecondarySalePrice?: Maybe<Price>;
  boughtNftAssets: Array<NftAsset>;
  firstArtistSupported?: Maybe<UserExpress>;
  firstEditionBought?: Maybe<MetadataAccount>;
  firstOneOfOneBought?: Maybe<MetadataAccount>;
  numArtistsSupported: Scalars['Int'];
  /** Null if not in the top 100. 1-indexed */
  numBuysRank?: Maybe<Scalars['Int']>;
  numEditionsBought: Scalars['Int'];
  numOneOfOnesBought: Scalars['Int'];
  numPrimaryBuys: Scalars['Int'];
  numSecondaryBuys: Scalars['Int'];
  numSecondarySales: Scalars['Int'];
  totalVolumeSpentInLamports: Scalars['bigint'];
  /** Null if not in the top 100. 1-indexed */
  volumeRank?: Maybe<Scalars['Int']>;
};

export type FlashbackForUsernameInput = {
  check: Scalars['String'];
  username: Scalars['String'];
};

export type FlashbackForViewerResponse = {
  __typename: 'FlashbackForViewerResponse';
  /** Null if viewer is not a user or if they are not an artist */
  artistStats?: Maybe<FlashbackArtistStats>;
  /** Null if viewer is not a user or if they have not collected any pieces */
  collectorStats?: Maybe<FlashbackCollectorStats>;
};

export type FlashbackForViewerInput = {
  viewerId: Scalars['ID'];
};

export type HolderQueriesResponse = {
  __typename: 'HolderQueriesResponse';
  holdersForUser: HoldersForUserResponse;
  seriesHoldersForUser: SeriesHoldersForUserResponse;
};


export type HolderQueriesResponseHoldersForUserArgs = {
  input: HoldersForUserInput;
};


export type HolderQueriesResponseSeriesHoldersForUserArgs = {
  input: SeriesHoldersForUserInput;
};

export type HoldersForUserResponse = {
  __typename: 'HoldersForUserResponse';
  /** Null if viewer is null */
  holders?: Maybe<Array<Holder>>;
};

export type HoldersForUserInput = {
  userId: Scalars['String'];
};

export type SeriesHoldersForUserResponse = {
  __typename: 'SeriesHoldersForUserResponse';
  /** Null if viewer is null */
  seriesHolders?: Maybe<Array<SeriesHolders>>;
};

export type SeriesHolders = {
  __typename: 'SeriesHolders';
  holders: Array<Holder>;
  series: SeriesExpress;
};

export type SeriesHoldersForUserInput = {
  userId: Scalars['ID'];
};

export type NftQueriesResponse = {
  __typename: 'NftQueriesResponse';
  editionsMerkleAllowlistInfoForMint: EditionsMerkleAllowlistInfoForMintResponse;
};


export type NftQueriesResponseEditionsMerkleAllowlistInfoForMintArgs = {
  input: EditionsMerkleAllowlistInfoForMintInput;
};

export type EditionsMerkleAllowlistInfoForMintResponse = {
  __typename: 'EditionsMerkleAllowlistInfoForMintResponse';
  merkleAllowlistInfo?: Maybe<EditionsMerkleAllowlistInfoExpress>;
};

export type EditionsMerkleAllowlistInfoExpress = {
  __typename: 'EditionsMerkleAllowlistInfoExpress';
  amountAllowed: Scalars['Int'];
  amountMinted: Scalars['Int'];
  id: Scalars['ID'];
  proof: Scalars['String'];
  rootIndex: Scalars['Int'];
};

export type EditionsMerkleAllowlistInfoForMintInput = {
  mint: Scalars['String'];
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type NotificationsNamespaceResponse = {
  __typename: 'NotificationsNamespaceResponse';
  activityNotificationsForViewer: ActivityNotificationsForViewerResponse;
  unseenActivityNotificationsCountForViewer: UnseenActivityNotificationsCountForViewerResponse;
};


export type NotificationsNamespaceResponseUnseenActivityNotificationsCountForViewerArgs = {
  input?: InputMaybe<UnseenActivityNotificationsCountForViewerInput>;
};

export type ActivityNotificationsForViewerResponse = {
  __typename: 'ActivityNotificationsForViewerResponse';
  activityNotifications: ActivityNotificationsConnection;
};


export type ActivityNotificationsForViewerResponseActivityNotificationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type ActivityNotificationsConnection = {
  __typename: 'ActivityNotificationsConnection';
  edges: Array<ActivityNotificationsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type ActivityNotificationsEdge = {
  __typename: 'ActivityNotificationsEdge';
  cursor: Scalars['String'];
  node: ActivityNotificationExpress;
};

export type ActivityNotificationExpress = ActivityNotificationAirdropCompleted | ActivityNotificationAirdropGiftReceived | ActivityNotificationBidderAuctionAlmostOver | ActivityNotificationBidderAuctionExtended | ActivityNotificationBidderAuctionSettled | ActivityNotificationBidderClaimPnft | ActivityNotificationBidderClaimPnftReminder | ActivityNotificationBidderLostAuction | ActivityNotificationBidderOutbid | ActivityNotificationBidderWonAuction | ActivityNotificationBonkClaim | ActivityNotificationBuyerOfferAccepted | ActivityNotificationBuyerOfferExpired | ActivityNotificationCampaignAddedAsTeamMember | ActivityNotificationCampaignApproved | ActivityNotificationCampaignCommunityNewUpdateShared | ActivityNotificationCampaignFollowersCampaignPublished | ActivityNotificationCampaignGoalReachedXPercent | ActivityNotificationCampaignRejected | ActivityNotificationCampaignRejectedWithFeedback | ActivityNotificationCollabRequest | ActivityNotificationCreatorSecondarySale | ActivityNotificationFollowerAuctionAlmostOver | ActivityNotificationFollowerNewEditionsListed | ActivityNotificationFollowerNewPieceListed | ActivityNotificationFollowerNewPieceListedSecondary | ActivityNotificationFollowerNewPieceScheduled | ActivityNotificationFollowerScheduledAuctionIsLive | ActivityNotificationInvitesConvertedToCreator | ActivityNotificationInvitesInviteeAcceptedInvite | ActivityNotificationNewFollower | ActivityNotificationOwnerAuctionEnded | ActivityNotificationOwnerAuctionEndedNoBids | ActivityNotificationOwnerAuctionExtended | ActivityNotificationOwnerAuctionSettled | ActivityNotificationOwnerEditionSold | ActivityNotificationOwnerEditionsSoldOut | ActivityNotificationOwnerFirstBidReceived | ActivityNotificationOwnerGenerativeMintSoldOut | ActivityNotificationOwnerOfferReceived | ActivityNotificationOwnerOtherBidReceived | ActivityNotificationOwnerPieceSoldAsInstantSale | ActivityNotificationUnlockableDeclinedToSharedInfo | ActivityNotificationUnlockableInfoShared | ActivityNotificationUnlockableShareInfo;

export type ActivityNotificationAirdropCompleted = IActivityNotification & {
  __typename: 'ActivityNotificationAirdropCompleted';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type IActivityNotification = {
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationAction = ActivityNotificationLinkAction;

export type ActivityNotificationLinkAction = {
  __typename: 'ActivityNotificationLinkAction';
  href: Scalars['String'];
  text: Scalars['String'];
};

export type ActivityNotificationNftInfo = {
  __typename: 'ActivityNotificationNftInfo';
  editionNumber?: Maybe<Scalars['Int']>;
  mint: Scalars['String'];
  name: Scalars['String'];
  nftAsset: AssetExpress;
};

export type ActivityNotificationAirdropGiftReceived = IActivityNotification & {
  __typename: 'ActivityNotificationAirdropGiftReceived';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationBidderAuctionAlmostOver = IActivityNotification & {
  __typename: 'ActivityNotificationBidderAuctionAlmostOver';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationBidderAuctionExtended = IActivityNotification & {
  __typename: 'ActivityNotificationBidderAuctionExtended';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationBidderAuctionSettled = IActivityNotification & {
  __typename: 'ActivityNotificationBidderAuctionSettled';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationBidderClaimPnft = IActivityNotification & {
  __typename: 'ActivityNotificationBidderClaimPnft';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationBidderClaimPnftReminder = IActivityNotification & {
  __typename: 'ActivityNotificationBidderClaimPnftReminder';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  pnftCloseDate: Scalars['timestamptz'];
};

export type ActivityNotificationBidderLostAuction = IActivityNotification & {
  __typename: 'ActivityNotificationBidderLostAuction';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationBidderOutbid = IActivityNotification & {
  __typename: 'ActivityNotificationBidderOutbid';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  refundAmount: Price;
  txid: Scalars['String'];
};

export type ActivityNotificationBidderWonAuction = IActivityNotification & {
  __typename: 'ActivityNotificationBidderWonAuction';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationBonkClaim = IActivityNotification & {
  __typename: 'ActivityNotificationBonkClaim';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationBuyerOfferAccepted = IActivityNotification & {
  __typename: 'ActivityNotificationBuyerOfferAccepted';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationBuyerOfferExpired = IActivityNotification & {
  __typename: 'ActivityNotificationBuyerOfferExpired';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationCampaignAddedAsTeamMember = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignAddedAsTeamMember';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
};

export type ActivityNotificationCampaignInfo = {
  __typename: 'ActivityNotificationCampaignInfo';
  creator: UserExpress;
  previewAsset: AssetExpress;
  slug: Scalars['String'];
  title: Scalars['String'];
};

export type ActivityNotificationCampaignApproved = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignApproved';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
};

export type ActivityNotificationCampaignCommunityNewUpdateShared = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignCommunityNewUpdateShared';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
};

export type ActivityNotificationCampaignFollowersCampaignPublished = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignFollowersCampaignPublished';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
};

export type ActivityNotificationCampaignGoalReachedXPercent = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignGoalReachedXPercent';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
  percentAsNumber: Scalars['Int'];
};

export type ActivityNotificationCampaignRejected = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignRejected';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
};

export type ActivityNotificationCampaignRejectedWithFeedback = IActivityNotification & {
  __typename: 'ActivityNotificationCampaignRejectedWithFeedback';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  campaignInfo: ActivityNotificationCampaignInfo;
  feedback: Scalars['String'];
};

export type ActivityNotificationCollabRequest = IActivityNotification & {
  __typename: 'ActivityNotificationCollabRequest';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationCreatorSecondarySale = IActivityNotification & {
  __typename: 'ActivityNotificationCreatorSecondarySale';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationFollowerAuctionAlmostOver = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerAuctionAlmostOver';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationFollowerNewEditionsListed = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerNewEditionsListed';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationFollowerNewPieceListed = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerNewPieceListed';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationFollowerNewPieceListedSecondary = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerNewPieceListedSecondary';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationFollowerNewPieceScheduled = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerNewPieceScheduled';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationFollowerScheduledAuctionIsLive = IActivityNotification & {
  __typename: 'ActivityNotificationFollowerScheduledAuctionIsLive';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationInvitesConvertedToCreator = IActivityNotification & {
  __typename: 'ActivityNotificationInvitesConvertedToCreator';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationInvitesInviteeAcceptedInvite = IActivityNotification & {
  __typename: 'ActivityNotificationInvitesInviteeAcceptedInvite';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationNewFollower = IActivityNotification & {
  __typename: 'ActivityNotificationNewFollower';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
};

export type ActivityNotificationOwnerAuctionEnded = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerAuctionEnded';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  winningPrice: Price;
};

export type ActivityNotificationOwnerAuctionEndedNoBids = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerAuctionEndedNoBids';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationOwnerAuctionExtended = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerAuctionExtended';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationOwnerAuctionSettled = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerAuctionSettled';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationOwnerEditionSold = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerEditionSold';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationOwnerEditionsSoldOut = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerEditionsSoldOut';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationOwnerFirstBidReceived = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerFirstBidReceived';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  bidPrice: Price;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationOwnerGenerativeMintSoldOut = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerGenerativeMintSoldOut';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  candyMachineInfo: ActivityNotificationCandyMachineInfo;
};

export type ActivityNotificationCandyMachineInfo = {
  __typename: 'ActivityNotificationCandyMachineInfo';
  asset: AssetExpress;
  name: Scalars['String'];
};

export type ActivityNotificationOwnerOfferReceived = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerOfferReceived';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  offerPrice: Price;
  txid: Scalars['String'];
};

export type ActivityNotificationOwnerOtherBidReceived = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerOtherBidReceived';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  bidPrice: Price;
  nftInfo: ActivityNotificationNftInfo;
  txid: Scalars['String'];
};

export type ActivityNotificationOwnerPieceSoldAsInstantSale = IActivityNotification & {
  __typename: 'ActivityNotificationOwnerPieceSoldAsInstantSale';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
  price: Price;
  txid: Scalars['String'];
};

export type ActivityNotificationUnlockableDeclinedToSharedInfo = IActivityNotification & {
  __typename: 'ActivityNotificationUnlockableDeclinedToSharedInfo';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationUnlockableInfoShared = IActivityNotification & {
  __typename: 'ActivityNotificationUnlockableInfoShared';
  action?: Maybe<ActivityNotificationAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type ActivityNotificationUnlockableShareInfo = IActivityNotification & {
  __typename: 'ActivityNotificationUnlockableShareInfo';
  action?: Maybe<ActivityNotificationLinkAction>;
  id: Scalars['ID'];
  receiver: UserExpress;
  sender?: Maybe<UserExpress>;
  timeCreated: Scalars['timestamptz'];
  timeSeen?: Maybe<Scalars['timestamptz']>;
  nftInfo: ActivityNotificationNftInfo;
};

export type UnseenActivityNotificationsCountForViewerResponse = {
  __typename: 'UnseenActivityNotificationsCountForViewerResponse';
  unseenActivityNotificationsCount: Scalars['Int'];
};

export type UnseenActivityNotificationsCountForViewerInput = {
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type PostsNamespaceQueryResponse = {
  __typename: 'PostsNamespaceQueryResponse';
  postsForCampaign: PostsForCampaignResponse;
};

export type PostsForCampaignResponse = {
  __typename: 'PostsForCampaignResponse';
  posts: PostsConnection;
};


export type PostsForCampaignResponsePostsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: PostsForCampaignInput;
};

export type PostsConnection = {
  __typename: 'PostsConnection';
  edges: Array<PostsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type PostsEdge = {
  __typename: 'PostsEdge';
  cursor: Scalars['String'];
  node: PostExpress;
};

export type PostExpress = PostWithSingleAsset | PostTextOnly | PostWithPoll | PostWithAirdrop;

/** Post with a single asset attachment */
export type PostWithSingleAsset = IPost & {
  __typename: 'PostWithSingleAsset';
  body?: Maybe<Scalars['String']>;
  comments: PostComments;
  creator: UserExpress;
  id: Scalars['ID'];
  link?: Maybe<Link>;
  reactions: Reactions;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
  asset: AssetExpress;
};

export type IPost = {
  body?: Maybe<Scalars['String']>;
  comments: PostComments;
  creator: UserExpress;
  id: Scalars['ID'];
  link?: Maybe<Link>;
  reactions: Reactions;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
};

export type PostComments = {
  __typename: 'PostComments';
  previewComments: Array<CommentExpress>;
  totalCount: Scalars['Int'];
};

export type Link = {
  __typename: 'Link';
  href: Scalars['String'];
  text: Scalars['String'];
};

export type Reactions = {
  __typename: 'Reactions';
  reactionCounts: Array<ReactionCount>;
  totalCount: Scalars['Int'];
  /** Indicates the reaction selected by the current viewer, if any */
  viewerReactionType?: Maybe<ReactionTypeExpress_Enum>;
};

export type ReactionCount = {
  __typename: 'ReactionCount';
  count: Scalars['Int'];
  type: ReactionTypeExpress_Enum;
};

export enum ReactionTypeExpress_Enum {
  Like = 'Like'
}

export enum PostVisibilityExpress_Enum {
  CampaignSupportersOnly = 'CampaignSupportersOnly',
  Public = 'Public'
}

/** Text only post with no assets */
export type PostTextOnly = IPost & {
  __typename: 'PostTextOnly';
  body?: Maybe<Scalars['String']>;
  comments: PostComments;
  creator: UserExpress;
  id: Scalars['ID'];
  link?: Maybe<Link>;
  reactions: Reactions;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
};

/** Post with a poll */
export type PostWithPoll = IPost & {
  __typename: 'PostWithPoll';
  body?: Maybe<Scalars['String']>;
  comments: PostComments;
  creator: UserExpress;
  id: Scalars['ID'];
  link?: Maybe<Link>;
  reactions: Reactions;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
  asset?: Maybe<AssetExpress>;
  poll: PollExpress;
};

export type PollExpress = {
  __typename: 'PollExpress';
  id: Scalars['ID'];
  isMultiSelect?: Maybe<Scalars['Boolean']>;
  options: Array<PollOptionExpress>;
  totalResponses: Scalars['Int'];
  viewerRespondedToPoll: Scalars['Boolean'];
};

export type PollOptionExpress = {
  __typename: 'PollOptionExpress';
  id: Scalars['String'];
  responseCount: Scalars['Int'];
  responsePercentage?: Maybe<Scalars['Float']>;
  text: Scalars['String'];
  viewerRespondedToPoll: Scalars['Boolean'];
  viewerRespondedToPollOption?: Maybe<Scalars['Boolean']>;
};

/** Post associated with an airdrop */
export type PostWithAirdrop = IPost & {
  __typename: 'PostWithAirdrop';
  body?: Maybe<Scalars['String']>;
  comments: PostComments;
  creator: UserExpress;
  id: Scalars['ID'];
  link?: Maybe<Link>;
  reactions: Reactions;
  timeCreated: Scalars['timestamptz'];
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTiers?: Maybe<Array<CampaignFundingTierExpress>>;
  nftAsset: NftAsset;
};

export type PostsForCampaignInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type SeriesNamespaceResponse = {
  __typename: 'SeriesNamespaceResponse';
  seriesStats?: Maybe<SeriesStatsResponse>;
};


export type SeriesNamespaceResponseSeriesStatsArgs = {
  input: SeriesStatsInput;
};

export type SeriesStatsResponse = {
  __typename: 'SeriesStatsResponse';
  /** If the series contains pieces that have been sold for a variety of currencies, all monetary amounts will be converted to lamports. If no pieces in the series are listed, the floor price will be null. */
  floorPriceInLamports?: Maybe<Scalars['bigint']>;
  /** If the series contains pieces that have been sold for a variety of currencies, all monetary amounts will be converted to lamports. */
  volumeInLamports: Scalars['bigint'];
};

export type SeriesStatsInput = {
  /** Either one of creatorId or creatorUsername should be specified */
  creatorId?: InputMaybe<Scalars['String']>;
  /** Either one of creatorId or creatorUsername should be specified */
  creatorUsername?: InputMaybe<Scalars['String']>;
  seriesSlug: Scalars['String'];
};

export type SpotlightResponse = {
  __typename: 'SpotlightResponse';
  activeSpotlights: SpotlightsConnection;
  /** Connection for querying spotlights that have happened in the past */
  recentSpotlights: SpotlightsConnection;
  /** Connection for querying spotlights that are upcoming */
  upcomingSpotlights: SpotlightsConnection;
};


export type SpotlightResponseActiveSpotlightsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type SpotlightResponseRecentSpotlightsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type SpotlightResponseUpcomingSpotlightsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type SpotlightsConnection = {
  __typename: 'SpotlightsConnection';
  edges: Array<SpotlightsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type SpotlightsEdge = {
  __typename: 'SpotlightsEdge';
  cursor: Scalars['String'];
  node: SpotlightExpress;
};

export type SpotlightExpress = {
  __typename: 'SpotlightExpress';
  endTime: Scalars['timestamptz'];
  heroUnitLayout: SpotlightExpressHeroUnitLayout_Enum;
  id: Scalars['ID'];
  spotlightInfo: SpotlightInfo;
  startTime: Scalars['timestamptz'];
};

export enum SpotlightExpressHeroUnitLayout_Enum {
  Standard = 'Standard',
  TwoColumnSquareImage = 'TwoColumnSquareImage'
}

export type SpotlightInfo = {
  __typename: 'SpotlightInfo';
  asset: AssetExpress;
  description: Scalars['String'];
  label: Scalars['String'];
  status: SpotlightExpressStatus_Enum;
  /** Used in cases where override is set in the DB */
  statusOverride?: Maybe<Scalars['String']>;
  title: Scalars['String'];
  /** Can be null for cases where we want to spotlight something where a link is not available yet. */
  url?: Maybe<Scalars['String']>;
  users: Array<UserExpress>;
};

export enum SpotlightExpressStatus_Enum {
  Available = 'Available',
  Ended = 'Ended',
  /** To be used when a value is set in the DB to override this field */
  Override = 'Override',
  Sold = 'Sold',
  SoldOut = 'SoldOut'
}

export type StatsNamespaceResponse = {
  __typename: 'StatsNamespaceResponse';
  topCollectorStats: CollectorStatsConnection;
  topCreatorStats: CreatorStatsConnection;
};


export type StatsNamespaceResponseTopCollectorStatsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input?: InputMaybe<TopCollectorStatsInput>;
};


export type StatsNamespaceResponseTopCreatorStatsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input?: InputMaybe<TopCreatorStatsInput>;
};

export type CollectorStatsConnection = {
  __typename: 'CollectorStatsConnection';
  edges: Array<CollectorStatsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CollectorStatsEdge = {
  __typename: 'CollectorStatsEdge';
  cursor: Scalars['String'];
  node: CollectorStats;
};

export type CollectorStats = {
  __typename: 'CollectorStats';
  collector: UserExpress;
  numCreatorsSupported: Scalars['Int'];
  numPiecesBought: Scalars['Int'];
  /** Despite the name, this is actually denominated in lamports, the 'sol' part of the name refers to the currency */
  totalPaidInSol: Scalars['bigint'];
};

export type TopCollectorStatsInput = {
  afterTime: Scalars['timestamptz'];
};

export type CreatorStatsConnection = {
  __typename: 'CreatorStatsConnection';
  edges: Array<CreatorStatsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type CreatorStatsEdge = {
  __typename: 'CreatorStatsEdge';
  cursor: Scalars['String'];
  node: CreatorStats;
};

export type CreatorStats = {
  __typename: 'CreatorStats';
  creator: UserExpress;
  numCollectors: Scalars['Int'];
  numPiecesSold: Scalars['Int'];
  /** Total sales volume including primary and secondary sales. Despite the name, this is actually denominated in lamports, the 'sol' part of the name refers to the currency */
  totalSalesInSol: Scalars['bigint'];
};

export type TopCreatorStatsInput = {
  afterTime: Scalars['timestamptz'];
};

export type UserQueriesQueryResponse = {
  __typename: 'UserQueriesQueryResponse';
  userForId: UserForIdResponse;
  userSearch: UserSearchResponse;
};


export type UserQueriesQueryResponseUserForIdArgs = {
  input: UserForIdInput;
};


export type UserQueriesQueryResponseUserSearchArgs = {
  input: UserSearchInput;
};

export type UserForIdResponse = {
  __typename: 'UserForIdResponse';
  user?: Maybe<UserExpress>;
};

export type UserForIdInput = {
  id: Scalars['ID'];
};

export type UserSearchResponse = {
  __typename: 'UserSearchResponse';
  users: Array<UserExpress>;
};

export type UserSearchInput = {
  first: Scalars['PaginationAmount'];
  usernameOrUserId: Scalars['String'];
};

export type AttributesForSeriesResponse = {
  __typename: 'AttributesForSeriesResponse';
  traits: Array<AttributesForSeriesTrait>;
};

export type AttributesForSeriesTrait = {
  __typename: 'AttributesForSeriesTrait';
  /** How many times this trait appears in the series */
  count: Scalars['Int'];
  traitName: Scalars['String'];
  traitValue: Scalars['String'];
};

export type AttributesForSeriesInput = {
  /** Either one of creatorId or creatorUsername should be specified */
  creatorId?: InputMaybe<Scalars['String']>;
  /** Either one of creatorId or creatorUsername should be specified */
  creatorUsername?: InputMaybe<Scalars['String']>;
  seriesSlug: Scalars['String'];
};

export type BidToCancelInput = {
  mint: Scalars['PublicKey'];
  userId: Scalars['String'];
};

export type CampaignActivityForSlugResponse = {
  __typename: 'CampaignActivityForSlugResponse';
  campaignActivity?: Maybe<NftTransactionsConnection>;
};


export type CampaignActivityForSlugResponseCampaignActivityArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: CampaignActivityForSlugInput;
};

export type CampaignActivityForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignForSlugResponse = {
  __typename: 'CampaignForSlugResponse';
  campaign?: Maybe<CampaignExpress>;
};

/** Contains high-level campaign information. Other information, like which NFTs belong to the campaign, is in CampaignSection */
export type CampaignExpress = {
  __typename: 'CampaignExpress';
  /** A comprehensive description of the campaign */
  about: Scalars['String'];
  amountRaisedInLamports: Scalars['bigint'];
  creator: UserExpress;
  /** A short description of the campaign */
  description: Scalars['String'];
  /** An alternative description. May be displayed in certain places instead of the description */
  descriptionAlt?: Maybe<Scalars['String']>;
  /** A fun way to mark progress on the campaign progress bar */
  emojiMarker?: Maybe<Scalars['String']>;
  goal: CampaignGoal;
  goalInLamports: Scalars['bigint'];
  heroAssets: Array<AssetExpress>;
  id: Scalars['ID'];
  logoAsset?: Maybe<AssetExpress>;
  socialLinks?: Maybe<CampaignSocialLinks>;
  title: Scalars['String'];
};

export type CampaignForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignSectionsForSlugResponse = {
  __typename: 'CampaignSectionsForSlugResponse';
  campaignSections?: Maybe<Array<CampaignSectionExpress>>;
};

export type CampaignSectionExpress = {
  __typename: 'CampaignSectionExpress';
  /** A list of benefits collectors receive for supporting the campaign via this section */
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  metadataAccounts?: Maybe<MetadataAccountsConnection>;
  title: Scalars['String'];
};


export type CampaignSectionExpressMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
};

export type CampaignSectionsForSlugInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type CampaignSectionsForSlugV2Response = {
  __typename: 'CampaignSectionsForSlugV2Response';
  campaignSections?: Maybe<Array<CampaignSectionV2>>;
};

export type CampaignSectionV2 = CampaignSectionWithNfts | CampaignSectionWithGenerativeMints;

/** Campaign section with NFTs as the funding type */
export type CampaignSectionWithNfts = ICampaignSectionV2 & {
  __typename: 'CampaignSectionWithNfts';
  /** A list of benefits collectors receive for supporting the campaign via this section */
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  metadataAccounts?: Maybe<MetadataAccountsConnection>;
};


/** Campaign section with NFTs as the funding type */
export type CampaignSectionWithNftsMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
};

export type ICampaignSectionV2 = {
  /** A list of benefits collectors receive for supporting the campaign via this section */
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
};

/** Campaign section with Generative Mint as funding type */
export type CampaignSectionWithGenerativeMints = ICampaignSectionV2 & {
  __typename: 'CampaignSectionWithGenerativeMints';
  /** A list of benefits collectors receive for supporting the campaign via this section */
  benefits: Array<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  title: Scalars['String'];
  candyMachineInfo?: Maybe<CampaignSectionWithGenerativeMintsCandyMachineInfo>;
  previewMetadataAccounts?: Maybe<MetadataAccountsConnection>;
};


/** Campaign section with Generative Mint as funding type */
export type CampaignSectionWithGenerativeMintsCandyMachineInfoArgs = {
  input: CampaignSectionWithGenerativeMintsCandyMachineInfoInput;
};


/** Campaign section with Generative Mint as funding type */
export type CampaignSectionWithGenerativeMintsPreviewMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
};

export type CampaignSectionWithGenerativeMintsCandyMachineInfo = {
  __typename: 'CampaignSectionWithGenerativeMintsCandyMachineInfo';
  candyMachine: CandyMachineExpress;
  id: Scalars['ID'];
  /** If true, viewer can mint at any time, irrespective of sale times. null if viewer is null. */
  isViewerOmniMinter?: Maybe<Scalars['Boolean']>;
  /** Asset used to show a preview when minting from this generative series */
  mintPreviewAsset?: Maybe<AssetExpress>;
  /** Assets shown during premint phase, prior to any sale beginning */
  premintPreviewAssets?: Maybe<Array<AssetExpress>>;
  viewerAllowlistInfo?: Maybe<CandyMachineAllowlistInfoForViewer>;
  viewerAmountMinted?: Maybe<Scalars['Int']>;
};

export type CandyMachineAllowlistInfoForViewer = CandyMachineMerkleAllowlistInfoForViewerExpress | CandyMachineTokenAllowlistInfoForViewer;

export type CandyMachineMerkleAllowlistInfoForViewerExpress = {
  __typename: 'CandyMachineMerkleAllowlistInfoForViewerExpress';
  amountAllowed: Scalars['Int'];
  /** How many NFTs the viewer minted in the allowlist phase. */
  amountMinted: Scalars['Int'];
  merkleRootIndexForProof: Scalars['Int'];
  proof: Scalars['String'];
};

export type CandyMachineTokenAllowlistInfoForViewer = {
  __typename: 'CandyMachineTokenAllowlistInfoForViewer';
  /** The viewer's token account for the allowlist mint. If the viewer has multiple token accounts for the same mint, this field may differ over time for the same viewer. */
  allowlistTokenAccount?: Maybe<Scalars['String']>;
  /** How many tokens the viewer owns. */
  allowlistTokenAmount: Scalars['Int'];
  allowlistTokenMint: Scalars['String'];
  /** How many NFTs the viewer minted in the allowlist phase. */
  amountMinted: Scalars['Int'];
};

export type CampaignSectionWithGenerativeMintsCandyMachineInfoInput = {
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type CampaignSectionsForSlugV2Input = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type EditionBuyerInfoResponse = {
  __typename: 'EditionBuyerInfoResponse';
  merkleAllowlistInfo?: Maybe<EditionsMerkleAllowlistInfoExpress>;
  /** Total number of editions purchased (includes both allowlist and public sale phases) */
  numberBought: Scalars['Int'];
};

export type EditionBuyerInfoInput = {
  mint: Scalars['PublicKey'];
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type EditionsForMasterEditionMintResponse = {
  __typename: 'EditionsForMasterEditionMintResponse';
  editions: MetadataAccountsConnection;
};


export type EditionsForMasterEditionMintResponseEditionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: EditionsForMasterEditionMintInput;
};

export type EditionsForMasterEditionMintInput = {
  masterEditionMint: Scalars['PublicKey'];
};

export type ExchangeRateResponse = {
  __typename: 'ExchangeRateResponse';
  rate?: Maybe<Scalars['Float']>;
};

export type ExchangeRateInput = {
  /** The currency we're exchanging from */
  baseCurrency: ExchangeRateCurrency;
  /** The currency we're exchanging to */
  exchangeCurrency: ExchangeRateCurrency;
  forceUpdate?: InputMaybe<Scalars['Boolean']>;
};

export enum ExchangeRateCurrency {
  Sol = 'SOL',
  Usd = 'USD',
  Usdc = 'USDC'
}

export type IsOwnerValidResponse = {
  __typename: 'IsOwnerValidResponse';
  isValid: Scalars['Boolean'];
};

export type IsOwnerValidInput = {
  mint: Scalars['PublicKey'];
};

export type MetadataAccountForMintInput = {
  mint: Scalars['PublicKey'];
};

export type MetadataAccountsInput = {
  address: Scalars['PublicKey'];
  includeCreator?: InputMaybe<Scalars['Boolean']>;
  includeOffPlatform?: InputMaybe<Scalars['Boolean']>;
  includeOwner?: InputMaybe<Scalars['Boolean']>;
  status?: InputMaybe<NftStatusExpress_Enum>;
};

export type MetadataAccountsAvailableToAddToCampaignResponse = {
  __typename: 'MetadataAccountsAvailableToAddToCampaignResponse';
  metadataAccounts: MetadataAccountsConnection;
};


export type MetadataAccountsAvailableToAddToCampaignResponseMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: MetadataAccountsAvailableToAddToCampaignInput;
};

export type MetadataAccountsAvailableToAddToCampaignInput = {
  campaignFundingTierId: Scalars['String'];
  creatorAddress?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
};

export type MetadataAccountsCollectedResponse = {
  __typename: 'MetadataAccountsCollectedResponse';
  /** Returns the union of the following: 1) The user collected the NFT (won an auction, instant sale, etc.) and 2) The user currently owns the NFT. */
  metadataAccounts: MetadataAccountsConnection;
  /** Returns the NFTs that the user owns and that are currently listed. */
  metadataAccountsListedByUser: MetadataAccountsConnection;
};


export type MetadataAccountsCollectedResponseMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: MetadataAccountsCollectedInput;
};


export type MetadataAccountsCollectedResponseMetadataAccountsListedByUserArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: MetadataAccountsCollectedInput;
};

export type MetadataAccountsCollectedInput = {
  collectorAddress?: InputMaybe<Scalars['String']>;
  collectorUsername?: InputMaybe<Scalars['String']>;
};

export type MetadataAccountsCreatedResponse = {
  __typename: 'MetadataAccountsCreatedResponse';
  metadataAccounts: MetadataAccountsConnection;
};


export type MetadataAccountsCreatedResponseMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['PaginationAmount'];
  input: MetadataAccountsCreatedInput;
};

export type MetadataAccountsCreatedInput = {
  creatorAddress?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
  includeCollaborations?: InputMaybe<Scalars['Boolean']>;
};

export type MetadataAccountsFeaturedInput = {
  isExperimental?: InputMaybe<Scalars['Boolean']>;
};

export type MetadataAccountsFeaturedEditionsResponse = {
  __typename: 'MetadataAccountsFeaturedEditionsResponse';
  metadataAccounts: Array<MetadataAccount>;
};

export type MetadataAccountsForAddressResponse = {
  __typename: 'MetadataAccountsForAddressResponse';
  metadataAccounts: MetadataAccountsConnection;
};


export type MetadataAccountsForAddressResponseMetadataAccountsArgs = {
  address: Scalars['PublicKey'];
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  status?: InputMaybe<NftStatusExpress_Enum>;
};

export type MetadataAccountsForAidInput = {
  isExperimental?: InputMaybe<Scalars['Boolean']>;
};

export type MetadataAccountsForExploreResponse = {
  __typename: 'MetadataAccountsForExploreResponse';
  metadataAccounts: MetadataAccountsConnection;
};


export type MetadataAccountsForExploreResponseMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: MetadataAccountsForExploreInput;
};

export type MetadataAccountsForExploreInput = {
  /** A list of attributes to filter on (null can be used if no filtering on attributes is needed) */
  attributes?: InputMaybe<Array<NftAttributeInput>>;
  availabilitySet: Array<ExploreAvailabilityV2>;
  /** A list of content types to filter on. If empty or null, no filtering will be done. */
  contentTypes?: InputMaybe<Array<Scalars['String']>>;
  currencyNames?: InputMaybe<Array<InputMaybe<CurrencyNameExpress_Enum>>>;
  extras?: InputMaybe<Array<ExploreExtra>>;
  highPriceLamports?: InputMaybe<Scalars['bigint']>;
  lowPriceLamports?: InputMaybe<Scalars['bigint']>;
  market: Array<ExploreMarket>;
  nftKind?: Array<NftKind>;
  /** If specified, only NFTs that belong to the specified owner will be returned */
  ownerId?: InputMaybe<Scalars['ID']>;
  /** If specified, only NFTs that belong to the corresponding series will be returned */
  series?: InputMaybe<MetadataAccountsForExploreSeriesInput>;
  sortOrder: ExploreSortOrder;
  tag?: InputMaybe<Scalars['String']>;
};

export type NftAttributeInput = {
  traitType: Scalars['String'];
  value: Scalars['String'];
};

export enum ExploreAvailabilityV2 {
  /** Used to show Editions that are available for primary sale. */
  Available = 'Available',
  InstantSale = 'InstantSale',
  LiveAuction = 'LiveAuction',
  /** Excludes scheduled auctions that have no bids */
  LiveAuctionWithBids = 'LiveAuctionWithBids',
  /** Only shows scheduled auctions that have no bids */
  LiveAuctionWithoutBids = 'LiveAuctionWithoutBids',
  ReservePrice = 'ReservePrice',
  Sold = 'Sold',
  /** Used to show Editions that have sold out. */
  SoldOut = 'SoldOut'
}

export enum ExploreExtra {
  HasPnft = 'HasPnft',
  HasUnlockable = 'HasUnlockable'
}

export enum ExploreMarket {
  Primary = 'Primary',
  Secondary = 'Secondary'
}

export enum NftKind {
  /** I.e. an NFT minted from a Candy Machine. Strictly speaking, Candy Machine NFTs do not HAVE to be generative, but typically are. */
  Generative = 'Generative',
  MasterEditionWithNonzeroSupply = 'MasterEditionWithNonzeroSupply',
  MasterEditionWithUnlimitedSupply = 'MasterEditionWithUnlimitedSupply',
  OneOfOne = 'OneOfOne',
  PnftMasterEdition = 'PnftMasterEdition',
  PnftStandardEdition = 'PnftStandardEdition',
  StandardEditionPrintNonzeroSupply = 'StandardEditionPrintNonzeroSupply',
  StandardEditionPrintUnlimitedSupply = 'StandardEditionPrintUnlimitedSupply'
}

export type MetadataAccountsForExploreSeriesInput = {
  /** Either one of creatorId or creatorUsername should be specified */
  creatorId?: InputMaybe<Scalars['String']>;
  /** Either one of creatorId or creatorUsername should be specified */
  creatorUsername?: InputMaybe<Scalars['String']>;
  seriesSlug: Scalars['String'];
};

export enum ExploreSortOrder {
  AuctionEndEarliest = 'AuctionEndEarliest',
  AuctionEndLatest = 'AuctionEndLatest',
  FewestPieces = 'FewestPieces',
  HighestPrice = 'HighestPrice',
  LeastRecentlyAddedTo = 'LeastRecentlyAddedTo',
  LowestPrice = 'LowestPrice',
  MostPieces = 'MostPieces',
  MostRecentlyAddedTo = 'MostRecentlyAddedTo',
  MostRecentlySold = 'MostRecentlySold',
  NameAscending = 'NameAscending',
  NameDescending = 'NameDescending',
  Newest = 'Newest',
  Oldest = 'Oldest',
  RarityHighest = 'RarityHighest',
  RarityLowest = 'RarityLowest'
}

export type MetadataAccountsForImportResponse = {
  __typename: 'MetadataAccountsForImportResponse';
  metadataAccounts: Array<MetadataAccount>;
};

export type MetadataAccountsForImportInput = {
  mintAddresses: Array<Scalars['String']>;
};

export type MetadataAccountsForSeriesResponse = {
  __typename: 'MetadataAccountsForSeriesResponse';
  metadataAccounts: MetadataAccountsConnection;
};


export type MetadataAccountsForSeriesResponseMetadataAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: MetadataAccountsForSeriesInput;
};

export type MetadataAccountsForSeriesInput = {
  /** Intended for using separate connections between NFT pages for NFTs that belong to the same series. */
  mint?: InputMaybe<Scalars['String']>;
  /** Either one of seriesId or slugInput should be specified */
  seriesId?: InputMaybe<Scalars['PublicKey']>;
  /** Used to loop the NFTs in the series for 'Next in this series' section */
  shouldLoop?: InputMaybe<Scalars['Boolean']>;
  /** Either one of seriesId or slugInput should be specified */
  slugInput?: InputMaybe<MetadataAccountsForSeriesSlugInput>;
};

export type MetadataAccountsForSeriesSlugInput = {
  /** Either one of creatorId or creatorUsername should be specified */
  creatorId?: InputMaybe<Scalars['String']>;
  /** Either one of creatorId or creatorUsername should be specified */
  creatorUsername?: InputMaybe<Scalars['String']>;
  seriesSlug: Scalars['String'];
};

export type MetadataAccountsHiddenGemsResponse = {
  __typename: 'MetadataAccountsHiddenGemsResponse';
  metadataAccounts: Array<MetadataAccount>;
};

export type NftOffersResponse = {
  __typename: 'NftOffersResponse';
  nftOffers: NftOffersConnection;
};


export type NftOffersResponseNftOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: NftOffersInput;
};

export type NftOffersConnection = {
  __typename: 'NftOffersConnection';
  edges: Array<NftOffersEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NftOffersEdge = {
  __typename: 'NftOffersEdge';
  cursor: Scalars['String'];
  node: NftOffer;
};

export type NftOffer = {
  __typename: 'NftOffer';
  expirationDate: Scalars['timestamptz'];
  /** Indication on whether offer is valid or not. We still surface invalid offers if the viewer made the offer and it hasn't been cancelled and refunded yet so that they can always cancel and refund themselves. */
  isValid: Scalars['Boolean'];
  transaction: NftTransactionExpress;
};

export type NftOffersInput = {
  mint: Scalars['PublicKey'];
  viewerId?: InputMaybe<Scalars['ID']>;
};

export type NftOffersForUserResponse = {
  __typename: 'NftOffersForUserResponse';
  nftOffers: NftOffersForUserConnection;
};


export type NftOffersForUserResponseNftOffersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: NftOffersForUserInput;
};

export type NftOffersForUserConnection = {
  __typename: 'NftOffersForUserConnection';
  edges: Array<NftOffersForUserEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type NftOffersForUserEdge = {
  __typename: 'NftOffersForUserEdge';
  cursor: Scalars['String'];
  node: NftOfferForUser;
};

export type NftOfferForUser = {
  __typename: 'NftOfferForUser';
  expirationDate: Scalars['timestamptz'];
  /** Indication on whether offer is valid or not. We still surface invalid offers if the viewer made the offer and it hasn't been cancelled and refunded yet so that they can always cancel and refund themselves. */
  isValid: Scalars['Boolean'];
  transaction: NftTransactionExpress;
  metadataAccount: MetadataAccount;
};

export type NftOffersForUserInput = {
  kinds: Array<NftOfferForUserKind>;
  userId: Scalars['PublicKey'];
};

export enum NftOfferForUserKind {
  Made = 'Made',
  Received = 'Received'
}

export type NftPageExtrasResponse = {
  __typename: 'NftPageExtrasResponse';
  viewerHasOpenOffersPlaced: Scalars['Boolean'];
};

export type NftPageExtrasInput = {
  mint: Scalars['PublicKey'];
};

export type NftTransactionsResponse = {
  __typename: 'NftTransactionsResponse';
  nftTransactions: NftTransactionsConnection;
};


export type NftTransactionsResponseNftTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: NftTransactionsInput;
};

export type NftTransactionsInput = {
  mint: Scalars['PublicKey'];
};

export type NftTransactionsForImportResponse = {
  __typename: 'NftTransactionsForImportResponse';
  transactions: Array<NftTransactionExpress>;
};

export type NftTransactionsForImportInput = {
  mintAddress: Scalars['String'];
};

export type OpenBid = {
  __typename: 'OpenBid';
  metadataAccount: MetadataAccount;
};

export type OpenBidsInput = {
  userId: Scalars['String'];
};

export type PnftAuctionNftsResponse = {
  __typename: 'PnftAuctionNftsResponse';
  metadataAccounts: Array<MetadataAccount>;
};

export type PnftAuctionNftsInput = {
  masterEditionPnftId: Scalars['PublicKey'];
};

export type PnftInfoResponse = {
  __typename: 'PnftInfoResponse';
  metadataAccount?: Maybe<MetadataAccount>;
};

export type PnftInfoInput = {
  auctionNftMint: Scalars['PublicKey'];
};

export type RefundableAmountsResponse = {
  __typename: 'RefundableAmountsResponse';
  amounts: Array<RefundableAmount>;
};

export type RefundableAmount = {
  __typename: 'RefundableAmount';
  amount: Price;
  amountInLamports: Scalars['bigint'];
  metadataAccount: MetadataAccount;
  userId: Scalars['String'];
};

export type RefundableAmountsInput = {
  userId?: InputMaybe<Scalars['String']>;
};

export type UserAndMetadataAccounts = {
  __typename: 'UserAndMetadataAccounts';
  metadataAccounts: Array<MetadataAccount>;
  user: UserExpress;
};

export type UsersForExploreResponse = {
  __typename: 'UsersForExploreResponse';
  users: UserAndMetadataAccountsConnection;
};


export type UsersForExploreResponseUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: UsersForExploreInput;
};

export type UserAndMetadataAccountsConnection = {
  __typename: 'UserAndMetadataAccountsConnection';
  edges: Array<UserAndMetadataAccountsEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int'];
};

export type UserAndMetadataAccountsEdge = {
  __typename: 'UserAndMetadataAccountsEdge';
  cursor: Scalars['String'];
  node: UserAndMetadataAccounts;
};

export type UsersForExploreInput = {
  orderBy?: InputMaybe<ExploreCreatorsSortOrder>;
};

export enum ExploreCreatorsSortOrder {
  Newest = 'Newest',
  Oldest = 'Oldest'
}

export type WalletViewerInput = {
  address: Scalars['PublicKey'];
};

export type Mutation_Root = {
  __typename: 'mutation_root';
  /** Mutation field that houses Airdrop mutations */
  AirdropMutations: AirdropMutationsMutationResponse;
  /** Namespace field for campaigns related mutations. */
  CampaignsNamespace: CampaignsNamespaceMutationResponse;
  /** Mutation field that houses mutations for Comments. */
  CommentMutations: CommentMutationsMutationResponse;
  /** Mutation field that houses mutations for Editions. */
  EditionsMutations: EditionsMutationsResponse;
  /** Namespace field for post related mutations. */
  PostNamespace: PostsNamespaceMutationResponse;
  /** Mutation field that houses mutations for Reactions. */
  ReactionMutations: ReactionMutationsMutationResponse;
  /** Mutation field that houses safety check mutations */
  SafetyCheckMutations: SafetyCheckMutationsResponse;
  /** Mutation field that houses survey mutations */
  SurveyMutations: SurveyMutationsResponse;
  acceptCreatorInvite: AcceptCreatorInviteResponse;
  claimBonk: Scalars['timestamptz'];
  connectSocialNetwork: SocialNetwork;
  deleteNft: MetadataAccount;
  disconnectSocialNetwork: SocialNetwork;
  dismissUnlockableWinnerBuyerShareInfoCta: UpdateUnlockableWinnerResponse;
  dismissUnlockableWinnerCreatorSeeInfoCta: UpdateUnlockableWinnerResponse;
  importNfts: ImportNftsResponse;
  insertNft: MetadataAccount;
  insertNftTransaction: InsertNftTransactionResponse;
  insertPnft: InsertPnftResponse;
  refreshMetadata: MetadataAccount;
  sendCreatorInvites: SendCreatorInvitesResponse;
  shareInfoAndSwapForToonies: ShareInfoAndSwapForTooniesResponse;
  updateDiscordRolesForUser: UpdateDiscordRolesForUserResponse;
  updateSeriesIdForNfts?: Maybe<UpdateSeriesIdForNftsResponse>;
  updateUnlockableWinnerBuyerInfo: UpdateUnlockableWinnerResponse;
  uploadNftToArweave: UploadNftToArweaveResponse;
};


export type Mutation_RootAcceptCreatorInviteArgs = {
  input: AcceptCreatorInviteInput;
};


export type Mutation_RootClaimBonkArgs = {
  userId: Scalars['String'];
};


export type Mutation_RootConnectSocialNetworkArgs = {
  input: ConnectSocialNetworkInput;
};


export type Mutation_RootDeleteNftArgs = {
  input: DeleteNftInput;
};


export type Mutation_RootDisconnectSocialNetworkArgs = {
  input: DisconnectSocialNetworkInput;
};


export type Mutation_RootDismissUnlockableWinnerBuyerShareInfoCtaArgs = {
  input: DismissUnlockableWinnerBuyerShareInfoCtaInput;
};


export type Mutation_RootDismissUnlockableWinnerCreatorSeeInfoCtaArgs = {
  input: DismissUnlockableWinnerCreatorSeeInfoCtaInput;
};


export type Mutation_RootImportNftsArgs = {
  input: ImportNftsInput;
};


export type Mutation_RootInsertNftArgs = {
  input: InsertNftInput;
};


export type Mutation_RootInsertNftTransactionArgs = {
  input: InsertNftTransactionInput;
};


export type Mutation_RootInsertPnftArgs = {
  input: InsertPnftInput;
};


export type Mutation_RootRefreshMetadataArgs = {
  input: RefreshMetadataInput;
};


export type Mutation_RootSendCreatorInvitesArgs = {
  input: SendCreatorInvitesInput;
};


export type Mutation_RootShareInfoAndSwapForTooniesArgs = {
  input: ShareInfoAndSwapForTooniesInput;
};


export type Mutation_RootUpdateSeriesIdForNftsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  input: UpdateSeriesIdForNftsInput;
};


export type Mutation_RootUpdateUnlockableWinnerBuyerInfoArgs = {
  input: UpdateUnlockableWinnerBuyerInfoInput;
};


export type Mutation_RootUploadNftToArweaveArgs = {
  input: UploadNftToArweaveInput;
};

export type AirdropMutationsMutationResponse = {
  __typename: 'AirdropMutationsMutationResponse';
  createAirdrops: CreateAirdropsResponse;
};


export type AirdropMutationsMutationResponseCreateAirdropsArgs = {
  input: CreateAirdropsInput;
};

export type CreateAirdropsResponse = {
  __typename: 'CreateAirdropsResponse';
  airdrops: Array<AirdropExpress>;
};

export type AirdropExpress = {
  __typename: 'AirdropExpress';
  id: Scalars['ID'];
  toUser: UserExpress;
  type: AirdropTypeExpress_Enum;
};

export enum AirdropTypeExpress_Enum {
  Claim = 'Claim',
  Gift = 'Gift'
}

export type CreateAirdropsInput = {
  masterEditionMint: Scalars['ID'];
  type: AirdropTypeExpress_Enum;
  toAddresses: Array<Scalars['ID']>;
};

export type CampaignsNamespaceMutationResponse = {
  __typename: 'CampaignsNamespaceMutationResponse';
  approveCampaign: ApproveCampaignResponse;
  concludeCampaign: ConcludeCampaignResponse;
  createAirdropsForCampaign: CreateAirdropsForCampaignResponse;
  createCampaign: CreateCampaignResponse;
  createCampaignFundingTierStandard: CreateCampaignFundingTierStandardResponse;
  deleteCampaignFundingTier: DeleteCampaignFundingTierResponse;
  publishCampaign: PublishCampaignResponse;
  rejectCampaign: RejectCampaignResponse;
  removeUserAsTeamMemberFromCampaign: RemoveUserAsTeamMemberFromCampaignResponse;
  submitCampaignForApproval: SubmitCampaignForApprovalResponse;
  updateCampaignAbout: UpdateCampaignAboutResponse;
  updateCampaignBasicInfo: UpdateCampaignBasicInfoResponse;
  updateCampaignFundingTierNfts: UpdateCampaignFundingTierNftsResponse;
  updateCampaignFundingTierOrder: UpdateCampaignFundingTierOrderResponse;
  updateCampaignFundingTierStandard: UpdateCampaignFundingTierStandardResponse;
  upsertCampaignGallery: UpsertCampaignGalleryResponse;
};


export type CampaignsNamespaceMutationResponseApproveCampaignArgs = {
  input: ApproveCampaignInput;
};


export type CampaignsNamespaceMutationResponseConcludeCampaignArgs = {
  input: ConcludeCampaignInput;
};


export type CampaignsNamespaceMutationResponseCreateAirdropsForCampaignArgs = {
  input: CreateAirdropsForCampaignInput;
};


export type CampaignsNamespaceMutationResponseCreateCampaignArgs = {
  input: CreateCampaignInput;
};


export type CampaignsNamespaceMutationResponseCreateCampaignFundingTierStandardArgs = {
  input: CreateCampaignFundingTierStandardInput;
};


export type CampaignsNamespaceMutationResponseDeleteCampaignFundingTierArgs = {
  input: DeleteCampaignFundingTierInput;
};


export type CampaignsNamespaceMutationResponsePublishCampaignArgs = {
  input: PublishCampaignInput;
};


export type CampaignsNamespaceMutationResponseRejectCampaignArgs = {
  input: RejectCampaignInput;
};


export type CampaignsNamespaceMutationResponseRemoveUserAsTeamMemberFromCampaignArgs = {
  input: RemoveUserAsTeamMemberFromCampaignInput;
};


export type CampaignsNamespaceMutationResponseSubmitCampaignForApprovalArgs = {
  input: SubmitCampaignForApprovalInput;
};


export type CampaignsNamespaceMutationResponseUpdateCampaignAboutArgs = {
  input: UpdateCampaignAboutInput;
};


export type CampaignsNamespaceMutationResponseUpdateCampaignBasicInfoArgs = {
  input: UpdateCampaignBasicInfoInput;
};


export type CampaignsNamespaceMutationResponseUpdateCampaignFundingTierNftsArgs = {
  input: UpdateCampaignFundingTierNftsInput;
};


export type CampaignsNamespaceMutationResponseUpdateCampaignFundingTierOrderArgs = {
  input: UpdateCampaignFundingTierOrderInput;
};


export type CampaignsNamespaceMutationResponseUpdateCampaignFundingTierStandardArgs = {
  input: UpdateCampaignFundingTierStandardInput;
};


export type CampaignsNamespaceMutationResponseUpsertCampaignGalleryArgs = {
  input: UpsertCampaignGalleryInput;
};

export type ApproveCampaignResponse = {
  __typename: 'ApproveCampaignResponse';
  campaign: CampaignV2;
};

export type ApproveCampaignInput = {
  campaignId: Scalars['ID'];
};

export type ConcludeCampaignResponse = {
  __typename: 'ConcludeCampaignResponse';
  campaign: CampaignV2;
};

export type ConcludeCampaignInput = {
  campaignId: Scalars['ID'];
};

export type CreateAirdropsForCampaignResponse = {
  __typename: 'CreateAirdropsForCampaignResponse';
  airdrops: Array<AirdropExpress>;
};

export type CreateAirdropsForCampaignInput = {
  masterEditionMint: Scalars['ID'];
  type: AirdropTypeExpress_Enum;
  campaignId: Scalars['ID'];
  /** Specific funding tiers may be specified to only airdrop to holders of those tiers */
  fundingTierIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreateCampaignResponse = {
  __typename: 'CreateCampaignResponse';
  campaign: CampaignV2;
};

export type CreateCampaignInput = {
  category: CampaignCategoryExpress_Enum;
  colorScheme: CampaignColorSchemeExpress_Enum;
  goal: CampaignGoalInput;
  tagline: Scalars['String'];
  teamMembers: Array<CampaignTeamMemberInput>;
  title: Scalars['String'];
  previewAsset: AssetInput;
};

export type CampaignGoalInput = {
  goalAmount: Scalars['bigint'];
  goalCurrencyName: CurrencyNameExpress_Enum;
  goalProgressSymbol: Scalars['String'];
  goalType: CampaignGoalTypeExpress_Enum;
};

export enum CampaignGoalTypeExpress_Enum {
  Monetary = 'Monetary',
  SaleCount = 'SaleCount'
}

export type CampaignTeamMemberInput = {
  role: CampaignTeamMemberRoleExpress_Enum;
  userId: Scalars['ID'];
};

export type AssetInput = {
  /** The Arweave txid, non-null if this asset has been (or will be) uploaded to Arweave */
  arweaveTxid?: InputMaybe<Scalars['String']>;
  contentType: Scalars['String'];
  dimensions?: InputMaybe<AssetDimensionsInput>;
  downloadUrl: Scalars['String'];
  path: Scalars['String'];
};

export type AssetDimensionsInput = {
  height: Scalars['Int'];
  width: Scalars['Int'];
};

export type CreateCampaignFundingTierStandardResponse = {
  __typename: 'CreateCampaignFundingTierStandardResponse';
  campaign: CampaignV2;
};

export type CreateCampaignFundingTierStandardInput = {
  benefits: Array<Scalars['String']>;
  campaignId: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type DeleteCampaignFundingTierResponse = {
  __typename: 'DeleteCampaignFundingTierResponse';
  campaign: CampaignV2;
};

export type DeleteCampaignFundingTierInput = {
  campaignFundingTierId: Scalars['ID'];
};

export type PublishCampaignResponse = {
  __typename: 'PublishCampaignResponse';
  campaign: CampaignV2;
};

export type PublishCampaignInput = {
  campaignId: Scalars['ID'];
};

export type RejectCampaignResponse = {
  __typename: 'RejectCampaignResponse';
  campaign: CampaignV2;
};

export type RejectCampaignInput = {
  campaignId: Scalars['ID'];
  feedback?: InputMaybe<Scalars['String']>;
  isPermaReject: Scalars['Boolean'];
};

export type RemoveUserAsTeamMemberFromCampaignResponse = {
  __typename: 'RemoveUserAsTeamMemberFromCampaignResponse';
  campaign: CampaignV2;
};

export type RemoveUserAsTeamMemberFromCampaignInput = {
  campaignId: Scalars['ID'];
  userId: Scalars['ID'];
};

export type SubmitCampaignForApprovalResponse = {
  __typename: 'SubmitCampaignForApprovalResponse';
  campaign: CampaignV2;
};

export type SubmitCampaignForApprovalInput = {
  campaignId: Scalars['ID'];
};

export type UpdateCampaignAboutResponse = {
  __typename: 'UpdateCampaignAboutResponse';
  campaign: CampaignV2;
};

export type UpdateCampaignAboutInput = {
  about: CampaignAboutInput;
  campaignId: Scalars['ID'];
};

export type CampaignAboutInput = {
  campaign?: InputMaybe<Scalars['String']>;
  contactInfo?: InputMaybe<Scalars['String']>;
  creator?: InputMaybe<Scalars['String']>;
  risksAndChallenges?: InputMaybe<Scalars['String']>;
  timeline?: InputMaybe<Scalars['String']>;
};

export type UpdateCampaignBasicInfoResponse = {
  __typename: 'UpdateCampaignBasicInfoResponse';
  campaign: CampaignV2;
};

export type UpdateCampaignBasicInfoInput = {
  category: CampaignCategoryExpress_Enum;
  colorScheme: CampaignColorSchemeExpress_Enum;
  goal: CampaignGoalInput;
  tagline: Scalars['String'];
  teamMembers: Array<CampaignTeamMemberInput>;
  title: Scalars['String'];
  campaignId: Scalars['ID'];
  previewAsset?: InputMaybe<AssetInput>;
};

export type UpdateCampaignFundingTierNftsResponse = {
  __typename: 'UpdateCampaignFundingTierNftsResponse';
  campaignFundingTier: CampaignFundingTierExpress;
};

export type UpdateCampaignFundingTierNftsInput = {
  campaignFundingTierId: Scalars['ID'];
  nftIds: Array<Scalars['ID']>;
};

export type UpdateCampaignFundingTierOrderResponse = {
  __typename: 'UpdateCampaignFundingTierOrderResponse';
  campaign: CampaignV2;
};

export type UpdateCampaignFundingTierOrderInput = {
  campaignId: Scalars['ID'];
  fundingTierOrder: Array<Scalars['ID']>;
};

export type UpdateCampaignFundingTierStandardResponse = {
  __typename: 'UpdateCampaignFundingTierStandardResponse';
  campaign: CampaignV2;
};

export type UpdateCampaignFundingTierStandardInput = {
  benefits: Array<Scalars['String']>;
  campaignFundingTierId: Scalars['ID'];
  description: Scalars['String'];
  title: Scalars['String'];
};

export type UpsertCampaignGalleryResponse = {
  __typename: 'UpsertCampaignGalleryResponse';
  campaign: CampaignV2;
};

export type UpsertCampaignGalleryInput = {
  campaignId: Scalars['ID'];
  galleryAssets: Array<AssetInput>;
  youtubeVideoHref?: InputMaybe<Scalars['String']>;
};

export type CommentMutationsMutationResponse = {
  __typename: 'CommentMutationsMutationResponse';
  createCommentForPost: CreateCommentForPostResponse;
  deleteCommentForPost: DeleteCommentForPostResponse;
};


export type CommentMutationsMutationResponseCreateCommentForPostArgs = {
  input: CreateCommentForPostInput;
};


export type CommentMutationsMutationResponseDeleteCommentForPostArgs = {
  input: DeleteCommentForPostInput;
};

export type CreateCommentForPostResponse = {
  __typename: 'CreateCommentForPostResponse';
  comment: CommentExpress;
};

export type CreateCommentForPostInput = {
  comment: Scalars['String'];
  postId: Scalars['ID'];
};

export type DeleteCommentForPostResponse = {
  __typename: 'DeleteCommentForPostResponse';
  comment: CommentExpress;
};

export type DeleteCommentForPostInput = {
  commentId: Scalars['ID'];
};

export type EditionsMutationsResponse = {
  __typename: 'EditionsMutationsResponse';
  addAllowlistAddresses: AddAllowlistAddressesResponse;
};


export type EditionsMutationsResponseAddAllowlistAddressesArgs = {
  input: AddAllowlistAddressesInput;
};

export type AddAllowlistAddressesResponse = {
  __typename: 'AddAllowlistAddressesResponse';
  addedAddresses: Array<Scalars['PublicKey']>;
};

export type AddAllowlistAddressesInput = {
  addresses: Array<Scalars['PublicKey']>;
  masterEditionMint: Scalars['ID'];
};

export type PostsNamespaceMutationResponse = {
  __typename: 'PostsNamespaceMutationResponse';
  createPostBaseForCampaign?: Maybe<CreatePostBaseForCampaignResponse>;
  createPostWithPollForCampaign?: Maybe<CreatePostWithPollForCampaignResponse>;
  respondToPoll?: Maybe<RespondToPollResponse>;
};


export type PostsNamespaceMutationResponseCreatePostBaseForCampaignArgs = {
  input: CreatePostBaseForCampaignInput;
};


export type PostsNamespaceMutationResponseCreatePostWithPollForCampaignArgs = {
  input: CreatePostWithPollForCampaignInput;
};


export type PostsNamespaceMutationResponseRespondToPollArgs = {
  input: RespondToPollInput;
};

export type CreatePostBaseForCampaignResponse = {
  __typename: 'CreatePostBaseForCampaignResponse';
  post: PostExpress;
};

export type CreatePostBaseForCampaignInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
  airdropMasterEditionMint?: InputMaybe<Scalars['String']>;
  postInput: CreatePostBaseInput;
};

export type CreatePostBaseInput = {
  assets?: InputMaybe<Array<AssetInput>>;
  body?: InputMaybe<Scalars['String']>;
  link?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
  visibility: PostVisibilityExpress_Enum;
  visibilityFundingTierIds?: InputMaybe<Array<Scalars['ID']>>;
};

export type CreatePostWithPollForCampaignResponse = {
  __typename: 'CreatePostWithPollForCampaignResponse';
  post: PostExpress;
};

export type CreatePostWithPollForCampaignInput = {
  campaignSlug: Scalars['String'];
  creatorId?: InputMaybe<Scalars['String']>;
  creatorUsername?: InputMaybe<Scalars['String']>;
  pollInput: PollInput;
  postInput: CreatePostBaseInput;
};

export type PollInput = {
  isMultiSelect: Scalars['Boolean'];
  pollOptions: Array<PollOptionInput>;
};

export type PollOptionInput = {
  text: Scalars['String'];
};

export type RespondToPollResponse = {
  __typename: 'RespondToPollResponse';
  poll: PollExpress;
};

export type RespondToPollInput = {
  pollOptionId: Scalars['String'];
  responseValue: Scalars['Boolean'];
};

export type ReactionMutationsMutationResponse = {
  __typename: 'ReactionMutationsMutationResponse';
  createReactionForPost: CreateReactionForPostResponse;
  deleteReactionForPost: DeleteReactionForPostResponse;
};


export type ReactionMutationsMutationResponseCreateReactionForPostArgs = {
  input: CreateReactionForPostInput;
};


export type ReactionMutationsMutationResponseDeleteReactionForPostArgs = {
  input: DeleteReactionForPostInput;
};

export type CreateReactionForPostResponse = {
  __typename: 'CreateReactionForPostResponse';
  type: ReactionTypeExpress_Enum;
};

export type CreateReactionForPostInput = {
  postId: Scalars['ID'];
  type: ReactionTypeExpress_Enum;
};

export type DeleteReactionForPostResponse = {
  __typename: 'DeleteReactionForPostResponse';
  type: ReactionTypeExpress_Enum;
};

export type DeleteReactionForPostInput = {
  postId: Scalars['ID'];
};

export type SafetyCheckMutationsResponse = {
  __typename: 'SafetyCheckMutationsResponse';
  createSafetyCheckSubmission: CreateSafetyCheckSubmissionResponse;
};


export type SafetyCheckMutationsResponseCreateSafetyCheckSubmissionArgs = {
  input: CreateSafetyCheckSubmissionInput;
};

export type CreateSafetyCheckSubmissionResponse = {
  __typename: 'CreateSafetyCheckSubmissionResponse';
  id: Scalars['ID'];
};

export type CreateSafetyCheckSubmissionInput = {
  artProcess: Scalars['String'];
  instagramName?: InputMaybe<Scalars['String']>;
  isCopyrightVerified: Scalars['Boolean'];
  processVideo?: InputMaybe<AssetInput>;
  websiteUrl: Scalars['String'];
};

export type SurveyMutationsResponse = {
  __typename: 'SurveyMutationsResponse';
  submitCollectorSurvey: SubmitCollectorSurveyResponse;
  submitCreatorSurvey: SubmitCreatorSurveyResponse;
};


export type SurveyMutationsResponseSubmitCollectorSurveyArgs = {
  input: SubmitCollectorSurveyInput;
};


export type SurveyMutationsResponseSubmitCreatorSurveyArgs = {
  input: SubmitCreatorSurveyInput;
};

export type SubmitCollectorSurveyResponse = {
  __typename: 'SubmitCollectorSurveyResponse';
  user: UserExpress;
};

export type SubmitCollectorSurveyInput = {
  freeform?: InputMaybe<Scalars['String']>;
  recommend: Scalars['Int'];
  seanEllis: Scalars['String'];
  why1: Scalars['String'];
  why2: Scalars['String'];
};

export type SubmitCreatorSurveyResponse = {
  __typename: 'SubmitCreatorSurveyResponse';
  user: UserExpress;
};

export type SubmitCreatorSurveyInput = {
  competition: Scalars['String'];
  impact: Scalars['String'];
  improvements: Scalars['String'];
  isFofuBetterThanWeb2: Scalars['Boolean'];
  isFofuMainRevenue: Scalars['Boolean'];
  positiveDifference: Scalars['String'];
  problems: Scalars['String'];
  recommend: Scalars['Int'];
  seanEllis: Scalars['String'];
  usesWeb2Platforms: Scalars['Boolean'];
};

export type AcceptCreatorInviteResponse = {
  __typename: 'AcceptCreatorInviteResponse';
  username: Scalars['String'];
};

export type AcceptCreatorInviteInput = {
  inviteLinkToken: Scalars['String'];
  username: Scalars['String'];
};

export type SocialNetwork = {
  __typename: 'SocialNetwork';
  authLink: Scalars['String'];
};

export type ConnectSocialNetworkInput = {
  redirectLocation?: InputMaybe<RedirectLocation_Enum>;
  socialNetworkType: SocialNetworkType_Enum;
  userId: Scalars['String'];
};

export enum RedirectLocation_Enum {
  Apply = 'Apply',
  EditProfile = 'EditProfile',
  Profile = 'Profile'
}

export enum SocialNetworkType_Enum {
  Discord = 'Discord',
  Instagram = 'Instagram',
  Twitter = 'Twitter'
}

export type DeleteNftInput = {
  mint: Scalars['String'];
};

export type DisconnectSocialNetworkInput = {
  socialNetworkType: SocialNetworkType_Enum;
  userId: Scalars['String'];
};

export type UpdateUnlockableWinnerResponse = {
  __typename: 'UpdateUnlockableWinnerResponse';
  unlockableWinner: UnlockableWinnerExpress;
};

/** Used to dismiss the "Share info" CTA the buyer sees in the UI. */
export type DismissUnlockableWinnerBuyerShareInfoCtaInput = {
  unlockableId: Scalars['ID'];
};

/** Used to dismiss the "See info" CTA the creator sees in the UI. */
export type DismissUnlockableWinnerCreatorSeeInfoCtaInput = {
  unlockableId: Scalars['ID'];
  unlockableWinnerUserId: Scalars['String'];
};

export type ImportNftsResponse = {
  __typename: 'ImportNftsResponse';
  metadataAccountsImported: Array<MetadataAccount>;
  mintAddressesFailedToImport: Array<Scalars['String']>;
};

export type ImportNftsInput = {
  mintAddresses: Array<Scalars['String']>;
};

export type InsertNftInput = {
  assetArweaveTxid: Scalars['String'];
  assetHeight?: InputMaybe<Scalars['Int']>;
  assetWidth?: InputMaybe<Scalars['Int']>;
  attributes?: InputMaybe<Array<NftAttributeInput>>;
  contentType: Scalars['String'];
  creatorId: Scalars['String'];
  creatorsMetadataString: Scalars['String'];
  description: Scalars['String'];
  disclosures?: InputMaybe<Array<NftDisclosureInput>>;
  editionNonce?: InputMaybe<Scalars['Int']>;
  image: Scalars['String'];
  isPnft?: InputMaybe<Scalars['Boolean']>;
  maxSupply?: InputMaybe<Scalars['Int']>;
  metadataArweaveTxid: Scalars['String'];
  mint: Scalars['String'];
  name: Scalars['String'];
  nonstandardAsset?: InputMaybe<AssetInput>;
  ownerId: Scalars['String'];
  sellerFeeBasisPoints: Scalars['Int'];
  seriesMint?: InputMaybe<Scalars['String']>;
  status: NftStatusExpress_Enum;
};

export type NftDisclosureInput = {
  details?: InputMaybe<Scalars['String']>;
  type: NftDisclosureTypeExpress_Enum;
};

export type InsertNftTransactionResponse = {
  __typename: 'InsertNftTransactionResponse';
  editionsMerkleAllowlistInfoForBuyer?: Maybe<EditionsMerkleAllowlistInfoExpress>;
  transaction: NftTransactionExpress;
  /** When inserting transactions for standard editions, it is sometimes necessary to update the master edition NFT. In those cases, this field will return the updated master edition */
  updatedMasterEditionMetadataAccount?: Maybe<MetadataAccount>;
  /** Returns the updated NFT with mint equal to the input object's mint field */
  updatedMetadataAccount: MetadataAccount;
};

export type InsertNftTransactionInput = {
  comment?: InputMaybe<Scalars['String']>;
  creatorId: Scalars['String'];
  currencyName?: InputMaybe<CurrencyNameExpress_Enum>;
  editionsInput?: InputMaybe<InsertNftTransactionEditionsInput>;
  fromUserId: Scalars['String'];
  id?: InputMaybe<Scalars['uuid']>;
  /** To make our transactions as atomic as possible, we include information that is necessary for inserting new nfts into our DB */
  insertNftInput?: InputMaybe<InsertNftInput>;
  /** To make our transactions as atomic as possible, we include information that is necessary for inserting Pnfts into our DB */
  insertPnftInput?: InputMaybe<InsertPnftInput>;
  /** To make our transactions as atomic as possible, we include information that is necessary for inserting standard editions into our DB */
  insertStandardEditionInput?: InputMaybe<InsertStandardEditionInput>;
  ixIndex?: InputMaybe<Scalars['Int']>;
  ixInnerIndex?: InputMaybe<Scalars['Int']>;
  mint: Scalars['String'];
  /** ID (not txid) of the offer transaction if inserting a SoldAcceptedOffer tx */
  offerTransactionId?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['bigint']>;
  /** A fallback timestamp that should be used if useTransactionBlockTime is false */
  timeCreatedFallback?: InputMaybe<Scalars['timestamptz']>;
  toUserId: Scalars['String'];
  txid: Scalars['String'];
  type: NftTransactionTypeExpress_Enum;
  updateClaimInput?: InputMaybe<InsertNftTransactionUpdateClaimInput>;
  updateNftInput?: InputMaybe<InsertNftTransactionUpdateNftInput>;
};

export type InsertNftTransactionEditionsInput = {
  allowlistAddresses?: InputMaybe<Array<Scalars['String']>>;
  allowlistAmountAllowed?: InputMaybe<Scalars['Int']>;
  allowlistEnabled?: InputMaybe<Scalars['Boolean']>;
  allowlistPrice?: InputMaybe<Scalars['bigint']>;
  allowlistStartTime?: InputMaybe<Scalars['timestamptz']>;
  priceFunctionType: PriceFunctionTypeExpress_Enum;
  priceParams: Array<Scalars['Float']>;
  publicSaleStartTime?: InputMaybe<Scalars['timestamptz']>;
  startingPriceInLamports: Scalars['bigint'];
};

export type InsertPnftInput = {
  edition: Scalars['Int'];
  ownerId: Scalars['String'];
  pnftLimitedEditionMint: Scalars['PublicKey'];
  pnftMasterEditionMint: Scalars['PublicKey'];
};

export type InsertStandardEditionInput = {
  masterEditionMint: Scalars['PublicKey'];
  ownerId: Scalars['String'];
  standardEditionMint: Scalars['PublicKey'];
};

/** Used to update the corresponding pNFT claim after inserting the transaction */
export type InsertNftTransactionUpdateClaimInput = {
  claimId: Scalars['uuid'];
};

/** We prefer to derive Nft and NftListing updates from the transaction information itself, but this is not always possible. In cases where it is not possible, we can specify how to update the NFT using this input type. */
export type InsertNftTransactionUpdateNftInput = {
  antiBotProtectionEnabled?: InputMaybe<Scalars['Boolean']>;
  auctionDurationInSeconds?: InputMaybe<Scalars['Int']>;
  editionBuyLimitPerAddress?: InputMaybe<Scalars['Int']>;
  insertUnlockableInput?: InputMaybe<InsertUnlockableInput>;
  pnftIdForAuction?: InputMaybe<Scalars['ID']>;
  scheduledAuctionTime?: InputMaybe<Scalars['timestamptz']>;
  tickSizeConstantInLamports?: InputMaybe<Scalars['bigint']>;
  timeExtensionDurationInSeconds?: InputMaybe<Scalars['Int']>;
};

export type InsertUnlockableInput = {
  asset: AssetInput;
  unlockable: UnlockableInput;
};

export type UnlockableInput = {
  activationPriceInLamports?: InputMaybe<Scalars['bigint']>;
  category: UnlockableCategory;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type InsertPnftResponse = {
  __typename: 'InsertPnftResponse';
  metadataAccount: MetadataAccount;
};

export type RefreshMetadataInput = {
  mint: Scalars['String'];
};

export type SendCreatorInvitesResponse = {
  __typename: 'SendCreatorInvitesResponse';
  convertedUserIds: Array<Scalars['String']>;
  sentEmails: Array<Scalars['String']>;
};

export type SendCreatorInvitesInput = {
  /** List of emails to send email invites to */
  emails: Array<Scalars['String']>;
  /** User IDs or usernames to be used for converting existing users to creators using an invite */
  userIdsOrUsernames: Array<Scalars['String']>;
};

export type ShareInfoAndSwapForTooniesResponse = {
  __typename: 'ShareInfoAndSwapForTooniesResponse';
  proofOfOwnershipTokenMetadataAccount: MetadataAccount;
};

export type ShareInfoAndSwapForTooniesInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  shippingAddress: Scalars['String'];
  swapTxid: Scalars['ID'];
  swappedNftMint: Scalars['ID'];
};

/** Adds any applicable Discord roles to a user and returns all the role IDs they have afterwards. */
export type UpdateDiscordRolesForUserResponse = UpdateDiscordRolesForUserResponseSuccess | UpdateDiscordRolesForUserResponseFailure;

export type UpdateDiscordRolesForUserResponseSuccess = {
  __typename: 'UpdateDiscordRolesForUserResponseSuccess';
  roleIds: Array<Scalars['ID']>;
};

export type UpdateDiscordRolesForUserResponseFailure = {
  __typename: 'UpdateDiscordRolesForUserResponseFailure';
  reason: Scalars['String'];
};

export type UpdateSeriesIdForNftsResponse = {
  __typename: 'UpdateSeriesIdForNftsResponse';
  metadataAccountsInSeries: MetadataAccountsConnection;
  metadataAccountsRemovedFromSeries: Array<MetadataAccount>;
};

export type UpdateSeriesIdForNftsInput = {
  mintsToAdd?: InputMaybe<Array<Scalars['String']>>;
  mintsToRemove?: InputMaybe<Array<Scalars['String']>>;
  order?: InputMaybe<Array<Scalars['String']>>;
  seriesId: Scalars['String'];
};

/** Used to update the UnlockableWinner buyer info for the creator to send them the unlockable. */
export type UpdateUnlockableWinnerBuyerInfoInput = {
  unlockableId: Scalars['ID'];
  userEmail: Scalars['String'];
};

export type UploadNftToArweaveResponse = {
  __typename: 'UploadNftToArweaveResponse';
  assetTxid: Scalars['String'];
  metadataTxid: Scalars['String'];
  /** For nonstandard files, e.g. GLB files, assetTxid is the txid of the preview file. This is the txid of the actual file. */
  nonstandardAssetTxid?: Maybe<Scalars['String']>;
};

export type UploadNftToArweaveInput = {
  fileName: Scalars['String'];
  metadata: NftMetadataV1Input;
  /** For nonstandard files, e.g. GLB files, fileName is the name of the preview file. This is the name of the actual file. */
  nonstandardFileName?: InputMaybe<Scalars['String']>;
};

export type NftMetadataV1Input = {
  animation_url?: InputMaybe<Scalars['String']>;
  attributes?: InputMaybe<Array<NftMetadataV1AttributeInput>>;
  collection?: InputMaybe<NftMetadataV1CollectionInput>;
  description: Scalars['String'];
  external_url?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  properties: NftMetadataV1PropertiesInput;
  seller_fee_basis_points: Scalars['Int'];
  symbol: Scalars['String'];
};

export type NftMetadataV1AttributeInput = {
  trait_type: Scalars['String'];
  value: Scalars['String'];
};

export type NftMetadataV1CollectionInput = {
  family?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type NftMetadataV1PropertiesInput = {
  category?: InputMaybe<Scalars['String']>;
  creators: Array<NftMetadataV1CreatorPropertyInput>;
  files?: InputMaybe<Array<NftMetadataV1FilePropertyInput>>;
};

export type NftMetadataV1CreatorPropertyInput = {
  address: Scalars['String'];
  share: Scalars['Int'];
  verified: Scalars['Boolean'];
};

export type NftMetadataV1FilePropertyInput = {
  cdn?: InputMaybe<Scalars['Boolean']>;
  type: Scalars['String'];
  uri: Scalars['String'];
};
