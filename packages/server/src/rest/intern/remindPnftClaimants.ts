import { NextFunction, Request, Response } from "express";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import logEvent from "src/utils/analytics/logEvent";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import getPnftDropTimes from "src/utils/getPnftDropTimes";
import dayjs from "src/utils/dates/dayjsex";
import createBidderClaimPnftReminderNotification from "src/utils/notifications/create/createBidderClaimPnftReminderNotification";

const limit = pLimit(20);

export default async function remindPnftClaimants(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();

  const { dropDuration, reminderThreshold } = await getPnftDropTimes();
  const thresholdForReminder = dayjs()
    .subtract(dropDuration)
    .add(reminderThreshold)
    .toDate();

  const nfts = await prisma.nft.findMany({
    include: {
      Claim: {
        include: {
          User: true,
        },
        where: {
          claimTransactionId: null,
          timeCreated: {
            lte: thresholdForReminder,
          },
          timeLastReminded: null,
        },
      },
      NftListing: {
        include: {
          Nft_NftToNftListing_pnftIdForAuction: {
            include: {
              NftMetadata: true,
              Owner: true,
            },
          },
        },
      },
      NftMetadata: true,
    },
    where: {
      NftListing: { isPnftDropActive: true },
    },
  });

  const allClaims = nfts.flatMap(({ Claim, ...rest }) =>
    Claim.map((claim) => ({ claim, ...rest }))
  );

  async function processClaimsForAuctionNft(
    claimInfo: typeof allClaims[number]
  ) {
    const { claim, creatorId, mint } = claimInfo;
    const pnft = claimInfo.NftListing!.Nft_NftToNftListing_pnftIdForAuction;

    if (pnft == null) {
      return;
    }

    await createBidderClaimPnftReminderNotification(
      {
        auctionNftMint: mint,
        pnftMint: pnft.mint,
        reminderThresholdInMinutes: reminderThreshold.asMinutes(),
      },
      claim.userId,
      creatorId
    );
    await prisma.claim.update({
      data: {
        timeLastReminded: dayjs().toDate(),
      },
      where: {
        id: claim.id,
      },
    });
  }

  await Promise.all(
    allClaims.map((claim) =>
      limit(async () => processClaimsForAuctionNft(claim))
    )
  );

  logEvent(AnalyticsEvent.NotifyLastDayPnftClaimantsSuccess, req);
  res.json({ success: true });
}
