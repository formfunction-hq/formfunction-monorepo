import getLdBootstrap from "utils/launch-darkly/getLdBootstrap";

const pageSizes = getLdBootstrap()?.pageSizes;

export const ACTIVITY_NOTIFICATIONS_PAGE_SIZE =
  pageSizes?.activityNotifications ?? 21;
// Should be divisible by 2 and 3 so pagination looks good for different grids
export const COLLECTED_TAB_PAGE_SIZE = pageSizes?.collectedTab ?? 18;
// Should be divisible by 2 and 3 so pagination looks good for different grids
export const EXPLORE_ARTWORK_PAGE_SIZE = pageSizes?.exploreArtwork ?? 30;
export const EXPLORE_CAMPAIGNS_PAGE_SIZE = pageSizes?.exploreCampaigns ?? 16;
export const EXPLORE_CREATORS_PAGE_SIZE = pageSizes?.exploreCreators ?? 16;
export const EXPLORE_SERIES_PAGE_SIZE = pageSizes?.exploreSeries ?? 12;
export const GENERATIVE_SERIES_PAGE_NFTS_PAGE_SIZE =
  pageSizes?.generativeSeriesPageNfts ?? 24;
export const NFT_TRANSACTIONS_PAGE_SIZE = pageSizes?.nftTransactions ?? 10;
export const EDITIONS_PAGE_SIZE = pageSizes?.editions ?? 5;
export const NFT_PAGE_NEXT_IN_THIS_SERIES_PAGE_SIZE =
  pageSizes?.nextInThisSeries ?? 3;
export const PROFILE_CAMPAIGNS_PAGE_SIZE = pageSizes?.profileCampaigns ?? 16;
export const SERIES_PAGE_NFTS_PAGE_SIZE = pageSizes?.seriesPageNfts ?? 24;
export const UPCOMING_SPOTLIGHTS_PAGE_SIZE = pageSizes?.upcomingSpotlights ?? 3;
export const RECENT_SPOTLIGHTS_PAGE_SIZE = pageSizes?.recentSpotlights ?? 9;
export const CAMPAIGN_POSTS_PAGE_SIZE = pageSizes?.campaignPosts ?? 6;
export const CAMPAIGN_POST_COMMENTS_PAGE_SIZE =
  pageSizes?.campaignPostComments ?? 10;
export const CAMPAIGN_HOLDERS_PAGE_SIZE = pageSizes?.campaignHolders ?? 20;
