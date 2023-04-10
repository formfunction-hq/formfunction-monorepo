import { Dayjs } from "dayjs";
import { NextFunction, Request, Response } from "express";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import getLdFlag from "src/utils/launch-darkly/getLdFlag";
import LaunchDarklyFlag from "src/types/enums/LaunchDarklyFlag";
import { Duration } from "dayjs/plugin/duration";

type LogLine = { content: string; date: Dayjs };

// Notice lines are unimportant.
// An example of a notice line is when we run `sudo systemctl reload nginx`, in which case we see a log line like so:
//
//   2022/05/23 21:27:47 [notice] 682654#682654: signal process started
function isLogLineValid(
  logLine: LogLine,
  lookbackDuration: Duration,
  ignorePatterns: Array<string>
) {
  return (
    logLine.date.isAfter(dayjs().subtract(lookbackDuration)) &&
    ignorePatterns.every(
      (ignorePattern) => !logLine.content.includes(ignorePattern)
    )
  );
}

// Example log line:
// 2022/05/23 01:56:04 [error] 77811#77811: *37101993 upstream timed out (110: Connection timed out) while reading response header from upstream, client: 140.0.17.165, server: api2.formfunction.xyz, request: "POST /intern/logEventToLoki HTTP/1.1", upstream: "http://127.0.0.1:4003/intern/logEventToLoki", host: "api2.formfunction.xyz", referrer: "https://formfunction.xyz/"
function parseLogLine(logLineRaw: string): Maybe<LogLine> {
  if (logLineRaw.length === 0) {
    return null;
  }

  const split = logLineRaw.split(" ");
  // First two entries of array should be date (in UTC time)
  const dateSplit = split.slice(0, 2);
  const date = dayjs.utc(dateSplit.join(" "));

  return { content: split.slice(2).join(" "), date };
}

/**
 * Our servers will continually hit this endpoint (via a cron job) by using a command like so:
 *
 *   nginx_errors=$(sudo tail -n 100 /var/log/nginx/error.log | base64) &&
 *     curl -X POST https://api-balance.formfunction.xyz/intern/logNginxErrors --data "$nginx_errors" --header "check: fofu" --header 'Content-Type: text/plain' --header 'x-server-name: apidev'
 *
 * Then, we will log a Sentry error if there are any recent non-notice lines in the Nginx logs.
 */
export default async function logNginxErrors(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const config = await getLdFlag(LaunchDarklyFlag.LogNginxErrorsConfig, {
    ignorePatterns: [],
    lookbackDurationInMinutes: 5,
  });
  const lookbackDuration = dayjs.duration({
    minutes: config.lookbackDurationInMinutes,
  });
  const logLinesRaw = Buffer.from(req.body, "base64")
    .toString("ascii")
    .split("\n");
  const logLines = logLinesRaw
    .map((logLineRaw) => parseLogLine(logLineRaw))
    .filter(
      (logLine) =>
        logLine != null &&
        isLogLineValid(logLine, lookbackDuration, config.ignorePatterns)
    );
  const serverName = req.headers["x-server-name"];
  const loggingData = {
    logLines,
    serverName,
  };

  if (logLines.length > 0) {
    logError(
      AnalyticsEvent.NginxErrors,
      `[${serverName}] Found ${logLines.length} Nginx errors in last ${config.lookbackDurationInMinutes} minutes`,
      req,
      loggingData,
      logLines.length >= 5 ? "error" : "warning"
    );
  }

  res.json(loggingData);
}
