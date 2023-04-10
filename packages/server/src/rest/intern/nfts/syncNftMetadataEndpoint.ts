import { NextFunction, Request as ExpressRequest, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import { NftStatusExpress_Enum } from "src/__generated__/generated";
import toObject from "formfn-shared/dist/utils/toObject";
import syncNftMetadata, {
  SYNC_NFT_METADATA_INCLUDE,
  SyncStatus,
} from "src/rest/intern/nfts/syncNftMetadata";

const NFTS_TO_EXCLUDE = [
  // One of Mical Noelson's collaborators approved the request, but Mical doesn't want them to show up
  // in our UI, so we manually changed the Request status (and thus it's now different than the onchain verified status)
  "WUFeaKDTKhazCQU7rQDBr5mg7tJzpf8jCi7o3LJJyuP",
];

const limit = pLimit(20);

/**
 * This checks every row in NftMetadata and updates it to be in-sync with the off-chain metadata.
 * Also updates the NftToCollaborator table.
 */
export default async function syncNftMetadataEndpoint(
  req: ExpressRequest,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const { dryRun, logSyncResults, mints } = req.body;
  const prisma = getPrisma();
  const nftMetadata = await prisma.nftMetadata.findMany({
    include: SYNC_NFT_METADATA_INCLUDE,
    where: {
      Nft: {
        AND: [
          {
            OR: [
              // For standard editions created on our platform, we don't write to NftToCollaborator
              // or Request, and instead read that information from the master edition
              { isMasterEdition: true },
              { isImported: true },
            ],
          },
          mints == null
            ? {
                mint: {
                  not: {
                    in: NFTS_TO_EXCLUDE,
                  },
                },
              }
            : { mint: { in: mints } },
          {
            status: {
              not: NftStatusExpress_Enum.Burned,
            },
          },
        ],
      },
    },
  });

  const syncResults = await Promise.all(
    nftMetadata.map((prismaMetadata) =>
      limit(async () => syncNftMetadata(prismaMetadata, dryRun))
    )
  );

  const outOfSyncItems = syncResults.filter(
    (result) =>
      result.statuses != null &&
      Object.values(result.statuses).some((val) => val !== SyncStatus.Synced)
  );
  const outOfSyncMints = outOfSyncItems.map(({ mint }) => mint);
  const errorItems = syncResults.filter((result) => result.error != null);

  if (outOfSyncItems.length > 0) {
    await logError(
      AnalyticsEvent.SyncNftMetadataError,
      `${outOfSyncItems.length} NFTs have out-of-sync metadata`,
      req,
      toObject({
        numProcessed: nftMetadata.length,
        outOfSyncItems,
        outOfSyncMints,
      })
    );
  }

  if (errorItems.length > 0) {
    await logError(
      AnalyticsEvent.SyncNftMetadataError,
      `${errorItems.length} items failed to process due to server errors`,
      req,
      toObject(errorItems)
    );
  }

  res.json({
    numInSync: syncResults.length - outOfSyncItems.length,
    numOutOfSync: outOfSyncItems.length,
    numProcessed: nftMetadata.length,
    syncResults: logSyncResults ? toObject(syncResults) : undefined,
  });
}
