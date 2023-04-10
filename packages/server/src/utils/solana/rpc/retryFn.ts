import { SeverityLevel } from "@sentry/node";
import { Connection } from "@solana/web3.js";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import getRpcRetryUrls from "src/utils/launch-darkly/getRpcRetryUrls";
import getConnection from "src/utils/solana/getConnection";
import assertUnreachable from "formfn-shared/dist/utils/assertUnreachable";
import CONNECTION_CONFIG from "src/constants/ConnectionConfig";
import logEvent from "src/utils/analytics/logEvent";

const DURATION_LOGGING_THRESHOLD_IN_SECONDS = 10;

function getEventNameFromSeverity(severity: SeverityLevel): AnalyticsEvent {
  switch (severity) {
    case "fatal":
      return AnalyticsEvent.RpcRetryFatal;
    case "error":
      return AnalyticsEvent.RpcRetryError;
    case "warning":
    case "log":
    case "info":
    case "debug":
      return AnalyticsEvent.RpcRetryWarning;
    default:
      return assertUnreachable(severity);
  }
}

function maybeLogDuration(
  startTime: dayjs.Dayjs,
  description: string,
  extraDataToLog: { [key: string]: any }
) {
  if (
    getTimeElapsed(startTime).durationInSeconds >
    DURATION_LOGGING_THRESHOLD_IN_SECONDS
  ) {
    logEvent(AnalyticsEvent.RpcRetryDuration, null, {
      description,
      ...extraDataToLog,
      ...getTimeElapsed(startTime),
    });
  }
}

export default async function retryFn<T>(
  fn: (connection: Connection) => Promise<T>,
  fnName: string,
  extraDataToLog?: { [key: string]: any },
  isResultValid?: (result: T) => boolean,
  allRpcsThrowSeverity: SeverityLevel = "fatal"
): Promise<T> {
  const defaultConnection = getConnection();
  const startTime = dayjs();

  const durationLoggingData = {
    extraDataToLog:
      extraDataToLog == null ? undefined : jsonStringify(extraDataToLog),
    fnName,
  };

  try {
    const result = await fn(defaultConnection);
    const shouldReturn = isResultValid == null || isResultValid(result);

    maybeLogDuration(
      startTime,
      `After default connection (returning = ${shouldReturn})`,
      durationLoggingData
    );

    if (shouldReturn) {
      return result;
    }
  } catch {
    maybeLogDuration(
      startTime,
      "After default connection threw",
      durationLoggingData
    );
  }

  const [rpcRetryUrls, enableRpcRetryWarningLogs] = await Promise.all([
    getRpcRetryUrls(),
    getLdFlag(LaunchDarklyFlag.EnableRpcRetryWarningLogs, true),
  ]);
  const retries = await Promise.all(
    rpcRetryUrls.map(async (rpc) => {
      try {
        const connection = new Connection(rpc, CONNECTION_CONFIG);
        const result = await fn(connection);
        return { result, rpc, success: true };
      } catch (e) {
        return { errorMessage: (e as Error).message, rpc, success: false };
      }
    })
  );

  maybeLogDuration(startTime, "After retries", durationLoggingData);

  const rejected = retries.filter((retry) => !retry.success);
  const fulfilled = retries.filter((retry) => retry.success);
  const loggingData = {
    extraDataToLog:
      extraDataToLog == null ? undefined : jsonStringify(extraDataToLog),
    fnName,
    fulfilled,
    rejected,
    retries,
    rpcRetryUrls,
  };

  if (rejected.length > 0) {
    if (fulfilled.length > 0) {
      if (enableRpcRetryWarningLogs) {
        logError(
          AnalyticsEvent.RpcRetryWarning,
          `${rejected.length} retry RPCs threw for ${fnName}`,
          null,
          {
            ...loggingData,
            ...getTimeElapsed(startTime),
          }
        );
      }
    } else {
      logError(
        getEventNameFromSeverity(allRpcsThrowSeverity),
        `All retry RPCs threw for ${fnName}`,
        null,
        {
          ...loggingData,
          ...getTimeElapsed(startTime),
        },
        allRpcsThrowSeverity
      );
    }
  }

  const validResult = fulfilled.find(
    (retry) => isResultValid == null || isResultValid(retry.result as T)
  );
  if (validResult != null) {
    if (enableRpcRetryWarningLogs) {
      // If the default RPC returns an invalid result (or throws) and another returns a valid
      // result, there is a discrepancy, and we should log an error.
      logError(
        AnalyticsEvent.RpcRetryResult,
        `${fnName} required retry`,
        null,
        {
          ...loggingData,
          ...getTimeElapsed(startTime),
          validResult,
        }
      );
    }
  }

  if (validResult == null) {
    // It's the caller's responsibility to handle this error.
    throw new Error(`Could not find valid result for ${fnName}`);
  }

  return validResult.result!;
}
