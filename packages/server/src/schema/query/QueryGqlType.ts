import { GraphQLObjectType } from "graphql";
import metadataAccountForMintQueryField from "src/schema/query/metadataAccountForMintQueryField";
import metadataAccountsForExploreQueryField from "src/schema/query/metadataAccountsForExploreQueryField";
import metadataAccountsQueryField from "src/schema/query/metadataAccountsQueryField";
import nftTransactionsQueryField from "src/schema/query/nftTransactionsQueryField";
import openBidsQueryField from "src/schema/query/openBidsQueryField";
import bidToCancelQueryField from "src/schema/query/bidToCancelQueryField";
import usersForExploreQueryField from "src/schema/query/usersForExploreQueryField";
import Typename from "src/types/enums/Typename";
import metadataAccountsFeaturedQueryField from "src/schema/query/metadataAccountsFeaturedQueryField";
import usersFeaturedQueryField from "src/schema/query/usersFeaturedQueryField";
import testQueryField from "src/schema/query/testQueryField";
import test2QueryField from "src/schema/query/test2QueryField";
import metadataAccountsForAddressQueryField from "src/schema/query/metadataAccountsForAddressQueryField";
import walletViewerQueryField from "src/schema/query/walletViewerQueryField";
import isOwnerValidQueryField from "src/schema/query/isOwnerValidQueryField";
import refundableAmountsQueryField from "src/schema/query/refundableAmountsQueryField";
import metadataAccountsForAidQueryField from "src/schema/query/metadataAccountsForAidQueryField";
import metadataAccountsForSeriesQueryField from "src/schema/query/metadataAccountsForSeriesQueryField";
import metadataAccountsForImportQueryField from "src/schema/query/metadataAccountsForImportQueryField";
import nftTransactionsForImportQueryField from "src/schema/query/nftTransactionsForImportQueryField";
import metadataAccountsCollectedQueryField from "src/schema/query/metadataAccountsCollectedQueryField";
import nftOffersQueryField from "src/schema/query/nftOffersQueryField";
import nftPageExtrasQueryField from "src/schema/query/nftPageExtrasQueryField";
import pnftAuctionNftsQueryField from "src/schema/query/pnftAuctionNftsQueryField";
import pnftInfoQueryField from "src/schema/query/pnftInfoQueryField";
import editionsForMasterEditionMintQueryField from "src/schema/query/editionsForMasterEditionMintQueryField";
import nftOffersForUserQueryField from "src/schema/query/nftOffersForUserQueryField";
import exchangeRateQueryField from "src/schema/query/exchangeRateQueryField";
import metadataAccountsHiddenGemsQueryField from "src/schema/query/metadataAccountsHiddenGemsQueryField";
import metadataAccountsFeaturedEditionsQueryField from "src/schema/query/metadataAccountsFeaturedEditionsQueryField";
import testSleepQueryField from "src/schema/query/testSleepQueryField";
import campaignForSlugQueryField from "src/schema/query/campaignForSlugQueryField";
import campaignSectionsForSlugQueryField from "src/schema/query/campaignSectionsForSlugQueryField";
import campaignActivityForSlugQueryField from "src/schema/query/campaignActivityForSlugQueryField";
import metadataAccountsCreatedQueryField from "src/schema/query/metadataAccountsCreatedQueryField";
import spotlightQueryField from "src/schema/query/spotlightQueryField";
import notificationsNamespaceQueryField from "src/schema/query/notificationsNamespaceQueryField";
import editionBuyerInfoQueryField from "src/schema/query/editionBuyerInfoQueryField";
import statsNamespaceQueryField from "src/schema/query/statsNamespaceQueryField";
import seriesNamespaceQueryField from "src/schema/query/seriesNamespaceQueryField";
import campaignSectionsForSlugV2QueryField from "src/schema/query/campaignSectionsForSlugV2QueryField";
import attributesForSeriesQueryField from "src/schema/query/attributesForSeriesQueryField";
import campaignsNamespaceQueryField from "src/schema/query/campaignsNamespaceQueryField";
import postsNamespaceQueryField from "src/schema/query/postsNamespaceQueryField";
import commentQueriesQueryField from "src/schema/query/commentQueriesQueryField";
import userQueriesQueryField from "src/schema/query/userQueriesQueryField";
import metadataAccountsAvailableToAddToCampaignQueryField from "src/schema/query/metadataAccountsAvailableToAddToCampaignQueryField";
import flashbackQueriesQueryField from "src/schema/query/flashbackQueriesQueryField";
import nftQueriesQueryField from "src/schema/query/nftQueriesQueryField";
import holderQueriesQueryField from "src/schema/query/holderQueriesQueryField";

const QueryGqlType = new GraphQLObjectType({
  fields: {
    CampaignsNamespace: campaignsNamespaceQueryField,
    CommentQueries: commentQueriesQueryField,
    FlashbackQueries: flashbackQueriesQueryField,
    HolderQueries: holderQueriesQueryField,
    NftQueries: nftQueriesQueryField,
    NotificationsNamespace: notificationsNamespaceQueryField,
    PostsNamespace: postsNamespaceQueryField,
    SeriesNamespace: seriesNamespaceQueryField,
    SpotlightNamespace: spotlightQueryField,
    StatsNamespace: statsNamespaceQueryField,
    UserQueries: userQueriesQueryField,
    attributesForSeries: attributesForSeriesQueryField,
    bidToCancel: bidToCancelQueryField,
    campaignActivityForSlug: campaignActivityForSlugQueryField,
    campaignForSlug: campaignForSlugQueryField,
    campaignSectionsForSlug: campaignSectionsForSlugQueryField,
    campaignSectionsForSlugV2: campaignSectionsForSlugV2QueryField,
    editionBuyerInfo: editionBuyerInfoQueryField,
    editionsForMasterEditionMint: editionsForMasterEditionMintQueryField,
    exchangeRate: exchangeRateQueryField,
    isOwnerValid: isOwnerValidQueryField,
    metadataAccountForMint: metadataAccountForMintQueryField,
    metadataAccounts: metadataAccountsQueryField,
    metadataAccountsAvailableToAddToCampaign:
      metadataAccountsAvailableToAddToCampaignQueryField,
    metadataAccountsCollected: metadataAccountsCollectedQueryField,
    metadataAccountsCreated: metadataAccountsCreatedQueryField,
    metadataAccountsFeatured: metadataAccountsFeaturedQueryField,
    metadataAccountsFeaturedEditions:
      metadataAccountsFeaturedEditionsQueryField,
    metadataAccountsForAddress: metadataAccountsForAddressQueryField,
    metadataAccountsForAid: metadataAccountsForAidQueryField,
    metadataAccountsForExplore: metadataAccountsForExploreQueryField,
    metadataAccountsForImport: metadataAccountsForImportQueryField,
    metadataAccountsForSeries: metadataAccountsForSeriesQueryField,
    metadataAccountsHiddenGems: metadataAccountsHiddenGemsQueryField,
    nftOffers: nftOffersQueryField,
    nftOffersForUser: nftOffersForUserQueryField,
    nftPageExtras: nftPageExtrasQueryField,
    nftTransactions: nftTransactionsQueryField,
    nftTransactionsForImport: nftTransactionsForImportQueryField,
    openBids: openBidsQueryField,
    pnftAuctionNfts: pnftAuctionNftsQueryField,
    pnftInfo: pnftInfoQueryField,
    refundableAmounts: refundableAmountsQueryField,
    // For benchmarking
    test: testQueryField,
    test2: test2QueryField,
    testSleep: testSleepQueryField,
    usersFeatured: usersFeaturedQueryField,
    usersForExplore: usersForExploreQueryField,
    walletViewer: walletViewerQueryField,
  },
  name: Typename.Query,
});

export default QueryGqlType;
