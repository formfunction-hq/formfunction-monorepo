import { Severity } from "@sentry/react";
import AnalyticsEvent from "types/enums/AnalyticsEvent";
import targetIncludesAny from "formfn-shared/dist/utils/array/targetIncludesAny";

// Shorthand constants
const error = Severity.Error;
const fatal = Severity.Fatal;
const info = Severity.Info;
const warning = Severity.Warning;

/**
 * NOTE: we define a severity level for all events, even if they are not logged with logError.
 *
 * This makes it so if we ever change the logging code (e.g. add logError calls for some events),
 * we will still have the correct severity levels.
 */
const SEVERITY_MAP = {
  [AnalyticsEvent.AddressLookupTableError]: error,
  [AnalyticsEvent.BidModalError]: error,
  [AnalyticsEvent.AntiBotSignerFail]: error,
  [AnalyticsEvent.BidModalLogRawTxFail]: error,
  [AnalyticsEvent.BotTaxedTransaction]: error,
  [AnalyticsEvent.ButtonClick]: info,
  [AnalyticsEvent.BuyEditionError]: error,
  [AnalyticsEvent.CancelOfferError]: error,
  [AnalyticsEvent.ClaimPnftError]: error,
  [AnalyticsEvent.ColorModeChange]: info,
  [AnalyticsEvent.ConnectWallet]: info,
  [AnalyticsEvent.CopyTextToClipboardError]: error,
  [AnalyticsEvent.DiscordAuthRetryLimitReached]: error,
  [AnalyticsEvent.ExchangeRatesError]: error,
  [AnalyticsEvent.GlobalErrorBoundaryHit]: fatal,
  [AnalyticsEvent.GumdropSdkNull]: error,
  [AnalyticsEvent.InsertRawTxFail]: error,
  [AnalyticsEvent.InsertRawTxSerializeExtraDataFail]: error,
  [AnalyticsEvent.LaunchDarklyError]: error,
  [AnalyticsEvent.LoginFirebaseError]: error,
  [AnalyticsEvent.LoginFirebaseSuccess]: info,
  [AnalyticsEvent.MakeAnOfferModalError]: error,
  [AnalyticsEvent.MintNftError]: error,
  [AnalyticsEvent.PageView]: info,
  [AnalyticsEvent.RelayFetchFail]: fatal,
  [AnalyticsEvent.RelayFetchFailPolling]: error,
  [AnalyticsEvent.RelayFetchThrows]: error,
  [AnalyticsEvent.RelayFetchThrowsPolling]: error,
  [AnalyticsEvent.RelayUnexpectedUndefined]: warning,
  [AnalyticsEvent.RelayUpdaterError]: error,
  [AnalyticsEvent.RpcError]: error,
  [AnalyticsEvent.TooManyCreators]: warning,
  [AnalyticsEvent.TopLevelEvent]: error,
  // Keep fatal for now to get signal on how frequently this occurs
  [AnalyticsEvent.TransactionTooLarge]: fatal,
  [AnalyticsEvent.SeriesInvalidSlug]: error,
  [AnalyticsEvent.UnknownWalletType]: error,
  [AnalyticsEvent.VerificationError]: error,
  [AnalyticsEvent.WaitingForLastBidPrice]: info,
};

const RELAY_FETCH_FAIL_ERROR_MESSAGES = {
  [error]: ["update_User_by_pk", "Uniqueness violation", "ArtistSubmissions"],
  [fatal]: [],
  [info]: [
    "Please sign in to react to this post",
    "A user with that email already exists. Please refresh and enter their username/wallet address instead.",
  ],
  [warning]: [
    `Uniqueness violation. duplicate key value violates unique constraint \\"User_email_key\\"`,
    `Uniqueness violation. duplicate key value violates unique constraint \\"UserFollows_followedId_followerId_key\\"`,
  ],
};

const RELAY_FETCH_THROWS_ERROR_MESSAGES = {
  [error]: ["cannot parse response", "Unexpected end of JSON input"],
  [fatal]: [],
  [info]: [
    // I suspect these are caused by the polling we do (see usePollingFetchKey).
    // They seem to primarily occur on mobile.
    "Failed to fetch",
    "Load failed",
    "The network connection was lost.",
    "cancelled",
    "cancelado",
    "The Internet connection appears to be offline",
  ],
  [warning]: [
    "WebKit encountered an internal error",
    "The request timed out.",
    "NetworkError when attempting to fetch resource.",
    "The operation was aborted",
  ],
};

const ERROR_MESSAGES_FOR_SEVERITIES = {
  [AnalyticsEvent.ExchangeRatesError]: RELAY_FETCH_THROWS_ERROR_MESSAGES,
  [AnalyticsEvent.GlobalErrorBoundaryHit]: RELAY_FETCH_THROWS_ERROR_MESSAGES,
  [AnalyticsEvent.LaunchDarklyError]: {
    [error]: [],
    [fatal]: [],
    [info]: [],
    [warning]: ["network error"],
  },
  [AnalyticsEvent.RelayFetchFail]: RELAY_FETCH_FAIL_ERROR_MESSAGES,
  [AnalyticsEvent.RelayFetchFailPolling]: RELAY_FETCH_FAIL_ERROR_MESSAGES,
  [AnalyticsEvent.RelayFetchThrows]: RELAY_FETCH_THROWS_ERROR_MESSAGES,
  [AnalyticsEvent.RelayFetchThrowsPolling]: RELAY_FETCH_THROWS_ERROR_MESSAGES,
  [AnalyticsEvent.RpcError]: {
    [error]: [],
    [fatal]: [],
    [info]: [
      // Insufficient funds error
      "custom program error: 0x1",
      "The requested method and/or account has not been authorized by the user.",
      "Failed to sign transaction",
      "You cancelled the transaction",
      "User aborted",
      "Attempt to debit an account but found no record of a prior credit",
    ],
    [warning]: [
      "Node is behind",
      "Something went wrong.",
      "Transaction simulation failed: Blockhash not found",
      "Transaction was not confirmed in",
      // TransactionExpiredBlockheightExceededError
      "has expired: block height exceeded.",
      // Bid too late, auction has ended
      "6026",
      // Bid price too low
      "6027",
    ],
  },
};

export default function getErrorEventSeverity(
  event: AnalyticsEvent,
  errOrMsg: Error | string
): Severity {
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
