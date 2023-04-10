import axios from "axios";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { MaybeUndef, Undef } from "formfn-shared/dist/types/UtilityTypes";
import { Request } from "express";
import getEnvironment from "src/utils/getEnvironment";
import jsonStringify from "formfn-shared/dist/utils/jsonStringify";
import getDefaultLogProperties from "src/utils/analytics/getDefaultLogProperties";
import { lookup } from "geoip-lite";
import logSentryError from "src/utils/analytics/logSentryError";
import { nanoid } from "nanoid";
import dayjs from "src/utils/dates/dayjsex";

// Source: https://grafana.com/docs/loki/latest/operations/request-validation-rate-limits/#line_too_long
const MAX_LOG_LINE_SIZE_IN_BYTES = 256_000;
const NUM_RETRIES = 3;
const TIMEOUT_DURATION = dayjs.duration({ seconds: 30 });
const UNKNOWN = "unknown";

function getIpInfo(req: Request) {
  try {
    const { ip } = req;
    return lookup(ip);
  } catch {
    // Do nothing
    return undefined;
  }
}

function getStringifiedProperties(
  properties: Record<string, any>,
  depth?: number
): string {
  const result = jsonStringify(properties, depth);
  if (result.length > MAX_LOG_LINE_SIZE_IN_BYTES) {
    return getStringifiedProperties(properties, depth == null ? 5 : depth - 1);
  }
  return result;
}

function isMobile(req: Request): Undef<boolean> {
  const userAgent = req.headers["user-agent"];
  if (userAgent == null) {
    return undefined;
  }

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    userAgent
  );
}

async function logToLoki(
  logId: string,
  event: AnalyticsEvent,
  source: string,
  req?: MaybeUndef<Request>,
  properties?: Record<string, any>,
  values?: any
) {
  const valuesToUse = values || [
    [
      (new Date().getTime() * 1000000).toString(),
      getStringifiedProperties({
        ...properties,
        ...getDefaultLogProperties(req),
        ipInfo: req == null ? undefined : getIpInfo(req),
        isMobile: req == null ? UNKNOWN : isMobile(req) ?? UNKNOWN,
        logId,
      }),
    ],
  ];

  return axios({
    auth: {
      password:
        "eyJrIjoiMGE2ZGUyZTU4OGM5OGRhZDkyOWY0NmM4NGZkZTY3OWQ0NGE3OGQ2NiIsIm4iOiJsb2dzIiwiaWQiOjYwMDI2MH0=",
      username: "162939",
    },
    data: {
      streams: [
        {
          stream: {
            event,
            level: properties?.severity
              ? properties?.severity
              : properties?.errorMessage
              ? "error"
              : "info",
            node_env: getEnvironment(),
            source,
          },
          values: valuesToUse,
        },
      ],
    },
    method: "POST",
    timeout: TIMEOUT_DURATION.asMilliseconds(),
    timeoutErrorMessage: `Request to loki timed out for event ${event}`,
    url: "https://logs-prod3.grafana.net/loki/api/v1/push",
  });
}

/**
 * See https://grafana.com/docs/loki/latest/api/#post-lokiapiv1push for details.
 */
export default async function logEventToLoki(
  event: AnalyticsEvent,
  req?: MaybeUndef<Request>,
  properties?: Record<string, any>,
  values?: any,
  source = "backend"
) {
  const logId = nanoid();

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < NUM_RETRIES; i++) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await logToLoki(
        logId,
        event,
        source,
        req,
        properties,
        values
      );
      return result;
    } catch (e) {
      const isLastRetry = i === NUM_RETRIES - 1;
      logSentryError(
        AnalyticsEvent.LogEventLokiError,
        e as Error,
        {
          logEventName: event,
          logId,
          properties,
          propertiesSize:
            properties == null ? null : jsonStringify(properties).length,
          source,
          values,
          ...getDefaultLogProperties(req),
        },
        isLastRetry ? "error" : "warning"
      );
    }
  }

  return null;
}
