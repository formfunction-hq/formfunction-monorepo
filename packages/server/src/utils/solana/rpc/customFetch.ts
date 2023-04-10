import { Duration } from "dayjs/plugin/duration";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import dayjs from "formfn-shared/dist/utils/dates/dayjsex";
import fetch, { RequestInfo, RequestInit, Response } from "node-fetch";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";

const RPC_METHOD_TIMEOUTS: { [key: string]: Duration } = {
  // DigitalOcean LB connections have a keep-alive time of 60 seconds.
  // A timeout of 20 seconds here means that retryFn should take at most 40 seconds
  // for Connection.getParsedTransaction, which gets called in insertNftTransaction.
  getTransaction: dayjs.duration({ seconds: 20 }),
};

function getRpcMethod(init: RequestInit): Maybe<string> {
  const body = init.body?.toString();
  if (body == null) {
    return null;
  }

  try {
    const bodyParsed = JSON.parse(body);
    return bodyParsed.method;
  } catch {
    return null;
  }
}

/**
 * Implementation inspired by https://www.npmjs.com/package/node-fetch and
 * https://dmitripavlutin.com/timeout-fetch-request/
 */
export default async function customFetch(
  input: RequestInfo,
  init?: RequestInit
): Promise<Response> {
  const rpcMethod = init == null ? null : getRpcMethod(init);
  if (rpcMethod == null || RPC_METHOD_TIMEOUTS[rpcMethod] == null) {
    return fetch(input, init);
  }

  const timeoutDuration = RPC_METHOD_TIMEOUTS[rpcMethod];
  const timeoutMs = timeoutDuration.asMilliseconds();
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(input, {
      ...init,
      // @ts-ignore see https://github.com/DefinitelyTyped/DefinitelyTyped/issues/60868
      signal: controller.signal,
    });
    return response;
  } catch (e) {
    if ((e as Error).name === "AbortError") {
      logError(
        AnalyticsEvent.RpcTimeout,
        `RPC timed out after ${timeoutMs}ms for ${rpcMethod}`,
        null,
        { rpcMethod, timeoutMs }
      );
    }

    throw e;
  } finally {
    clearTimeout(timeoutId);
  }
}
