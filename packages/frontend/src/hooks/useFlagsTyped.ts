import { useFlags } from "launchdarkly-react-client-sdk";
import Environment from "formfn-shared/dist/types/Environment";
import { MaybeUndef } from "formfn-shared/dist/types/UtilityTypes";
import PnftDropTimesFlag from "formfn-shared/dist/types/PnftDropTimesFlag";
import CampaignsConfig from "formfn-shared/dist/types/CampaignsConfig";
import GraphqlUrlConfig from "types/GraphqlUrlConfig";
import { ConnectionConfig } from "@solana/web3.js";
import Currency from "types/relay/Currency";

type LazyLoadConfig = {
  enabled: boolean;
  offset: number;
  once: boolean;
  unmountIfInvisible: boolean;
};

export type Flags = {
  auctionDurationOptions: Array<{ label: string; value: string }>;
  bonkClaimConfig: {
    claimDeadline: string;
    enabled: boolean;
  };
  campaignHeroConfig: {
    campaignPreviews?: Array<{
      creator: {
        profilePhotoSrc: string;
        username: string;
      };
      description: string;
      emoji: string;
      launchDate: string;
      previewSrc: string;
      title: string;
    }>;
    campaigns: Array<{ id: string; launchDate?: string }>;
    enabled: boolean;
  };
  campaignsConfig: CampaignsConfig;
  currencyAllowlist: Record<Currency, MaybeUndef<Array<string>>>;
  defaultPollingIntervalSeconds: number;
  devnetRpcUrlFrontend: string;
  disableDoubleAuthSend: boolean;
  disableHlsForListingCard: boolean;
  enableCampaignCreator: boolean;
  enableCampaignsExplore: boolean;
  enableCampaignsLandingPageSection: boolean;
  enableCampaignsOnProfile: boolean;
  enableFirebaseLogin: boolean;
  enableFrontendLogToLoki: boolean;
  enableFrontpageSpotlight: boolean;
  enableGlb: boolean;
  enableHashlist: boolean;
  enableHtmlMinting: boolean;
  enableInstagramLinking: boolean;
  enableJwtAuth: boolean;
  enableLazyLoadUnmount: boolean;
  enableLowTpsExtensions: boolean;
  enableLowTpsExtensionsForUnknownNetworkHealth: boolean;
  enableNsfwDisclosure: boolean;
  featuredEditionsConfig: {
    mintAddressList: Array<string>;
    numberToDisplay: number;
    showAtTop: boolean;
  };
  featuredSpotlightConfig: Array<{
    artistPill: {
      name: string;
      src: string;
    };
    assetSrc: string;
    description: string;
    label: string;
    layout: "Standard" | "TwoColumnSquareImage";
    link: string;
    title: string;
  }>;
  frontendConfirmTransactionInitialTimeout: number;
  frontendConnectionConfig: ConnectionConfig;
  gcReleaseBufferSize: number;
  graphqlUrlConfig: GraphqlUrlConfig;
  graphqlUrlDev: string;
  graphqlUrlProd: string;
  graphqlUrlTest: string;
  hasuraProdEndpoint: string;
  heroPhotoAssets: Array<{
    artistName: string;
    artistSrc: string;
    contentSrc: string;
    nftSrc: string;
  }>;
  heroVideoAssets: Array<{
    artistName: string;
    artistSrc: string;
    contentSrc: string;
    nftSrc: string;
    playbackId: string;
  }>;
  isBootstrap: boolean;
  lazyLoadConfig: {
    default: LazyLoadConfig;
    video: LazyLoadConfig;
  };
  listingCardConfig: {
    hideAsset: boolean;
    hideShimmer: boolean;
  };
  listingCardImageDimensions: {
    height: number;
    width: number;
  };
  mainnetRpcRetryUrlsFrontend: Array<string>;
  mainnetRpcUrlFrontend: string;
  nftPageEditionsFetchSize: number;
  numVotesRequired: number;
  pageSizes: {
    activityNotifications: number;
    campaignHolders: number;
    campaignPostComments: number;
    campaignPosts: number;
    collectedTab: number;
    editions: number;
    exploreArtwork: number;
    exploreCampaigns: number;
    exploreCreators: number;
    exploreSeries: number;
    generativeSeriesPageNfts: number;
    nextInThisSeries: number;
    nftTransactions: number;
    profileCampaigns: number;
    recentSpotlights: number;
    seriesPageNfts: number;
    upcomingSpotlights: number;
  };
  pnftDropTimes: PnftDropTimesFlag;
  restApiUrl: {
    [Environment.Development]: string;
    [Environment.Local]: string;
    [Environment.Production]: string;
    [Environment.Testnet]: string;
  };
  solanaExchangeRateDefault: number;
  solanaTpsCutoffs: {
    solanaDownTpsCutoff: number;
    solanaSlowTpsCutoff: number;
  };
  solanaTpsLookbackInMinutes: number;
  stellateHeaders: { [key: string]: string };
  teamWallets: Array<string>;
  testnetRpcUrlFrontend: string;
  timeSelectMinScheduleTimeMinutes: number;
  timeSelectNumIncrements: number;
  tracesSampleRateFrontend: number;
  trendingSeriesMints: Array<string>;
};

export default function useFlagsTyped() {
  const flags = useFlags() as Flags;
  return flags;
}
