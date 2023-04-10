import { NextFunction, Request, Response } from "express";
import getPrisma from "src/utils/prisma/getPrisma";
import pLimit from "p-limit";
import dayjs from "src/utils/dates/dayjsex";
import logError from "src/utils/analytics/logError";
import AnalyticsEvent from "src/types/enums/AnalyticsEvent";
import toObject from "formfn-shared/dist/utils/toObject";
import loadAuctionHouseSdk from "src/utils/solana/loadAuctionHouseSdk";
import {
  CurrencyNameExpress_Enum,
  NftStatusExpress_Enum,
} from "src/__generated__/generated";
import { PublicKey, sendAndConfirmTransaction } from "@solana/web3.js";
import getAuthorityKeypair from "src/utils/keypairs/getAuthorityKeypair";
import findAta from "formfn-shared/dist/utils/solana/pdas/findAta";
import getConnection from "src/utils/solana/getConnection";
import { Maybe } from "formfn-shared/dist/types/UtilityTypes";
import findMostRecentCloseEditionDistributorTokenAccountTx from "src/utils/editions/findMostRecentCloseEditionDistributorTokenAccountTx";
import createAirdropCompletedNotification from "src/utils/notifications/create/createAirdropCompletedNotification";
import invariant from "tiny-invariant";
import getErrorPropertiesToLog from "formfn-shared/dist/utils/analytics/getErrorPropertiesToLog";

const limit = pLimit(5);

type ProcessAirdropStatus =
  | "error"
  | "skipped-already-processed"
  | "skipped-airdrop-not-finished"
  | "processed";

async function updateMasterEditionAndSendNotification(
  masterEditionMint: string,
  txid: string,
  ownerKey: PublicKey
) {
  const prisma = getPrisma();
  await prisma.nft.update({
    data: { NftStatus: { connect: { value: "AirdropCompleted" } } },
    where: { id: masterEditionMint },
  });
  await createAirdropCompletedNotification(
    { masterEditionMint, txid },
    ownerKey.toString()
  );
}

async function processAirdrop(
  req: Request,
  masterEditionMint: string
): Promise<{
  error?: any;
  mint: string;
  status: ProcessAirdropStatus;
  txid?: Maybe<string>;
}> {
  const prisma = getPrisma();
  const mintKey = new PublicKey(masterEditionMint);
  const mostRecentCloseEditionDistributorTokenAccountTx =
    await findMostRecentCloseEditionDistributorTokenAccountTx(mintKey);
  const isAirdropAlreadyConcluded =
    mostRecentCloseEditionDistributorTokenAccountTx != null;
  if (isAirdropAlreadyConcluded) {
    const nft = await prisma.nft.findUnique({
      where: { id: masterEditionMint },
    });
    invariant(nft != null);
    const ownerKey = new PublicKey(nft.creatorId);
    if (nft.status !== NftStatusExpress_Enum.AirdropCompleted) {
      await updateMasterEditionAndSendNotification(
        masterEditionMint,
        mostRecentCloseEditionDistributorTokenAccountTx.txid!,
        ownerKey
      );
      return { mint: masterEditionMint, status: "processed" };
    }

    return { mint: masterEditionMint, status: "skipped-already-processed" };
  }

  const airdrops = await prisma.airdrop.findMany({
    where: {
      masterEditionMint,
    },
  });
  const unfinishedAirdrops = airdrops.filter(
    (airdrop) => airdrop.standardEditionMint == null
  );
  const oneDayAgo = dayjs().subtract(dayjs.duration({ days: 1 }));
  if (unfinishedAirdrops.length !== 0) {
    if (dayjs(unfinishedAirdrops[0].timeCreated).isBefore(oneDayAgo)) {
      // Should be done by now so if not, log an error
      logError(
        AnalyticsEvent.ProcessFinishedAirdropError,
        `Airdrop for ${masterEditionMint} is not finished, check manually`,
        req,
        { airdrops: toObject(airdrops), masterEditionMint }
      );
    }
    // Airdrop is not done, try again later
    return { mint: masterEditionMint, status: "skipped-airdrop-not-finished" };
  }

  // Starting from here, we know that the airdrop is finished and we can safely
  // close the edition distributor
  const connection = getConnection();
  const ownerKey = new PublicKey(airdrops[0].fromAddress);
  const authorityKeypair = getAuthorityKeypair();
  const auctionHouseSdk = loadAuctionHouseSdk(CurrencyNameExpress_Enum.Solana);
  const [ata] = await findAta(ownerKey, mintKey);
  const closeEditionDistributorTx =
    await auctionHouseSdk.closeEditionDistributorTokenAccount({
      mint: mintKey,
      owner: ownerKey,
      rentReceiver: authorityKeypair.publicKey,
      tokenReceiver: ata,
      wallet: authorityKeypair.publicKey,
    });

  try {
    const txid = await sendAndConfirmTransaction(
      connection,
      closeEditionDistributorTx,
      [authorityKeypair]
    );
    await updateMasterEditionAndSendNotification(
      masterEditionMint,
      txid,
      ownerKey
    );

    return { mint: masterEditionMint, status: "processed", txid };
  } catch (e: any) {
    logError(AnalyticsEvent.AirdropFail, e, req, {
      airdrop: airdrops[0],
      ata: ata.toString(),
      masterEditionMint,
    });
    return {
      error: getErrorPropertiesToLog(e),
      mint: masterEditionMint,
      status: "error",
    };
  }
}

export default async function processFinishedAirdropsHandler(
  req: Request,
  res: Response,
  _next: NextFunction
): Promise<void> {
  const prisma = getPrisma();
  const sevenDaysAgo = dayjs().subtract(dayjs.duration({ days: 7 }));
  const masterEditionMints = (
    await prisma.airdrop.groupBy({
      by: ["masterEditionMint"],
      where: {
        MasterEditionNft: {
          NftStatus: {
            NOT: { value: NftStatusExpress_Enum.AirdropCompleted },
          },
        },
        timeCreated: { gte: sevenDaysAgo.toDate() },
      },
    })
  ).map(({ masterEditionMint }) => masterEditionMint);
  const processedMasterEditions = await Promise.all(
    masterEditionMints.map((mint) =>
      limit(async () => processAirdrop(req, mint))
    )
  );

  res.json({
    processedMasterEditions,
    queriedMasterEditions: masterEditionMints,
    success: true,
  });
}
