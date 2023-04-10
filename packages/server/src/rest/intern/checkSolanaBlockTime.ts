import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logError from "src/utils/analytics/logError";
import dayjs from "src/utils/dates/dayjsex";
import getConnection from "src/utils/solana/getConnection";

const DEFAULT_MAX_TIME_DIFF_IN_MINUTES_ALLOWED = 5;

export default async function checkSolanaBlockTime(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const maxTimeDiffInMinutesAllowed =
    req.body.maxTimeDiffInMinutesAllowed ??
    DEFAULT_MAX_TIME_DIFF_IN_MINUTES_ALLOWED;
  const connection = getConnection();
  const slot = await connection.getSlot();
  const blockTime = dayjs.unix((await connection.getBlockTime(slot))!);
  const realTime = dayjs();

  const timeDiffInMinutes = Math.abs(realTime.diff(blockTime, "minute", true));

  const responseData = {
    blockTime: blockTime.toString(),
    maxTimeDiffInMinutesAllowed,
    realTime: realTime.toString(),
    timeDiffInMinutes,
  };

  if (timeDiffInMinutes >= Number(maxTimeDiffInMinutesAllowed)) {
    logError(
      AnalyticsEvent.SolanaBlockTimeError,
      `Solana block time differs from real time by ${timeDiffInMinutes} minutes`,
      req,
      responseData
    );
  }

  res.json(responseData);
}
