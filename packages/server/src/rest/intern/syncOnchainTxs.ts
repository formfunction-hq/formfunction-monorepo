import dayjs from "src/utils/dates/dayjsex";
import { NextFunction, Request, Response } from "express";
import CONVERT_NFT_TO_METADATA_INCLUDE from "src/constants/include/ConvertNftToMetadataInclude";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import refreshMetadata from "src/utils/nft/refreshMetadata";
import logEvent from "src/utils/analytics/logEvent";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import getTimeElapsed from "src/utils/dates/getTimeElapsed";
import getPromiseLimit from "src/utils/launch-darkly/getPromiseLimit";
import { nanoid } from "nanoid";

/**
 * Syncs missing onchain transactions to our DB.
 *
 * TODO: consolidate with areNftsSyncedEndpoint
 */
export default async function syncOnchainTxs(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const startTime = dayjs();
  const prisma = getPrisma();
  const { skip, take } = req.body;
  const runId = nanoid();

  const concurrency = await getPromiseLimit("syncOnchainTxs");
  const limit = pLimit(concurrency);

  const nfts = await prisma.nft.findMany({
    include: CONVERT_NFT_TO_METADATA_INCLUDE,
    orderBy: { timeCreated: "asc" },
    skip: skip != null ? Number(skip) : undefined,
    take: take != null ? Number(take) : undefined,
    where: {
      status: { not: "Burned" },
    },
  });

  const result = await Promise.all(
    nfts.map((nft, index) =>
      limit(async () => {
        const startTimeInner = dayjs();
        const refreshMetadataResult = await refreshMetadata(nft);
        // Debugging why this endpoint is taking so long...
        await logEvent(AnalyticsEvent.SyncTransferTxsDebug, req, {
          concurrency,
          index,
          insertedTxs: refreshMetadataResult.insertedTxs,
          mint: nft.mint,
          numNftsToProcess: nfts.length,
          reason:
            "reason" in refreshMetadataResult
              ? refreshMetadataResult.reason
              : undefined,
          reasonDescription:
            "reasonDescription" in refreshMetadataResult
              ? refreshMetadataResult.reasonDescription
              : undefined,
          runId,
          shortCircuited: refreshMetadataResult.shortCircuited,
          skip,
          take,
          ...getTimeElapsed(startTimeInner),
        });
        return refreshMetadataResult;
      })
    )
  );
  const nftsWithInsertedTxs = result.filter((r) => r.insertedTxs.length > 0);

  const loggingData = {
    concurrency,
    nftsWithInsertedTxs: nftsWithInsertedTxs.map((r) => ({
      insertedTs: r.insertedTxs,
      mint: r.metadataAccount.mint,
    })),
    numNftsProcessed: nfts.length,
    numNftsWithInsertedTxs: nftsWithInsertedTxs.length,
    runId,
    skip,
    take,
    ...getTimeElapsed(startTime),
  };

  logEvent(AnalyticsEvent.SyncTransferTxsDuration, req, loggingData);

  res.json(loggingData);
}
