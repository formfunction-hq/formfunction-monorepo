import { SeverityLevel } from "@sentry/node";
import targetIncludesAny from "formfn-shared/dist/utils/array/targetIncludesAny";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";

// Shorthand constants
const debug = "debug";
const error = "error";
const fatal = "fatal";
const info = "info";
const warning = "warning";

/**
 * NOTE: we define a severity level for all events, even if they are not logged with logError.
 *
 * This makes it so if we ever change the logging code (e.g. add logError calls for some events),
 * we will still have the correct severity levels.
 */
const SEVERITY_MAP: Record<AnalyticsEvent, SeverityLevel> = {
  [AnalyticsEvent.AcceptCreatorInviteFail]: error,
  [AnalyticsEvent.AccountsLowOnFunds]: error,
  [AnalyticsEvent.AntiBotSignerFail]: error,
  [AnalyticsEvent.AirdropCreated]: info,
  [AnalyticsEvent.AirdropDebug]: error,
  [AnalyticsEvent.AirdropFail]: error,
  [AnalyticsEvent.AirdropSuccess]: info,
  [AnalyticsEvent.AppendEditionsMerkleAllowlistFail]: error,
  [AnalyticsEvent.AreNftListingsSyncedError]: error,
  [AnalyticsEvent.AreNftsSyncedDebug]: info,
  [AnalyticsEvent.AreNftsSyncedDuration]: info,
  [AnalyticsEvent.AreNftsSyncedError]: error,
  [AnalyticsEvent.AreNftsSyncedInsertedMissingTxs]: info,
  [AnalyticsEvent.BackfillMissingEditionsFail]: error,
  [AnalyticsEvent.BonkError]: fatal,
  [AnalyticsEvent.BotTaxedTransaction]: error,
  [AnalyticsEvent.BundlrError]: fatal,
  [AnalyticsEvent.CheckActiveOffersError]: error,
  [AnalyticsEvent.CheckRefundableAmountsDuration]: info,
  [AnalyticsEvent.CloseEditionDistributorTokenAccountFail]: error,
  [AnalyticsEvent.CloseEditionDistributorTokenAccountSuccess]: info,
  [AnalyticsEvent.ConvertOffPlatformNftFail]: error,
  [AnalyticsEvent.ConvertOffPlatformNftInvalidMetadata]: error,
  [AnalyticsEvent.CreateLastBidPriceError]: error,
  [AnalyticsEvent.CreatorInvitesIssued]: info,
  [AnalyticsEvent.CreateNotificationsWebhookError]: error,
  [AnalyticsEvent.CreateNotificationsWebhookTooLongDelay]: warning,
  [AnalyticsEvent.CreateOnchainAllowlistForEditionsError]: error,
  [AnalyticsEvent.CreateOnchainAllowlistForEditionsSuccess]: info,
  [AnalyticsEvent.CrossmintError]: error,
  [AnalyticsEvent.CrossmintSuccess]: info,
  [AnalyticsEvent.DatadogDebug]: debug,
  [AnalyticsEvent.DatadogError]: error,
  [AnalyticsEvent.DatadogInfo]: info,
  [AnalyticsEvent.DatadogWarn]: warning,
  [AnalyticsEvent.DebugInsertAuctionWonTxs]: fatal,
  [AnalyticsEvent.DecodeIxError]: error,
  [AnalyticsEvent.DeleteNftError]: error,
  [AnalyticsEvent.DeleteNftSuccess]: info,
  [AnalyticsEvent.DiscordAuthCallbackError]: error,
  [AnalyticsEvent.DiscordAuthUserNotConnected]: error,
  [AnalyticsEvent.DiscordAuthUserNotInServerError]: info,
  [AnalyticsEvent.EmailIsNull]: warning,
  [AnalyticsEvent.ExchangeRateError]: warning,
  [AnalyticsEvent.ExpressError]: error,
  [AnalyticsEvent.ExtendAuctionsIfLowTpsDetected]: error,
  [AnalyticsEvent.ExtendAuctionsIfLowTpsError]: error,
  [AnalyticsEvent.ExtendAuctionsIfLowTpsSuccess]: error,
  [AnalyticsEvent.ExtendingBid]: info,
  [AnalyticsEvent.FailedTransactionCheckError]: error,
  [AnalyticsEvent.FeaturedEditionsQueueEmpty]: error,
  [AnalyticsEvent.FetchMetadataFail]: error,
  [AnalyticsEvent.FundingBundlrAccountFail]: error,
  [AnalyticsEvent.FundingBundlrAccountSuccess]: info,
  [AnalyticsEvent.GetAllTransferTxs]: info,
  [AnalyticsEvent.GetAllTransferTxsError]: error,
  [AnalyticsEvent.GetConfirmedSignaturesForAddressLimitExceeded]: error,
  [AnalyticsEvent.GetLastAuctionInfoError]: error,
  [AnalyticsEvent.GetMasterEditionUpdateFieldsError]: error,
  [AnalyticsEvent.GetNftTxRawDeleteFailedTxsSuccess]: info,
  [AnalyticsEvent.GetNftTxRawFailedToFetchTx]: error,
  [AnalyticsEvent.GetNftTxRawFailedToInsertTx]: error,
  [AnalyticsEvent.GetNftTxRawFailedToParseTx]: error,
  [AnalyticsEvent.GetNftTxRawFoundMissingTransactions]: warning,
  [AnalyticsEvent.GetParsedTransactionError]: error,
  [AnalyticsEvent.GetSaleTypeForTxError]: error,
  [AnalyticsEvent.GraphqlCost]: info,
  [AnalyticsEvent.HasuraPerf]: warning,
  [AnalyticsEvent.HasuraWebhookDebug]: info,
  [AnalyticsEvent.HasuraWebhookError]: fatal,
  [AnalyticsEvent.HeliusError]: error,
  [AnalyticsEvent.HiddenGemsQueueEmpty]: error,
  [AnalyticsEvent.ImportNftsError]: error,
  [AnalyticsEvent.ImportNftsSuccess]: info,
  [AnalyticsEvent.IncrementCandyMachineTotalAmountMintedError]: error,
  [AnalyticsEvent.InsertHolaplexTxsError]: warning,
  [AnalyticsEvent.InsertNftFromSoldGenerativeMintTransactionError]: error,
  [AnalyticsEvent.InsertNftTransactionCalled]: info,
  [AnalyticsEvent.InsertNftTransactionCreatingNft]: info,
  [AnalyticsEvent.InsertNftTransactionDuration]: info,
  [AnalyticsEvent.InsertNftTransactionError]: error,
  [AnalyticsEvent.InsertNftTransactionSuccess]: info,
  [AnalyticsEvent.InstagramAuthCallbackFail]: warning,
  [AnalyticsEvent.InternTransactionCreatedError]: error,
  [AnalyticsEvent.InternTransactionCreatedExtendTimeSuccess]: info,
  [AnalyticsEvent.InternTransactionCreatedSuccess]: info,
  [AnalyticsEvent.InvalidRequestPublicKeySignature]: error,
  [AnalyticsEvent.LaunchDarklyError]: error,
  [AnalyticsEvent.LogEventLokiError]: warning,
  [AnalyticsEvent.LoginJwtError]: error,
  [AnalyticsEvent.LoginFirebaseError]: error,
  [AnalyticsEvent.MissingTransactionsError]: error,
  [AnalyticsEvent.MissingTransactionsInserted]: info,
  [AnalyticsEvent.MuxDebug]: info,
  [AnalyticsEvent.MuxWebhookError]: error,
  [AnalyticsEvent.MuxWebhookSuccess]: info,
  [AnalyticsEvent.NewVoteWebhookError]: error,
  [AnalyticsEvent.NginxErrors]: error,
  [AnalyticsEvent.NftRawTxsDuration]: info,
  [AnalyticsEvent.NotifyLastDayPnftClaimantsSuccess]: info,
  [AnalyticsEvent.OutbidYourself]: info,
  [AnalyticsEvent.OutOfSyncError]: error,
  [AnalyticsEvent.OverdueAuctions]: warning,
  [AnalyticsEvent.OverdueAuctionsError]: error,
  [AnalyticsEvent.ParseBuyTxError]: warning,
  [AnalyticsEvent.ParseSolscanTransferTxError]: error,
  [AnalyticsEvent.ParseTxError]: warning,
  [AnalyticsEvent.PendingRefundsError]: fatal,
  [AnalyticsEvent.PnftClaimantLimitReached]: error,
  [AnalyticsEvent.PrismaPerf]: warning,
  [AnalyticsEvent.PrismaPerfExplore]: info,
  [AnalyticsEvent.ProcessExpiredOffersDuration]: info,
  [AnalyticsEvent.ProcessExpiredOffersError]: error,
  [AnalyticsEvent.ProcessExpiredOffersInfo]: info,
  [AnalyticsEvent.ProcessFinishedAirdropError]: error,
  [AnalyticsEvent.ProcessFinishedAuctionsDuration]: info,
  [AnalyticsEvent.ProcessFinishedAuctionsError]: error,
  [AnalyticsEvent.ProcessFinishedAuctionsNoWinningBidder]: warning,
  [AnalyticsEvent.ProcessFinishedAuctionsProcessNftFinished]: info,
  [AnalyticsEvent.ProcessFinishedAuctionsSendEmailFail]: error,
  [AnalyticsEvent.ProcessFinishedAuctionsSendEmailSuccess]: info,
  [AnalyticsEvent.ProcessFinishedPnftDropsFail]: error,
  [AnalyticsEvent.ProcessFinishedPnftDropsFinish]: info,
  [AnalyticsEvent.RefreshNftInsertTransaction]: info,
  [AnalyticsEvent.RefreshNftInsertUnexpectedTransaction]: error,
  [AnalyticsEvent.RefreshNftUnexpectedError]: error,
  [AnalyticsEvent.RefreshNftUpdated]: info,
  [AnalyticsEvent.RefreshNftUpdateFailed]: error,
  [AnalyticsEvent.RequestReceived]: info,
  [AnalyticsEvent.ResolverError]: error,
  [AnalyticsEvent.ResolverError500]: error,
  [AnalyticsEvent.RpcRetryDuration]: info,
  [AnalyticsEvent.RpcRetryError]: error,
  [AnalyticsEvent.RpcRetryFatal]: fatal,
  [AnalyticsEvent.RpcRetryResult]: warning,
  [AnalyticsEvent.RpcRetryWarning]: warning,
  [AnalyticsEvent.RpcTimeout]: warning,
  [AnalyticsEvent.SendCreatorInviteFail]: error,
  [AnalyticsEvent.SendDiscordNotificationFail]: warning,
  [AnalyticsEvent.SendEmailFail]: error,
  [AnalyticsEvent.SendEmailFilteredRecipients]: info,
  [AnalyticsEvent.SendEmailSuccess]: info,
  [AnalyticsEvent.SendSlackNotificationFail]: warning,
  [AnalyticsEvent.SetPreviousBiddersResult]: info,
  [AnalyticsEvent.SolanaBlockTimeError]: fatal,
  [AnalyticsEvent.SyncAuctionTxsDuration]: info,
  [AnalyticsEvent.SyncNftMetadataDebug]: info,
  [AnalyticsEvent.SyncNftMetadataError]: error,
  [AnalyticsEvent.SyncTransferTxsDebug]: info,
  [AnalyticsEvent.SyncTransferTxsDuration]: info,
  // For testing
  [AnalyticsEvent.Test]: info,
  [AnalyticsEvent.TransactionTokenDelegateWarning]: error,
  [AnalyticsEvent.TwitterAuthCallbackFail]: warning,
  [AnalyticsEvent.UnexpectedInput]: warning,
  [AnalyticsEvent.UpdateCampaignFundingTierNftsError]: error,
  [AnalyticsEvent.UpdatePnftDropFail]: error,
  [AnalyticsEvent.UpdatePnftDropSuccess]: info,
  [AnalyticsEvent.UpdateUnlockableWinnerFail]: error,
  [AnalyticsEvent.UpdateUnlockableWinnerSuccess]: info,
  [AnalyticsEvent.UpdateScheduledAuctionsSuccess]: info,
  [AnalyticsEvent.UploadAssetToArweaveFail]: error,
  [AnalyticsEvent.UploadAssetToArweaveSuccess]: info,
  [AnalyticsEvent.UploadImportedAssetError]: error,
  [AnalyticsEvent.UploadImportedAssetSuccess]: info,
  [AnalyticsEvent.UploadMp4GifPreviewSuccess]: info,
  [AnalyticsEvent.UploadMp4ThumbnailFail]: error,
  [AnalyticsEvent.UploadMp4ThumbnailSuccess]: info,
  [AnalyticsEvent.UploadNftMetadataToArweaveFail]: error,
  [AnalyticsEvent.UploadNftMetadataToArweaveSuccess]: fatal,
  [AnalyticsEvent.UploadNftToArweaveFail]: error,
  [AnalyticsEvent.UploadNftToArweaveSuccess]: info,
  [AnalyticsEvent.UploadSeriesToArweaveFail]: error,
  [AnalyticsEvent.UploadToMuxWebhookError]: error,
  [AnalyticsEvent.ValidateNftBidError]: fatal,
  [AnalyticsEvent.VerificationError]: error,
  [AnalyticsEvent.VerificationMissingSignature]: warning,
  [AnalyticsEvent.ViewerIdMismatch]: error,
};

const ERROR_MESSAGES_FOR_SEVERITIES = {
  [AnalyticsEvent.ResolverError]: {
    [error]: [],
    [fatal]: [],
    [info]: [
      "A user with that email already exists. Please refresh and enter their username/wallet address instead.",
      "You do not have enough invites",
      "Please sign in to react to this post",
    ],
    [warning]: [],
  },
  [AnalyticsEvent.SendEmailFail]: {
    [error]: [],
    [fatal]: [],
    [info]: [
      "You tried to send to a recipient that has been marked as inactive",
      "You tried to send to recipient(s) that have been marked as inactive",
    ],
    [warning]: [],
  },
};

export default function getErrorEventSeverity(
  event: AnalyticsEvent,
  errOrMsg: Error | string
): SeverityLevel {
  const defaultSeverity = SEVERITY_MAP[event];

  const errorMessage =
    typeof errOrMsg === "string" ? errOrMsg : errOrMsg.message;

  if (!Object.keys(ERROR_MESSAGES_FOR_SEVERITIES).includes(event)) {
    return defaultSeverity;
  }

  const severities = [info, warning, error, fatal] as const;
  const levelsForEvent =
    ERROR_MESSAGES_FOR_SEVERITIES[
      event as keyof typeof ERROR_MESSAGES_FOR_SEVERITIES
    ];

  // eslint-disable-next-line no-restricted-syntax
  for (const severity of severities) {
    const messagesForLevel = levelsForEvent[severity];
    if (targetIncludesAny(errorMessage, messagesForLevel)) {
      return severity;
    }
  }

  return defaultSeverity;
}
